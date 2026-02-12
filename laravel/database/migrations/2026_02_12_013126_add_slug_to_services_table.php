<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check if slug column already exists
        if (!Schema::hasColumn('services', 'slug')) {
            // First, add slug column without unique constraint
            Schema::table('services', function (Blueprint $table) {
                $table->string('slug')->nullable()->after('title');
            });
        }

        // Fill existing records with slugs based on title
        $services = \DB::table('services')->whereNull('slug')->orWhere('slug', '')->get();
        foreach ($services as $service) {
            $slug = \Illuminate\Support\Str::slug($service->title);
            // Ensure uniqueness by appending id if needed
            $uniqueSlug = $slug;
            $counter = 1;
            while (\DB::table('services')->where('slug', $uniqueSlug)->where('id', '!=', $service->id)->exists()) {
                $uniqueSlug = $slug . '-' . $counter;
                $counter++;
            }
            \DB::table('services')->where('id', $service->id)->update(['slug' => $uniqueSlug]);
        }

        // Check if unique index already exists
        $indexes = \DB::select("SHOW INDEXES FROM services WHERE Key_name = 'services_slug_unique'");
        if (empty($indexes)) {
            // Now make slug not nullable and unique
            Schema::table('services', function (Blueprint $table) {
                $table->string('slug')->nullable(false)->unique()->change();
            });
        } else {
            // Just make sure it's not nullable
            Schema::table('services', function (Blueprint $table) {
                $table->string('slug')->nullable(false)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
