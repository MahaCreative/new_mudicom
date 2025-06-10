<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaketKursus extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function detail()
    {
        return $this->hasMany(DetailPaketKursus::class, 'paket_kursus_id');
    }

    public function reason()
    {
        return $this->hasMany(ReasonPaket::class);
    }
    public function trouble()
    {
        return $this->hasMany(Trouble::class);
    }

    public function solusi()
    {
        return $this->hasOne(Solution::class);
    }
    public function kriteria()
    {
        return $this->hasOne(Criteria::class);
    }
    public function funfact()
    {
        return $this->hasOne(FunFact::class);
    }
}
