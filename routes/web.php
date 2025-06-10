<?php

use App\Http\Controllers\DaftarPesananKursusController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Guest\AboutController;
use App\Http\Controllers\Guest\AuthController;
use App\Http\Controllers\Guest\KategoriKursusController as GuestKategoriKursusController;
use App\Http\Controllers\Guest\PaketKursusController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstrukturController;
use App\Http\Controllers\JenisKursusKontroller;
use App\Http\Controllers\KasController;
use App\Http\Controllers\KategoriKursusController;
use App\Http\Controllers\ManagementPaketController;
use App\Http\Controllers\ManagementPendaftaranKursusController;
use App\Http\Controllers\ManagementRolePermissionController;
use App\Http\Controllers\MateriAJarController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePerusahaanController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SubKategoriController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', [HomeController::class, 'index'])->name('home');
ROute::get('about', [AboutController::class, 'index'])->name('about');
Route::get('kategori-kursus', [GuestKategoriKursusController::class, 'index'])->name('kategori-kursus');
Route::get('paket-kursus', [PaketKursusController::class, 'index'])->name('paket-kursus');
Route::get('detail-paket-kursus/{slug}', [PaketKursusController::class, 'show'])->name('detail-paket-kursus');


Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthController::class, 'index'])->name('login');
    Route::post('login', [AuthController::class, 'store']);
    Route::get('forgot-password', [AuthController::class, 'forgot_password'])->name('forgot_password');
});

Route::middleware(['auth'])->group(function () {
    Route::get('logout', function () {
        Auth::logout();
    });
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::get('management-kategori-kursus', [KategoriKursusController::class, 'index'])->name('admin.management-kursus');
    Route::post('post-management-kategori-kursus', [KategoriKursusController::class, 'store'])->name('admin.post-management-kursus');
    Route::post('update-management-kategori-kursus', [KategoriKursusController::class, 'update'])->name('admin.update-management-kursus');
    Route::delete('delete-management-kategori-kursus', [KategoriKursusController::class, 'delete'])->name('admin.delete-management-kursus');

    Route::post('store-sub-kategori-kursus', [SubKategoriController::class, 'store'])->name('admin.store-sub-kategori-kursus');
    Route::post('update-sub-kategori-kursus', [SubKategoriController::class, 'update'])->name('admin.update-sub-kategori-kursus');
    Route::delete('delete-sub-kategori-kursus', [SubKategoriController::class, 'delete'])->name('admin.delete-sub-kategori-kursus');

    Route::post('store-jenis-kategori-kursus', [JenisKursusKontroller::class, 'store'])->name('admin.store-jenis-kategori-kursus');
    Route::post('update-jenis-kategori-kursus', [JenisKursusKontroller::class, 'update'])->name('admin.update-jenis-kategori-kursus');
    Route::delete('delete-jenis-kategori-kursus', [JenisKursusKontroller::class, 'delete'])->name('admin.delete-jenis-kategori-kursus');
    Route::delete('delete-benefit-jenis-kategori-kursus', [JenisKursusKontroller::class, 'delete_benefit'])->name('delete-benefit-jenis-kategori-kursus');

    Route::get('management-materi-ajar', [MateriAJarController::class, 'index'])->name('admin.management-materi-ajar');
    Route::post('store-management-materi-ajar', [MateriAJarController::class, 'store'])->name('admin.store-management-materi-ajar');
    Route::post('update-management-materi-ajar', [MateriAJarController::class, 'update'])->name('admin.update-management-materi-ajar');
    Route::delete('delete-management-materi-ajar', [MateriAJarController::class, 'delete'])->name('admin.delete-management-materi-ajar');

    Route::get('management-paket-kursus', [ManagementPaketController::class, 'index'])->name('admin.management-paket-kursus');
    Route::get('create-management-paket-kursus', [ManagementPaketController::class, 'create'])->name('admin.create-management-paket-kursus');
    Route::post('store-management-paket-kursus', [ManagementPaketController::class, 'store'])->name('admin.store-management-paket-kursus');
    Route::get('edit-management-paket-kursus/{slug}', [ManagementPaketController::class, 'edit'])->name('admin.edit-management-paket-kursus');
    Route::post('update-management-paket-kursus', [ManagementPaketController::class, 'update'])->name('admin.update-management-paket-kursus');
    Route::delete('delete-management-paket-kursus', [ManagementPaketController::class, 'delete'])->name('admin.delete-management-paket-kursus');
    Route::delete('delete-detail-management-paket-kursus', [ManagementPaketController::class, 'delete_detail'])->name('admin.delete-detail-management-paket-kursus');

    Route::get('management-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'index'])->name('management-pendaftaran-kursus');
    Route::get('show-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'show'])->name('admin.show-pendaftaran-kursus');
    Route::get('formulir-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'create'])->name('admin.formulit-pendaftaran-kursus');
    Route::patch('update-siswa-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'update_siswa'])->name('admin.update-siswa-pendaftar-kursus');
    ROute::post('store-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'store'])->name('admin.store-pendaftaran-kursus');
    ROute::get('edit-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'edit'])->name('admin.edit-pendaftaran-kursus');
    ROute::post('update-pendaftaran-kursus/', [ManagementPendaftaranKursusController::class, 'update'])->name('admin.update-pendaftaran-kursus');
    Route::get('invoice-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'invoice'])->name('admin.invoice-pendaftaran-kursus');
    Route::delete('delete-detail-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'delete_detail'])->name('admin.delete-detail-pendaftaran-kursus');

    Route::get('management-pembayaran-kursus', [PaymentController::class, 'index'])->name('admin.management-pembayaran-kursus');
    Route::post('store-management-pembayaran-kursus', [PaymentController::class, 'store'])->name('admin.store-pembayaran-kursus');

    Route::get('daftar-pesanan-kursus', [DaftarPesananKursusController::class, 'index'])->name('admin.daftar-pesanan-kursus');

    Route::get('admin.management-role-permission', [ManagementRolePermissionController::class, 'index']);
    Route::get('admin.create_role', [ManagementRolePermissionController::class, 'create_role']);

    Route::get('admin.management-instruktur', [InstrukturController::class, 'index'])->name('admin.management-instruktur');
    Route::get('admin.create-management-instruktur', [InstrukturController::class, 'create'])->name('admin.create-management-instruktur');
    Route::post('admin.store-management-instruktur', [InstrukturController::class, 'store'])->name('admin.store-management-instruktur');
    Route::get('admin.edit-management-instruktur/{kd_ins}', [InstrukturController::class, 'edit'])->name('admin.edit-management-instruktur');
    Route::post('admin.update-management-instruktur/', [InstrukturController::class, 'update'])->name('admin.update-management-instruktur');

    Route::get('admin.management-petugas', [PetugasController::class, 'index'])->name('admin.management-petugas');
    Route::get('admin.create-management-petugas', [PetugasController::class, 'create'])->name('admin.create-management-petugas');
    Route::post('admin.store-management-petugas', [PetugasController::class, 'store'])->name('admin.store-management-petugas');
    Route::get('admin.edit-management-petugas/{kd_petugas}', [PetugasController::class, 'edit'])->name('admin.edit-management-petugas');
    Route::post('admin.update-management-petugas/', [PetugasController::class, 'update'])->name('admin.update-management-petugas');

    Route::get('admin.management-siswa', [SiswaController::class, 'index'])->name('admin.management-siswa');
    Route::get('admin.create-management-siswa', [SiswaController::class, 'create'])->name('admin.create-management-siswa');
    Route::post('admin.store-management-siswa', [SiswaController::class, 'store'])->name('admin.store-management-siswa');
    Route::get('admin.edit-management-siswa/{kd_siswa}', [SiswaController::class, 'edit'])->name('admin.edit-management-siswa');
    Route::post('admin.update-management-siswa/', [SiswaController::class, 'update'])->name('admin.update-management-siswa');

    Route::get('managament-kas', [KasController::class, 'index'])->name('admin.management-kas');

    Route::get('management-profile-perusahaan', [ProfilePerusahaanController::class, 'index'])->name('admin.management-profile-perusahaan');
    Route::get('create-management-profile-perusahaan', [ProfilePerusahaanController::class, 'create'])->name('admin.create-management-profile-perusahaan');
    Route::post('store-management-profile-perusahaan', [ProfilePerusahaanController::class, 'store'])->name('admin.store-management-profile-perusahaan');
    Route::get('edit-management-profile-perusahaan/{kd_cabang}', [ProfilePerusahaanController::class, 'edit'])->name('admin.edit-management-profile-perusahaan');
    Route::post('update-management-profile-perusahaan/', [ProfilePerusahaanController::class, 'update'])->name('admin.update-management-profile-perusahaan');

    Route::get('management-slider', [SliderController::class, 'index'])->name('admin.management-slider');
    Route::get('create-management-slider', [SliderController::class, 'create'])->name('admin.create-management-slider');
    Route::post('store-management-slider', [SliderController::class, 'store'])->name('admin.store-management-slider');

    Route::get('role-permission', [RolePermissionController::class, 'index'])->name('auth.role-permission');
});
