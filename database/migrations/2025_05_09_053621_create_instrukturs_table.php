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
        Schema::create('instrukturs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('kategori_kursus_id')->constrained('kategori_kursuses');
            $table->string('kd_instruktur')->unique();
            $table->string('nik_ktp');
            $table->string('nama_lengkap');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('jenis_kelamin');
            $table->string('telp')->nullable();
            $table->string('pendidikan')->nullable();
            $table->string('agama');
            $table->string('alamat');
            $table->string('kelurahan');
            $table->string('kecamatan');
            $table->string('kabupaten');
            $table->longText('deskripsi');
            $table->string('foto')->default('image/default_profile.png');
            $table->date('tanggal_masuk')->default(now());
            $table->date('tanggal_keluar')->nullable();
            $table->string('kantor_cabang')->default('mudicom');
            $table->string('status')->default('aktif'); //aktif, keluar
            $table->string('status_konfirmasi')->default('menunggu konfirmasi');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instrukturs');
    }
};
