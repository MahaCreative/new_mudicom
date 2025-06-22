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
        Schema::create('detail_pesanan_kursuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesanan_kursus_id')->constrained('pesanan_kursuses')->onDelete('restrict');
            $table->foreignId('paket_kursus_id')->constrained('paket_kursuses')->onDelete('restrict');
            $table->foreignId('instruktur_id')->nullable()->constrained('instrukturs')->onDelete('restrict');
            $table->tinyInteger('diskont')->default(0);
            $table->decimal('harga', 12, 0)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_pesanan_kursuses');
    }
};
