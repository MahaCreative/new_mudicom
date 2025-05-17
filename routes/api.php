<?php

use App\Http\Controllers\Api\ApiInstrukturController;
use App\Http\Controllers\Api\ApiPaketController;
use App\Http\Controllers\Api\ApiPendaftaranKursusController;
use App\Http\Controllers\Api\ApiSiswaController;
use App\Http\Controllers\ManagementPendaftaranKursusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('get-data-instruktur', [ApiInstrukturController::class, 'index'])->name('api.data-instruktur');
Route::get('show-data-instruktur', [ApiInstrukturController::class, 'show'])->name('api.show-data-instruktur');

Route::get('get-data-siswa', [ApiSiswaController::class, 'index'])->name('api.get-data-siswa');
Route::get('get-data-paket', [ApiPaketController::class, 'index'])->name('api.get-data-paket');

ROute::post('store-pendaftaran-kursus', [ManagementPendaftaranKursusController::class, 'store'])->name('admin.store-pendaftaran-kursus');

Route::get('get-data-pendaftaran-kursus', [ApiPendaftaranKursusController::class, 'index'])->name('api.get-data-pendaftaran-kursus');
