<?php

namespace Database\Seeders;

use App\Models\Visi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KantorCabangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kantor_cabangs')->insert([
            [
                'nama' => 'mudicom',
                'kode' => 'k-001',
                'alamat' => 'Jl. Abd. Wahab Asasi',
                'kota' => 'Mamuju',
                'provinsi' => 'Sulawesi Barat',
                'kode_pos' => '',
                'telepon' => '085334803299',
                'email' => 'mudicom@gmai.com',
                'status' => 'pusat',
                'deskripsi' => fake()->paragraph()
            ],
        ]);
        DB::table('sosial_media')->insert([
            [
                'icon' => 'website',
                'name' => 'website',
                'kategori' => 'website',
                'link' => 'mudciom.com',
                'kantor_cabang_id' => 1,
            ],
            [
                'icon' => 'facebook',
                'name' => 'facebook',
                'kategori' => 'facebook',
                'link' => 'facebook.com',
                'kantor_cabang_id' => 1,
            ],
            [
                'icon' => 'instagram',
                'name' => 'instagram',
                'kategori' => 'instagram',
                'link' => 'instagram.com',
                'kantor_cabang_id' => 1,
            ],
        ]);
        Visi::create([
            'kantor_cabang_id' => 1,
            'visi' => 'Menjadi Lembaga Pendidikan dan Pelatihan yang bertaraf Nasional',
        ]);
    }
}
