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
        Schema::create('sub_kategori_kursuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_kursus_id')->constrained('kategori_kursuses')->onDelete('cascade')->onUpdate('restrict');
            $table->string('nama_sub_kategori');
            $table->string('thumbnail')->default('image/default_thumnbnail.jpg');
            $table->longText('deskripsi');
            $table->string('status_konfirmasi')->default('menunggu konfirmasi');
            $table->bigInteger('views')->default(0);
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
        Schema::dropIfExists('sub_kategori_kursuses');
    }
};
