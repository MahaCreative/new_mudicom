<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KantorCabang extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function sosmed()
    {
        return $this->hasMany(SosialMedia::class, 'kantor_cabang_id');
    }
    public function misi()
    {
        return $this->hasMany(Misi::class);
    }
    public function visi()
    {
        return $this->hasOne(Visi::class, 'kantor_cabang_id');
    }
}
