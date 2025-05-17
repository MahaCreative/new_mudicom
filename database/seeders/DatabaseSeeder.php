<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Http\Controllers\MateriAJarController;
use App\Models\BenefitJenisKursus;
use App\Models\JenisKursus;
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
        // \App\Models\User::factory(10)->create();
        $permissions = [
            'view_kategori_kursus',
            'create_kategori_kursus',
            'edit_kategori_kursus',
            'delete_kategori_kursus',
            'view_pesanan_kursus',
            'create_pesanan_kursus',
            'update_pesanan_kursus',
            'delete_pesanan_kursus',
            'view_payment',
            'create_payment',
            'update_payment_status',
            'delete_payment',
            'view_kas',
            'create_kas',
            'delete_kas',
            'view_instruktur_dashboard',
            'upload_modul_instruktur',
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
            'kantor_cabang' => 'mudicom',
            'jabatan' => 'super admin',
        ]);

        KategoriKursus::create([
            'nama_kategori' => 'Mobil',
            'deskripsi' => fake()->paragraph(2),
            'thumbnail' => fake()->imageUrl(),
        ]);
        KategoriKursus::create([
            'nama_kategori' => 'Komputer',
            'deskripsi' => fake()->paragraph(2),
            'thumbnail' => fake()->imageUrl(),
        ]);



        $this->call([
            // SubKategoriSeeder::class,
            // JenisKursusSeeder::class,
            // MateriAjarSeeder::class,
            KantorCabangSeeder::class,
            // InstrukturSeeder::class,
        ]);
        // BenefitJenisKursus::factory(10)->create();
        // Siswa::factory(10)->create();
        // PaketKursus::factory(10)->create();
    }
}
