<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('petugas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->string('kd_petugas')->unique();
            $table->string('nik_ktp')->nullable();
            $table->string('nama_lengkap');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->date('tanggal_masuk')->default(now());
            $table->date('tanggal_keluar')->nullable();
            $table->string('jenis_kelamin')->nullable();
            $table->string('agama')->nullable();
            $table->string('alamat')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('telp')->nullable();
            $table->string('pendidikan')->nullable();
            $table->string('foto')->default('image/default_profile.png');
            $table->foreignId('kantor_cabang_id')->constrained('kantor_cabangs')->onDelete('cascade')->default(1);
            $table->string('status')->default('aktif'); //aktif, keluar
            $table->string('status_konfirmasi')->default('menunggu konfirmasi');
            $table->string('jabatan');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('petugas');
    }
};
