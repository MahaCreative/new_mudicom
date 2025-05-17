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
        Schema::create('paket_kursuses', function (Blueprint $table) {
            $table->id();
            $table->string('kd_paket');
            $table->string('nama_paket');
            $table->string('kategori_kursus');
            $table->string('sub_kategori_kursus');
            $table->string('jenis_kursus');
            $table->longText('deskripsi');
            $table->string('thumbnail')->default('image/default_thumnbnail.jpg');
            $table->tinyInteger('total_pertemuan');
            $table->tinyInteger('total_materi');
            $table->bigInteger('harga');
            $table->string('status')->default('aktif'); //aktif, non aktif
            $table->string('kantor_cabang')->default('mudicom');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket_kursuses');
    }
};
