<?php

namespace App\Console\Commands;

use App\Models\CaseItem;
use App\Models\MediaFile;
use App\Models\Page;
use App\Models\SeoMeta;
use App\Models\Service;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ImportJsonCommand extends Command
{
    protected $signature = 'cms:import-json';
    protected $description = 'Import data from frontend/src/data/*.json files into database';

    public function handle(): int
    {
        $basePath = base_path('../frontend/src/data');
        
        $this->info('Starting JSON import...');

        // Import users
        $this->importUsers($basePath);
        
        // Import media files
        $mediaMap = $this->importMedia($basePath);
        
        // Import services
        $this->importServices($basePath, $mediaMap);
        
        // Import cases
        $this->importCases($basePath, $mediaMap);
        
        // Import pages
        $this->importPages($basePath, $mediaMap);
        
        // Import SEO
        $this->importSeo($basePath);

        $this->info('Import completed successfully!');
        return Command::SUCCESS;
    }

    private function importUsers(string $basePath): void
    {
        $file = $basePath . '/users.json';
        if (!file_exists($file)) {
            $this->warn('users.json not found');
            return;
        }

        $users = json_decode(file_get_contents($file), true);
        $count = count($users);
        $this->info("Importing {$count} users...");

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['external_id' => $userData['id']],
                [
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'password' => Hash::make($userData['password']),
                    'role' => 'admin',
                ]
            );
        }

        $this->info("✓ Imported {$count} users");
    }

    private function importMedia(string $basePath): array
    {
        $file = $basePath . '/media.json';
        if (!file_exists($file)) {
            $this->warn('media.json not found');
            return [];
        }

        $media = json_decode(file_get_contents($file), true);
        $count = count($media);
        $this->info("Importing {$count} media files...");
        $map = [];

        foreach ($media as $mediaData) {
            $mediaFile = MediaFile::updateOrCreate(
                ['external_id' => $mediaData['id']],
                [
                    'filename' => $mediaData['filename'],
                    'original_filename' => $mediaData['filename'],
                    'path' => $mediaData['src'],
                    'mime_type' => $this->guessMimeType($mediaData['filename']),
                    'size' => 0, // Unknown from JSON
                    'category' => $mediaData['category'],
                    'alt' => $mediaData['alt'] ?? null,
                ]
            );
            $map[$mediaData['id']] = $mediaFile->id;
        }

        $this->info("✓ Imported {$count} media files");
        return $map;
    }

    private function importServices(string $basePath, array $mediaMap): void
    {
        $file = $basePath . '/services.json';
        if (!file_exists($file)) {
            $this->warn('services.json not found');
            return;
        }

        $services = json_decode(file_get_contents($file), true);
        $count = count($services);
        $this->info("Importing {$count} services...");

        foreach ($services as $serviceData) {
            Service::updateOrCreate(
                ['external_id' => $serviceData['id']],
                [
                    'title' => $serviceData['title'],
                    'description' => $serviceData['description'],
                    'category' => $serviceData['category'] ?? null,
                    'image_id' => $mediaMap[$serviceData['imageId']] ?? null,
                    'cover_id' => $mediaMap[$serviceData['coverId'] ?? $serviceData['imageId']] ?? null,
                    'tags' => $serviceData['tags'] ?? [],
                    'cta_label' => $serviceData['ctaLabel'],
                    'cta_link' => $serviceData['ctaLink'],
                    'status' => 'published',
                ]
            );
        }

        $this->info("✓ Imported {$count} services");
    }

    private function importCases(string $basePath, array $mediaMap): void
    {
        $file = $basePath . '/cases.json';
        if (!file_exists($file)) {
            $this->warn('cases.json not found');
            return;
        }

        $cases = json_decode(file_get_contents($file), true);
        $count = count($cases);
        $this->info("Importing {$count} cases...");

        DB::transaction(function () use ($cases, $mediaMap) {
            foreach ($cases as $caseData) {
                // Find service by external_id
                $service = Service::where('external_id', $caseData['serviceId'])->first();
                
                $case = CaseItem::updateOrCreate(
                    ['external_id' => $caseData['id']],
                    [
                        'title' => $caseData['title'],
                        'slug' => $caseData['slug'],
                        'description' => $caseData['description'],
                        'service_id' => $service?->id,
                        'tags' => $caseData['tags'] ?? [],
                        'status' => 'published',
                    ]
                );

                // Sync media
                $mediaIds = array_filter(array_map(fn($id) => $mediaMap[$id] ?? null, $caseData['mediaIds'] ?? []));
                $case->media()->sync($mediaIds);
            }
        });

        $this->info("✓ Imported {$count} cases");
    }

    private function importPages(string $basePath, array $mediaMap): void
    {
        $file = $basePath . '/pages.json';
        if (!file_exists($file)) {
            $this->warn('pages.json not found');
            return;
        }

        $pages = json_decode(file_get_contents($file), true);
        $count = count($pages);
        $this->info("Importing {$count} pages...");

        foreach ($pages as $pageData) {
            $seo = $pageData['seo'] ?? null;
            if ($seo && isset($seo['ogImageId'])) {
                $seo['ogImageId'] = $mediaMap[$seo['ogImageId']] ?? $seo['ogImageId'];
            }

            Page::updateOrCreate(
                ['external_id' => $pageData['id']],
                [
                    'slug' => $pageData['slug'],
                    'title' => $pageData['title'],
                    'blocks' => $pageData['blocks'] ?? [],
                    'seo' => $seo,
                    'status' => 'published',
                ]
            );
        }

        $this->info("✓ Imported {$count} pages");
    }

    private function importSeo(string $basePath): void
    {
        $file = $basePath . '/seo.json';
        if (!file_exists($file)) {
            $this->warn('seo.json not found');
            return;
        }

        $seo = json_decode(file_get_contents($file), true);
        $this->info('Importing SEO config...');

        SeoMeta::setValue('siteUrl', $seo['siteUrl'] ?? 'https://bellahasias.ru');

        $this->info('✓ Imported SEO config');
    }

    private function guessMimeType(string $filename): string
    {
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        return match ($ext) {
            'jpg', 'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'webp' => 'image/webp',
            'mp4' => 'video/mp4',
            'webm' => 'video/webm',
            'svg' => 'image/svg+xml',
            default => 'application/octet-stream',
        };
    }
}
