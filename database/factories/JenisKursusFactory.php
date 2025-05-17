<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JenisKursus>
 */
class JenisKursusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'jenis_kursus' => fake()->word(),
            'deskripsi' => fake()->paragraph(),
            'thumbnail' => fake()->imageUrl(),
        ];
    }
}
