<?php

namespace Database\Factories;

use App\Models\SubKategoriKursus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MateriAjar>
 */
class MateriAjarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sub_kategrori_id' => fake()->randomElement(SubKategoriKursus::get()->pluck('id')),
            'nama_materi' => fake()->sentence(),
            'thumbnail' => fake()->imageUrl(),
            'deskripsi' => fake()->paragraph(2),

        ];
    }
}
