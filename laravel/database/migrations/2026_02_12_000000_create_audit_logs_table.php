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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action'); // created, updated, deleted, uploaded
            $table->string('entity_type'); // App\Models\Service, App\Models\CaseItem, etc.
            $table->unsignedBigInteger('entity_id')->nullable();
            $table->json('payload')->nullable(); // diff или snapshot данных
            $table->string('ip', 45)->nullable(); // IPv6 support
            $table->text('user_agent')->nullable();
            $table->timestamps();

            // Индексы для быстрого поиска
            $table->index(['entity_type', 'entity_id']);
            $table->index(['user_id', 'created_at']);
            $table->index('action');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
