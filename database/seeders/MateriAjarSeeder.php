<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MateriAjarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('materi_ajars')->insert([
            [
                'sub_kategrori_id' => 1,
                'nama_materi' => 'Mengemudi Mobil Alya',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 1,
                'nama_materi' => 'Mengemudi Mobil Cayla',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 2,
                'nama_materi' => 'Microsoft Word',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 2,
                'nama_materi' => 'Microsoft Excel',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 2,
                'nama_materi' => 'Microsoft Power Point',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 3,
                'nama_materi' => 'Corel Draw',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 3,
                'nama_materi' => 'Photoshop',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 3,
                'nama_materi' => 'Praktek Pembuatan Stempel',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
            [
                'sub_kategrori_id' => 3,
                'nama_materi' => 'Hadware / Software Install',
                'thumbnail' => fake()->imageUrl(),
                'deskripsi' => fake()->paragraph(2),
            ],
        ]);
    }
}
