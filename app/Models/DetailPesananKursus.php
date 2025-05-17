<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPesananKursus extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function paket()
    {
        return $this->belongsTo(PaketKursus::class, 'paket_kursus_id');
    }
    public function instruktur()
    {
        return $this->belongsTo(Instruktur::class, 'instruktur_id');
    }
    public function pesanan()
    {
        return $this->belongsTo(PesananKursus::class, 'pesanan_kursus_id');
    }
}
