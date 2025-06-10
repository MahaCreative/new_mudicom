<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisKursusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        DB::table('jenis_kursuses')->insert([
            [
                'jenis_kursus' => 'private',
                'deskripsi' => fake()->paragraph(2),
                'thumbnail' => fake()->imageUrl(),
                'kantor_cabang_id' => 1
            ],
            [
                'jenis_kursus' => 'reguler',
                'deskripsi' => fake()->paragraph(2),
                'thumbnail' => fake()->imageUrl(),
                'kantor_cabang_id' => 1
            ],
        ]);
    }
}
