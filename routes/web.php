<?php

use App\Http\Controllers\DaftarPesananKursusController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Guest\AboutController;
use App\Http\Controllers\Guest\AuthController;
use App\Http\Controllers\Guest\DashboardController as GuestDashboardController;
use App\Http\Controllers\Guest\KategoriKursusController as GuestKategoriKursusController;
use App\Http\Controllers\Guest\PaketKursusController;
use App\Http\Controllers\Guest\PesananController;
use App\Http\Controllers\Guest\ProfileController as GuestProfileController;
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
use App\Http\Controllers\RegisterController;
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
    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);
    Route::get('forgot-password', [AuthController::class, 'forgot_password'])->name('forgot_password');
});
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('verivikasi-otp', [RegisterController::class, 'verifikasi'])->name('verifikasi');
    Route::post('store-verivikasi-otp', [RegisterController::class, 'store_verif'])->name('store_verifikasi');
    Route::get('resend-otp', [RegisterController::class, 'resend_otp'])->name('resent-otp');
    Route::get('logout', function () {
        Auth::logout();
        return redirect()->route('login');
    })->name('logout');
});

Route::middleware(['auth', 'role:siswa', 'verified.otp'])->group(function () {
    Route::get('siswa/dashboard', [GuestDashboardController::class, 'index'])->name('siswa.dashboard')->middleware(['cek.profil.siswa']);
    Route::get('siswa/my-profile', [GuestProfileController::class, 'index'])->name('siswa.profile-saya');
    Route::post('siswa/update-my-profile', [GuestProfileController::class, 'store'])->name('siswa.update-profile');

    Route::get('siswa/history-pesanan-kursus', [PesananController::class, 'index'])->name('siswa.history-pesanan-kursus')->middleware(['cek.profil.siswa']);
    Route::get('siswa/show-pesanan-kursus/{kd_transaksi}', [PesananController::class, 'show'])->name('siswa.show-history-pesanan-kursus')->middleware(['cek.profil.siswa']);
    Route::get('siswa/create-pesanan/{kd_paket}', [PesananController::class, 'create'])->name('siswa.create-pesanan-kursus')->middleware(['cek.profil.siswa']);
    Route::post('siswa/store-pesanan-kursus', [PesananController::class, 'store'])->name('siswa.store-pesanan-kursus')->middleware(['cek.profil.siswa']);
    Route::delete('siswa/cancell-pesanan-kursus/{order_id}', [PesananController::class, 'cancell'])->name('siswa.cancell-pesanan-kursus')->middleware(['cek.profil.siswa']);
});

Route::middleware(['auth', 'verified.otp'])->group(function () {


    Route::get('management-kategori-kursus', [KategoriKursusController::class, 'index'])->name('admin.management-kursus')->middleware(['permission:view_kategori']);
    Route::post('post-management-kategori-kursus', [KategoriKursusController::class, 'store'])->name('admin.post-management-kursus')->middleware(['permission:create_kategori']);
    Route::post('update-management-kategori-kursus', [KategoriKursusController::class, 'update'])->name('admin.update-management-kursus')->middleware(['permission:update_kategori']);
    Route::delete('delete-management-kategori-kursus', [KategoriKursusController::class, 'delete'])->name('admin.delete-management-kursus')->middleware(['permission:delete_kategori']);
    Route::post('confirm-management-kategori-kursus', [KategoriKursusController::class, 'confirm'])->name('admin.confirm-management-kursus')->middleware(['permission:confirm_kategori']);

    Route::post('store-sub-kategori-kursus', [SubKategoriController::class, 'store'])->name('admin.store-sub-kategori-kursus')->middleware(['permission:create_sub_kategori']);
    Route::post('update-sub-kategori-kursus', [SubKategoriController::class, 'update'])->name('admin.update-sub-kategori-kursus')->middleware(['permission:edit_sub_kategori']);
    Route::delete('delete-sub-kategori-kursus', [SubKategoriController::class, 'delete'])->name('admin.delete-sub-kategori-kursus')->middleware(['permission:delete_sub_kategori']);
    Route::post('confirm-sub-kategori-kursus', [SubKategoriController::class, 'confirm'])->name('admin.confirm-sub-kategori-kursus')->middleware(['permission:confirm_sub_kategori']);

    Route::post('store-jenis-kategori-kursus', [JenisKursusKontroller::class, 'store'])->name('admin.store-jenis-kategori-kursus')->middleware(['permission:create_jenis']);
    Route::post('update-jenis-kategori-kursus', [JenisKursusKontroller::class, 'update'])->name('admin.update-jenis-kategori-kursus')->middleware(['permission:edit_jenis']);
    Route::post('confirm-jenis-kategori-kursus', [JenisKursusKontroller::class, 'confirm'])->name('admin.confirm-jenis-kategori-kursus')->middleware(['permission:confirm_jenis']);
    Route::delete('delete-jenis-kategori-kursus', [JenisKursusKontroller::class, 'delete'])->name('admin.delete-jenis-kategori-kursus')->middleware(['permission:delete_jenis']);
    Route::delete('delete-benefit-jenis-kategori-kursus', [JenisKursusKontroller::class, 'delete_benefit'])->name('delete-benefit-jenis-kategori-kursus')->middleware(['permission:view_jenis']);


    Route::get('management-materi-ajar', [MateriAJarController::class, 'index'])->name('admin.management-materi-ajar')->middleware(['permission:view_materi']);
    Route::post('store-management-materi-ajar', [MateriAJarController::class, 'store'])->name('admin.store-management-materi-ajar')->middleware(['permission:create_materi']);
    Route::post('update-management-materi-ajar', [MateriAJarController::class, 'update'])->name('admin.update-management-materi-ajar')->middleware(['permission:edit_materi']);
    Route::delete('delete-management-materi-ajar', [MateriAJarController::class, 'delete'])->name('admin.delete-management-materi-ajar')->middleware(['permission:delete_materi']);

    Route::get('management-paket-kursus', [ManagementPaketController::class, 'index'])->name('admin.management-paket-kursus')->middleware(['permission:view_paket']);
    Route::get('create-management-paket-kursus', [ManagementPaketController::class, 'create'])->name('admin.create-management-paket-kursus')->middleware(['permission:create_paket']);
    Route::post('store-management-paket-kursus', [ManagementPaketController::class, 'store'])->name('admin.store-management-paket-kursus')->middleware(['permission:create_paket']);
    Route::get('edit-management-paket-kursus/{slug}', [ManagementPaketController::class, 'edit'])->name('admin.edit-management-paket-kursus')->middleware(['permission:edit_paket']);
    Route::post('update-management-paket-kursus', [ManagementPaketController::class, 'update'])->name('admin.update-management-paket-kursus')->middleware(['permission:edit_paket']);
    Route::delete('delete-management-paket-kursus', [ManagementPaketController::class, 'delete'])->name('admin.delete-management-paket-kursus')->middleware(['permission:delete_paket']);
    Route::delete('delete-detail-management-paket-kursus', [ManagementPaketController::class, 'delete_detail'])->name('admin.delete-detail-management-paket-kursus');

    Route::get('management-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'index'])->name('management-pendaftaran-kursus')->middleware(['permission:view_pendaftaran_kursus']);
    Route::get('show-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'show'])->name('admin.show-pendaftaran-kursus')->middleware(['permission:view_kategori']);
    Route::get('formulir-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'create'])->name('admin.formulit-pendaftaran-kursus')->middleware(['permission:create_pendaftaran_kursus']);

    ROute::post('store-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'store'])->name('admin.store-pendaftaran-kursus')->middleware(['permission:create_pendaftaran_kursus']);
    ROute::get('edit-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'edit'])->name('admin.edit-pendaftaran-kursus')->middleware(['permission:edit_pendaftaran_kursus']);
    ROute::post('update-pendaftaran-kursus/', [ManagementPendaftaranKursusController::class, 'update'])->name('admin.update-pendaftaran-kursus')->middleware(['permission:edit_pendaftaran_kursus']);
    Route::get('invoice-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'invoice'])->name('admin.invoice-pendaftaran-kursus');
    Route::get('invoice-all-pendaftaran-kursus/{kd_transaksi}', [ManagementPendaftaranKursusController::class, 'invoice_all'])->name('admin.all-invoice-pendaftaran-kursus');
    Route::get('invoice-one-pendaftaran-kursus/{order_id}', [ManagementPendaftaranKursusController::class, 'invoice_one'])->name('admin.one-invoice-pendaftaran-kursus');
    Route::delete('delete-detail-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'delete_detail'])->name('admin.delete-detail-pendaftaran-kursus');

    Route::get('management-pembayaran-kursus', [PaymentController::class, 'index'])->name('admin.management-pembayaran-kursus')->middleware(['permission:view_pembayaran_kursus']);
    Route::post('store-management-pembayaran-kursus', [PaymentController::class, 'store'])->name('admin.store-pembayaran-kursus')->middleware(['permission:create_pembayaran_kursus']);

    Route::get('daftar-pesanan-kursus', [DaftarPesananKursusController::class, 'index'])->name('admin.daftar-pesanan-kursus')->middleware(['permission:view_pesanan_kursus']);


    Route::get('admin.management-instruktur', [InstrukturController::class, 'index'])->name('admin.management-instruktur')->middleware(['permission:view_instruktur']);
    Route::get('admin.create-management-instruktur', [InstrukturController::class, 'create'])->name('admin.create-management-instruktur')->middleware(['permission:create_instruktur']);
    Route::post('admin.store-management-instruktur', [InstrukturController::class, 'store'])->name('admin.store-management-instruktur')->middleware(['permission:create_instruktur']);
    Route::get('admin.edit-management-instruktur/{kd_ins}', [InstrukturController::class, 'edit'])->name('admin.edit-management-instruktur')->middleware(['permission:edit_instruktur']);
    Route::post('admin.update-management-instruktur/', [InstrukturController::class, 'update'])->name('admin.update-management-instruktur')->middleware(['permission:edit_instruktur']);
    Route::delete('admin.delete-management-instruktur/{id}', [InstrukturController::class, 'delete'])->name('admin.delete-management-instruktur')->middleware(['permission:delete_instruktur']);
    Route::post('admin.confirm-management-instruktur/', [InstrukturController::class, 'confirm'])->name('admin.confirm-management-instruktur')->middleware(['permission:confirm_instruktur']);

    Route::get('admin.management-petugas', [PetugasController::class, 'index'])->name('admin.management-petugas')->middleware(['permission:view_petugas']);
    Route::get('admin.create-management-petugas', [PetugasController::class, 'create'])->name('admin.create-management-petugas')->middleware(['permission:create_petugas']);
    Route::post('admin.store-management-petugas', [PetugasController::class, 'store'])->name('admin.store-management-petugas')->middleware(['permission:create_petugas']);
    Route::get('admin.edit-management-petugas/{kd_petugas}', [PetugasController::class, 'edit'])->name('admin.edit-management-petugas')->middleware(['permission:edit_petugas']);
    Route::post('admin.update-management-petugas/', [PetugasController::class, 'update'])->name('admin.update-management-petugas')->middleware(['permission:edit_petugas']);
    Route::delete('admin.delete-management-petugas/{kd_petugas}', [PetugasController::class, 'delete'])->name('admin.delete-management-petugas')->middleware(['permission:delete_petugas']);
    Route::post('admin.confirm-management-petugas', [PetugasController::class, 'confirm'])->name('admin.confirm-management-petugas')->middleware(['permission:confirm_petugas']);


    Route::get('admin.management-siswa', [SiswaController::class, 'index'])->name('admin.management-siswa')->middleware(['permission:view_siswa']);
    Route::get('admin.create-management-siswa', [SiswaController::class, 'create'])->name('admin.create-management-siswa')->middleware(['permission:create_siswa']);
    Route::post('admin.store-management-siswa', [SiswaController::class, 'store'])->name('admin.store-management-siswa')->middleware(['permission:create_siswa']);
    Route::get('admin.edit-management-siswa/{kd_siswa}', [SiswaController::class, 'edit'])->name('admin.edit-management-siswa')->middleware(['permission:edit_siswa']);
    Route::post('admin.update-management-siswa/', [SiswaController::class, 'update'])->name('admin.update-management-siswa')->middleware(['permission:edit_siswa']);

    Route::get('managament-kas', [KasController::class, 'index'])->name('admin.management-kas');

    Route::get('management-profile-perusahaan', [ProfilePerusahaanController::class, 'index'])->name('admin.management-profile-perusahaan')->middleware(['permission:view_kantor_cabang']);
    Route::get('create-management-profile-perusahaan', [ProfilePerusahaanController::class, 'create'])->name('admin.create-management-profile-perusahaan')->middleware(['permission:create_kantor_cabang']);
    Route::post('store-management-profile-perusahaan', [ProfilePerusahaanController::class, 'store'])->name('admin.store-management-profile-perusahaan')->middleware(['permission:create_kantor_cabang']);
    Route::get('edit-management-profile-perusahaan/{kd_cabang}', [ProfilePerusahaanController::class, 'edit'])->name('admin.edit-management-profile-perusahaan')->middleware(['permission:edit_kantor_cabang']);
    Route::post('update-management-profile-perusahaan/', [ProfilePerusahaanController::class, 'update'])->name('admin.update-management-profile-perusahaan')->middleware(['permission:edit_kantor_cabang']);
    Route::delete('delete-management-profile-perusahaan/{id}', [ProfilePerusahaanController::class, 'delete'])->name('admin.delete-management-profile-perusahaan')->middleware(['permission:edit_kantor_cabang']);

    Route::get('management-slider', [SliderController::class, 'index'])->name('admin.management-slider')->middleware(['permission:view_slider']);
    Route::get('create-management-slider', [SliderController::class, 'create'])->name('admin.create-management-slider')->middleware(['permission:create_slider']);
    Route::post('store-management-slider', [SliderController::class, 'store'])->name('admin.store-management-slider')->middleware(['permission:create_slider']);
    Route::delete('delete-management-slider/{id}', [SliderController::class, 'delete'])->name('admin.delete-management-slider')->middleware(['permission:create_slider']);

    Route::get('role-permission', [RolePermissionController::class, 'index'])->name('auth.role-permission');
    Route::post('create-role-permission', [RolePermissionController::class, 'store'])->name('auth.create-role-permission');
    Route::put('update-role-permission/{id}', [RolePermissionController::class, 'update'])->name('auth.update-role-permission');
    Route::delete('delete-role-permission/{id}', [RolePermissionController::class, 'delete'])->name('auth.delete-role-permission');
});
