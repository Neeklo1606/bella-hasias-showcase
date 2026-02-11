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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->nullable()->unique();
            $table->string('title');
            $table->text('description');
            $table->string('category')->nullable();
            $table->foreignId('image_id')->nullable()->constrained('media_files')->nullOnDelete();
            $table->foreignId('cover_id')->nullable()->constrained('media_files')->nullOnDelete();
            $table->json('tags')->nullable();
            $table->string('cta_label');
            $table->string('cta_link');
            $table->integer('sort_order')->default(0);
            $table->string('status')->default('published');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
