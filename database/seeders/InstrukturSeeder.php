<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InstrukturSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('instrukturs')->insert([
            [
                'kd_instruktur' => 'ins-001',
                'kategori_kursus_id' => '2',
                'nik_ktp' => '7306071701980005',
                'nama_lengkap' => 'guntur madjid',
                'tempat_lahir' => 'makassar',
                'tanggal_lahir' => '1998-01-17',
                'tanggal_masuk' => '2024-10-01',
                'jenis_kelamin' => 'laki-laki',
                'agama' => 'islam',
                'alamat' => 'jl.diponegoro',
                'kelurahan' => 'karema',
                'kecamatan' => 'mamuju',
                'kabupaten' => 'mamuju',
                'telp' => '085334703299',

                'pendidikan' => 'sma/smk/sederajat',
                'foto' => 'image/default_profile.png',
                'deskripsi' => fake()->paragraph(1)
            ],
            [
                'kd_instruktur' => 'ins-002',
                'kategori_kursus_id' => '2',
                'nik_ktp' => '7306071701980005',
                'nama_lengkap' => 'Dian awaliyah S.E',
                'tempat_lahir' => 'Mamuju',
                'tanggal_lahir' => '1998-10-12',
                'tanggal_masuk' => '2020-10-12',
                'jenis_kelamin' => 'perempuan',
                'agama' => 'islam',
                'alamat' => 'jl.diponegoro',
                'kelurahan' => 'karema',
                'kecamatan' => 'mamuju',
                'kabupaten' => 'mamuju',
                'telp' => '085334703299',

                'pendidikan' => 'sarjana',
                'foto' => 'image/default_profile.png',
                'deskripsi' => fake()->paragraph(1)
            ],
        ]);
    }
}
