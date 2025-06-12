<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Http\Controllers\MateriAJarController;
use App\Models\BenefitJenisKursus;
use App\Models\JenisKursus;
use App\Models\KantorCabang;
use App\Models\KategoriKursus;
use App\Models\MateriAjar;
use App\Models\PaketKursus;
use App\Models\Petugas;
use App\Models\Siswa;
use App\Models\SubKategoriKursus;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            KantorCabangSeeder::class,
        ]);

        $permissions = [
            'only_kantor',
            'view_kantor_cabang',
            'create_kantor_cabang',
            'edit_kantor_cabang',
            'delete_kantor_cabang',
            'confirm_kantor_cabang',

            'view_slider',
            'create_slider',
            'edit_slider',
            'delete_slider',
            'confirm_slider',

            'view_petugas',
            'create_petugas',
            'edit_petugas',
            'delete_petugas',
            'confirm_petugas',

            'view_siswa',
            'create_siswa',
            'edit_siswa',
            'delete_siswa',
            'confirm_siswa',


            'view_instruktur',
            'create_instruktur',
            'edit_instruktur',
            'delete_instruktur',
            'confirm_instruktur',

            'view_kategori',
            'create_kategori',
            'edit_kategori',
            'delete_kategori',
            'confirm_kategori',
            'create_sub_kategori',
            'edit_sub_kategori',
            'delete_sub_kategori',
            'confirm_sub_kategori',
            'create_jenis',
            'edit_jenis',
            'delete_jenis',
            'confirm_jenis',

            'view_materi',
            'create_materi',
            'edit_materi',
            'delete_materi',
            'confirm_materi',

            'view_pesanan_kursus',


            'view_paket',
            'create_paket',
            'edit_paket',
            'delete_paket',
            'confirm_paket',

            'view_pendaftaran_kursus',
            'create_pendaftaran_kursus',
            'edit_pendaftaran_kursus',
            'delete_pendaftaran_kursus',
            'confirm_pendaftaran_kursus',

            'view_pembayaran_kursus',
            'create_pembayaran_kursus',
            'edit_pembayaran_kursus',
            'delete_pembayaran_kursus',
            'confirm_pembayaran_kursus',

            'view_kas',
            'create_kas',
            'edit_kas',
            'delete_kas',
            'confirm_kas',

        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $roles = [
            'super admin' => Permission::all(),
            'admin' => Permission::whereIn('name', [
                'view_kategori_kursus',
                'view_pesanan_kursus',
                'create_pesanan_kursus',
                'update_pesanan_kursus',
                'view_payment',
                'create_payment',
                'update_payment_status',
                'view_kas',
                'create_kas',
            ])->get(),
            'instruktur' => Permission::whereIn('name', [
                'view_instruktur_dashboard',
                'upload_modul_instruktur',
            ])->get(),
            'siswa' => [],
            'keuangan' => Permission::whereIn('name', [
                'view_payment',
                'create_payment',
                'view_kas',
                'create_kas',
            ])->get(),
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($rolePermissions);
        }

        $user = \App\Models\User::factory()->create([
            'name' => 'super admin',
            'email' => 'superadmin@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('super admin');
        Petugas::create([
            'user_id' => $user->id,
            'kd_petugas' => 'PE-001',
            'nik_ktp' => '7306071701980005',
            'nama_lengkap' => 'guntur madjid',
            'tempat_lahir' => 'makassar',
            'tanggal_lahir' => '1998-01-17',
            'tanggal_masuk' => '2024-01-01',
            'jenis_kelamin' => 'laki-laki',
            'agama' => 'islam',
            'alamat' => 'jl.diponegoro',
            'kelurahan' => 'karema',
            'kecamatan' => 'mamuju',
            'kabupaten' => 'mamuju',
            'telp' => '082194255717',
            'pendidikan' => 'sma',
            'kantor_cabang_id' => 1,
            'jabatan' => 'super admin',
        ]);

        // KategoriKursus::create([
        //     'nama_kategori' => 'Mobil',
        //     'deskripsi' => fake()->paragraph(2),
        //     'thumbnail' => fake()->imageUrl(),
        //     'kantor_cabang_id' => 1
        // ]);
        // KategoriKursus::create([
        //     'nama_kategori' => 'Komputer',
        //     'deskripsi' => fake()->paragraph(2),
        //     'thumbnail' => fake()->imageUrl(),
        //     'kantor_cabang_id' => 1
        // ]);
        // $this->call([
        //     JenisKursusSeeder::class,
        // ]);
        // SubKategoriKursus::factory(10)->create();
        // MateriAjar::factory(15)->create();
    }
}
