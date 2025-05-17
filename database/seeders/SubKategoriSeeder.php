<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubKategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sub_kategori_kursuses')->insert([
            [
                'kategori_kursus_id' => 1,
                'nama_sub_kategori' => 'Mengemudi Mobil',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'kategori_kursus_id' => 2,
                'nama_sub_kategori' => 'Aplikasi Perkantoran',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'kategori_kursus_id' => 2,
                'nama_sub_kategori' => 'Desain Grafis',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'kategori_kursus_id' => 2,
                'nama_sub_kategori' => 'Teknisi Komputer',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
        ]);
    }
}
