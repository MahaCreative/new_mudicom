<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $casts = ['payment_info' => 'array'];
    protected $guarded = [];

    public function petugas()
    {
        return $this->belongsTo(User::class);
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function pesanan()
    {
        return $this->belongsTo(PesananKursus::class, 'pesanan_kursus_id');
    }
    public function kas()
    {
        return $this->morphMany(Kas::class, 'modelable');
    }
}
