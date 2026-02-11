<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'category' => fake()->word(),
            'tags' => [fake()->word(), fake()->word()],
            'cta_label' => fake()->words(2, true),
            'cta_link' => '/' . fake()->word(),
            'sort_order' => fake()->numberBetween(0, 100),
            'status' => 'published',
        ];
    }

    /**
     * Indicate that the service is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }
}
