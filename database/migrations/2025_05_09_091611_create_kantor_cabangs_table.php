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
        Schema::create('kantor_cabangs', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);              // Nama kantor cabang
            $table->string('kode', 20)->unique();     // Kode cabang unik (optional)
            $table->text('alamat');                   // Alamat lengkap
            $table->string('kota', 50);               // Kota
            $table->string('provinsi', 50);           // Provinsi
            $table->string('kode_pos', 10)->nullable(); // Kode pos
            $table->string('telepon', 20)->nullable(); // Nomor telepon
            $table->string('email', 100)->nullable(); // Email kantor cabang
            $table->string('status')->default('cabang'); //pusat, cabang
            $table->longText('deskripsi')->nullable(); //pusat, cabang
            $table->string('logo')->default('image/logo.png'); //pusat, cabang
            $table->string('thumbnail')->default('image/default_thumnbnail.jpg'); //pusat, cabang
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
        Schema::dropIfExists('kantor_cabangs');
    }
};
