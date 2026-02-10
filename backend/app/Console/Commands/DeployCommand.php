<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\Process\Process;

class DeployCommand extends Command
{
    protected $signature = 'deploy
        {--no-build : Skip npm ci and npm run build}
        {--no-push : Skip git add/commit/push}
        {--no-notify : Skip HTTP POST to deploy endpoint}
        {--message= : Custom commit message}
        {--branch= : Override branch to deploy}';

    protected $description = 'Build frontend, sync to public/build, commit, push, and notify server';

    public function handle(): int
    {
        $basePath = base_path('../');
        $branch = $this->option('branch') ?? config('deploy.branch');
        $remote = config('deploy.remote');
        $frontendDir = rtrim(config('deploy.frontend_dir') ?: $basePath, '/');
        $publicBuildDir = config('deploy.public_build_dir');

        if (! $this->option('no-build')) {
            if (!$this->checkGitClean($basePath)) {
                $this->error('Git status is not clean. Commit or stash changes first.');
                return self::FAILURE;
            }

            $this->info('Running npm ci...');
            $this->runProcess("cd {$frontendDir} && npm ci", $frontendDir);

            $this->info('Running npm run build...');
            $this->runProcess("cd {$frontendDir} && npm run build", $frontendDir);

            $sourceDir = $this->detectBuildOutputDir($frontendDir);
            if (!$sourceDir) {
                $this->error('Build output not found (expected dist/ or build/)');
                return self::FAILURE;
            }

            $this->syncDir($sourceDir, $publicBuildDir);
        }

        if (! $this->option('no-push')) {
            $msg = $this->option('message') ?: 'Deploy: build update ' . date('Y-m-d H:i:s');
            $this->runProcess("cd {$basePath} && git add -A", $basePath);
            $status = $this->runProcess("cd {$basePath} && git status --porcelain", $basePath, true);
            if (trim($status) !== '') {
                $this->runProcess("cd {$basePath} && git commit -m " . escapeshellarg($msg), $basePath);
                $this->runProcess("cd {$basePath} && git push {$remote} {$branch}", $basePath);
            } else {
                $this->info('No changes to commit.');
            }
        }

        if (! $this->option('no-notify')) {
            $endpoint = config('deploy.endpoint');
            $token = config('deploy.token');
            if (empty($token)) {
                $this->warn('DEPLOY_TOKEN not set, skipping notify.');
            } else {
                $this->info('Notifying deploy endpoint...');
                $response = Http::withHeaders(['X-Deploy-Token' => $token])
                    ->post($endpoint, ['branch' => $branch, 'remote' => $remote]);

                if ($response->successful()) {
                    $this->info('Deploy triggered successfully.');
                    $data = $response->json();
                    if (!empty($data['logs'])) {
                        foreach ($data['logs'] as $log) {
                            $this->line('  ' . ($log['cmd'] ?? '') . ' -> ' . ($log['code'] ?? ''));
                        }
                    }
                } else {
                    $this->error('Deploy notify failed: ' . $response->status());
                    $this->line($response->body());
                    return self::FAILURE;
                }
            }
        }

        return self::SUCCESS;
    }

    private function checkGitClean(string $path): bool
    {
        $process = Process::fromShellCommandline("cd {$path} && git status --porcelain", timeout: 5);
        $process->run();
        return trim($process->getOutput()) === '';
    }

    private function detectBuildOutputDir(string $frontendDir): ?string
    {
        $dist = $frontendDir . '/dist';
        $build = $frontendDir . '/build';
        if (is_dir($dist)) {
            return realpath($dist);
        }
        if (is_dir($build)) {
            return realpath($build);
        }
        return null;
    }

    private function syncDir(string $source, string $target): void
    {
        $source = rtrim($source, '/') . '/';
        $target = rtrim($target, '/') . '/';

        if (!is_dir($source)) {
            throw new \RuntimeException("Source directory does not exist: {$source}");
        }

        if (!is_dir($target)) {
            mkdir($target, 0755, true);
        }

        $rsync = trim((string) shell_exec('which rsync 2>/dev/null'));
        if ($rsync !== '') {
            $process = Process::fromShellCommandline(
                "rsync -a --delete " . escapeshellarg($source) . " " . escapeshellarg($target),
                timeout: 60
            );
            $process->run();
            if (!$process->isSuccessful()) {
                throw new \RuntimeException('rsync failed: ' . $process->getErrorOutput());
            }
            $this->info('Synced via rsync.');
            return;
        }

        $this->phpSyncDir($source, $target);
        $this->info('Synced via PHP copy.');
    }

    private function phpSyncDir(string $source, string $target): void
    {
        $existing = [];
        $this->collectFiles($target, $target, $existing);

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($source, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::SELF_FIRST
        );

        foreach ($iterator as $item) {
            $rel = substr($item->getPathname(), strlen($source));
            $dest = $target . $rel;
            unset($existing[$rel]);

            if ($item->isDir()) {
                if (!is_dir($dest)) {
                    mkdir($dest, 0755, true);
                }
            } else {
                $dir = dirname($dest);
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
                copy($item->getPathname(), $dest);
            }
        }

        foreach (array_reverse(array_keys($existing)) as $rel) {
            $path = $target . $rel;
            if (is_file($path)) {
                unlink($path);
            }
        }
        $this->removeEmptyDirs($target);
    }

    private function collectFiles(string $base, string $dir, array &$out): void
    {
        if (!is_dir($dir)) {
            return;
        }
        foreach (scandir($dir) as $f) {
            if ($f === '.' || $f === '..') {
                continue;
            }
            $full = $dir . '/' . $f;
            $rel = substr($full, strlen($base));
            if (is_dir($full)) {
                $this->collectFiles($base, $full, $out);
            } else {
                $out[$rel] = true;
            }
        }
    }

    private function removeEmptyDirs(string $dir): void
    {
        $empty = true;
        foreach (scandir($dir) as $f) {
            if ($f === '.' || $f === '..') {
                continue;
            }
            $full = $dir . '/' . $f;
            if (is_dir($full)) {
                $this->removeEmptyDirs($full);
                if (is_dir($full) && count(scandir($full)) === 2) {
                    rmdir($full);
                }
            }
            $empty = false;
        }
    }

    private function runProcess(string $command, string $cwd, bool $returnOutput = false): ?string
    {
        $process = Process::fromShellCommandline($command, $cwd, null, null, 120);
        $process->run();
        if (!$process->isSuccessful()) {
            $this->error($process->getErrorOutput());
            throw new \RuntimeException("Command failed: {$command}");
        }
        return $returnOutput ? $process->getOutput() : null;
    }
}
