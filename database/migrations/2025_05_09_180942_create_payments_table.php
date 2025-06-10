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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kantor_cabang_id')->constrained('kantor_cabangs')->onDelete('cascade')->default(1);
            $table->foreignId('pesanan_kursus_id')->constrained('pesanan_kursuses')->onDelete('restrict'); // Relasi ke tabel pesanan_kursus
            $table->foreignId('siswa_id')->constrained('siswas')->onDelete('cascade'); // Relasi ke tabel siswa
            $table->foreignId('petugas_id')->constrained('users')->onDelete('cascade'); // Relasi ke tabel petugas
            $table->string('order_id'); // ID pemesanan (unik untuk transaksi)
            $table->double('gross_amount'); // Jumlah total yang harus dibayar
            $table->json('payment_info')->nullable(); // Informasi pembayaran tambahan dalam format JSON
            $table->string('payment_type')->nullable(); // Jenis pembayaran (misal: tunai, transfer bank, Midtrans, dll)
            $table->string('status')->default('pending'); // Status pembayaran: pending, settlement, expired, cancelled
            $table->string('succeeded_at')->nullable(); // Waktu pembayaran berhasil (jika sudah dibayar)
            $table->string('kantor_cabang')->default('mudicom');
            $table->double('remaining_amount')->default(0); // Jumlah yang masih harus dibayar
            $table->integer('installments')->default(1); // Jumlah cicilan yang dibagi
            $table->integer('installment_number')->default(1); // Nomor cicilan yang sedang dilakukan
            $table->string('status_konfirmasi')->default('reject'); // confirm, reject
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
        Schema::dropIfExists('payments');
    }
};
