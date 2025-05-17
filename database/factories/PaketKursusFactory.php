<?php

namespace Database\Factories;

use App\Models\JenisKursus;
use App\Models\KategoriKursus;
use App\Models\SubKategoriKursus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaketKursus>
 */
class PaketKursusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kd_paket' => fake()->numerify('p-00##'),
            'nama_paket' => fake()->sentence(),
            'kategori_kursus' => fake()->randomElement(KategoriKursus::get()->pluck('nama_kategori')),
            'sub_kategori_kursus' => fake()->randomElement(SubKategoriKursus::get()->pluck('nama_sub_kategori')),
            'jenis_kursus' => fake()->randomElement(JenisKursus::get()->pluck('jenis_kursus')),
            'deskripsi' => fake()->paragraph(),

            'total_pertemuan' => fake()->randomElement([5, 10, 15, 16, 20]),
            'total_materi' => fake()->randomElement([1, 2, 3, 4, 5]),
            'harga' => fake()->randomElement([5000000, 1250000, 1450000]),


        ];
    }
}
