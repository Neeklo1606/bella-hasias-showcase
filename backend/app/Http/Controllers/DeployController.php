<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Process\Process;

class DeployController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $token = config('deploy.token');
        if (empty($token)) {
            return response()->json(['ok' => false, 'error' => 'Deploy not configured'], 500);
        }

        $headerToken = $request->header('X-Deploy-Token');
        if (!is_string($headerToken) || !hash_equals($token, $headerToken)) {
            return response()->json(['ok' => false, 'error' => 'Invalid token'], 403);
        }

        $v = Validator::make($request->all(), [
            'branch' => 'required|string|max:255',
            'remote' => 'required|string|max:255',
        ]);

        if ($v->fails()) {
            return response()->json(['ok' => false, 'errors' => $v->errors()], 422);
        }

        $branch = $request->input('branch');
        $remote = $request->input('remote');
        $repoPath = base_path('../');
        $logs = [];

        $commands = [
            ['cmd' => "cd {$repoPath} && git fetch {$remote}", 'allowFail' => false],
            ['cmd' => "cd {$repoPath} && git checkout {$branch}", 'allowFail' => false],
            ['cmd' => "cd {$repoPath} && git pull {$remote} {$branch}", 'allowFail' => false],
            ['cmd' => 'php artisan down', 'allowFail' => true],
            ['cmd' => 'php artisan migrate --force', 'allowFail' => false],
            ['cmd' => 'php artisan optimize:clear', 'allowFail' => false],
            ['cmd' => 'php artisan config:cache', 'allowFail' => true],
            ['cmd' => 'php artisan route:cache', 'allowFail' => true],
            ['cmd' => 'php artisan view:cache', 'allowFail' => true],
            ['cmd' => 'php artisan queue:restart', 'allowFail' => true],
            ['cmd' => 'php artisan up', 'allowFail' => true],
        ];

        $cwd = $repoPath;
        foreach ($commands as $c) {
            $cmd = $c['cmd'];
            $allowFail = $c['allowFail'] ?? false;

            $process = Process::fromShellCommandline(
                $cmd,
                str_starts_with($cmd, 'php artisan') ? base_path() : $cwd,
                null,
                null,
                120
            );

            $process->run();
            $code = $process->getExitCode();
            $out = $process->getOutput();
            $err = $process->getErrorOutput();

            $logs[] = [
                'cmd' => $cmd,
                'code' => $code,
                'out' => trim($out),
                'err' => trim($err),
            ];

            if ($code !== 0 && !$allowFail) {
                return response()->json([
                    'ok' => false,
                    'failed' => [
                        'cmd' => $cmd,
                        'code' => $code,
                        'out' => $out,
                        'err' => $err,
                    ],
                    'logs' => $logs,
                ], 500);
            }
        }

        return response()->json(['ok' => true, 'logs' => $logs]);
    }
}
