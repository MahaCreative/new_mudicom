<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KategoriKursus>
 */
class KategoriKursusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "nama_kategori" => fake()->sentence(1),
            "deskripsi" => fake()->paragraph(1),
            "thumbnail" => fake()->image(),
        ];
    }
}
