<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccessControlTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_admin_endpoints(): void
    {
        $response = $this->getJson('/api/admin/services');

        $response->assertStatus(401);
    }

    public function test_non_admin_user_cannot_access_admin_endpoints(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/services');

        $response->assertStatus(403);
    }

    public function test_admin_user_can_access_admin_endpoints(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/services');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data',
            ]);
    }

    public function test_admin_user_can_access_admin_cases(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/cases');

        $response->assertStatus(200);
    }

    public function test_admin_user_can_access_admin_pages(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/pages');

        $response->assertStatus(200);
    }

    public function test_admin_user_can_access_admin_media(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/media');

        $response->assertStatus(200);
    }
}
