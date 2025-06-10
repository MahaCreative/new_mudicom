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
        Schema::table('sliders', function (Blueprint $table) {
            $table->unsignedBigInteger('kantor_cabang_id')->nullable();
            $table->foreign('kantor_cabang_id')->references('id')->on('kantor_cabangs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sliders', function (Blueprint $table) {
            $table->dropForeign('sliders_kantor_cabang_id_foreign');
            $table->dropColumn('kantor_cabang_id');
        });
    }
};
