<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubKategoriKursus>
 */
class SubKategoriKursusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kategori_kursus_id' => fake()->randomElement([1, 2]),
            'nama_sub_kategori' => fake()->word(2),
            'thumbnail' => fake()->imageUrl(),
            'deskripsi' => fake()->paragraph(1),
            'kantor_cabang_id' => 1
        ];
    }
}
