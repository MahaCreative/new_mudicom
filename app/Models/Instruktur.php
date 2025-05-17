<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instruktur extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function sosmed()
    {
        return $this->hasMany(SosialMediaInstruktur::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
