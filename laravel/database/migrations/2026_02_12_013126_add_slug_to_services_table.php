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
        // First, add slug column without unique constraint
        Schema::table('services', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('title');
        });

        // Fill existing records with slugs based on title
        $services = \DB::table('services')->get();
        foreach ($services as $service) {
            $slug = \Illuminate\Support\Str::slug($service->title);
            // Ensure uniqueness by appending id if needed
            $uniqueSlug = $slug;
            $counter = 1;
            while (\DB::table('services')->where('slug', $uniqueSlug)->exists()) {
                $uniqueSlug = $slug . '-' . $counter;
                $counter++;
            }
            \DB::table('services')->where('id', $service->id)->update(['slug' => $uniqueSlug]);
        }

        // Now make slug not nullable and unique
        Schema::table('services', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->unique()->change();
        });
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
