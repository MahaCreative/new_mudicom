<?php

namespace Database\Factories;

use App\Models\JenisKursus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BenefitJenisKursus>
 */
class BenefitJenisKursusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'jenis_kursus_id' => fake()->randomElement(JenisKursus::get()->pluck('id')),
            'benefit' => fake()->sentence(7),
        ];
    }
}
