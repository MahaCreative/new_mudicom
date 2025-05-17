<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesananKursus extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function detail()
    {
        return $this->hasMany(DetailPesananKursus::class, 'pesanan_kursus_id');
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }

    public function payment()
    {
        return $this->hasMany(Payment::class, 'pesanan_kursus_id');
    }
}
