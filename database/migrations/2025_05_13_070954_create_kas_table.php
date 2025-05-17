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
        Schema::create('kas', function (Blueprint $table) {
            $table->id();

            $table->date('tanggal');
            $table->enum('jenis_transaksi', ['pemasukan', 'pengeluaran']);
            $table->string('sumber')->nullable();
            $table->text('keterangan')->nullable();
            $table->bigInteger('debit')->default(0);  // uang masuk
            $table->bigInteger('kredit')->default(0); // uang keluar
            $table->bigInteger('saldo')->default(0);  // saldo setelah transaksi
            $table->foreignId('petugas_id')->nullable()->constrained('users')->onDelete('set null');
            $table->unsignedBigInteger('model_id')->nullable(); // ID model terkait
            $table->string('model_type')->nullable(); // Tipe model terkait
            $table->string('kantor_cabang')->default('mudicom');
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
        Schema::dropIfExists('kas');
    }
};
