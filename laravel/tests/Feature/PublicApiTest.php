<?php

namespace Tests\Feature;

use App\Models\MediaFile;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_services_endpoint_returns_200(): void
    {
        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data',
            ]);
    }

    public function test_public_services_endpoint_returns_published_services_only(): void
    {
        // Create published service
        Service::factory()->create([
            'title' => 'Published Service',
            'status' => 'published',
        ]);

        // Create draft service
        Service::factory()->create([
            'title' => 'Draft Service',
            'status' => 'draft',
        ]);

        $response = $this->getJson('/api/services');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        // Should only return published services
        $this->assertCount(1, $data);
        $this->assertEquals('Published Service', $data[0]['title']);
    }

    public function test_public_services_endpoint_returns_correct_json_structure(): void
    {
        Service::factory()->count(2)->create([
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'description',
                        'status',
                    ],
                ],
            ]);
    }

    public function test_public_services_endpoint_supports_pagination(): void
    {
        Service::factory()->count(15)->create([
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/services?per_page=10&page=1');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(10, $data);
    }

    public function test_public_services_endpoint_supports_search(): void
    {
        Service::factory()->create([
            'title' => 'Web Development',
            'status' => 'published',
        ]);

        Service::factory()->create([
            'title' => 'Design Services',
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/services?q=Web');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        $this->assertCount(1, $data);
        $this->assertStringContainsString('Web', $data[0]['title']);
    }
}
