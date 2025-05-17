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
        Schema::create('pesanan_kursuses', function (Blueprint $table) {
            $table->id();
            $table->string('kd_transaksi')->nullable();
            $table->foreignId('siswa_id')->constrained('siswas')->onDelete('restrict');
            $table->foreignId('petugas_id')->constrained('users')->onDelete('restrict');
            $table->string('total_pertemuan');
            $table->tinyInteger('total_materi');
            $table->tinyInteger('total_discount');
            $table->decimal('total_harga', 12, 2)->default(0); // Harga total kursus
            $table->decimal('total_netto', 12, 2);
            $table->decimal('jumlah_bayar', 12, 2)->default(0); // Jumlah yang sudah dibayar
            $table->decimal('sisa_bayar', 12, 2)->default(0); // Sisa yang harus dibayar
            $table->enum('status_pembayaran', ['belum_lunas', 'lunas', 'cicilan'])->default('belum_lunas'); // Status pembayaran
            $table->timestamp('tanggal_pesan')->useCurrent(); // Tanggal pesanan dibuat
            $table->timestamp('tanggal_pembayaran_terakhir')->nullable(); // Tanggal pembayaran terakhir
            $table->enum('status_pesanan', ['aktif', 'selesai', 'batal'])->default('aktif'); // Status pesanan
            $table->string('kantor_cabang')->default('mudicom');
            $table->string('status_konfirmasi')->default('pending'); // pending, confirm,, reject
            $table->string('type_pesanan')->default('offline'); // online, offline
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps(); // Kolom created_at dan updated_at
            $table->softDeletes(); // Kolom untuk soft delete jika diperlukan
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanan_kursuses');
    }
};
