<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Siswa>
 */
class SiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kd_siswa' => 'sis-' . fake()->numerify('0###'),
            'nik_ktp' => rand(1111111111111111, 9999999999999999),
            'nama_lengkap' => fake()->name(),
            'tempat_lahir' => fake()->word(),
            'tanggal_lahir' => fake()->dateTimeBetween('-30 years', 'now'),
            'jenis_kelamin' => fake()->randomElement(['laki-laki', 'perempuan']),
            'agama' => fake()->randomElement(['islam', 'kristen']),
            'alamat' => fake()->sentence(),
            'kelurahan' => fake()->sentence(),
            'kecamatan' => fake()->sentence(),
            'kabupaten' => fake()->sentence(),
            'telp' => fake()->numerify('0852##########'),


        ];
    }
}
