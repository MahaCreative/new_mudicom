<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kas extends Model
{
    use HasFactory;
    protected $guarded = [];

    private function getSaldoTerbaru()
    {
        $lastKas = \App\Models\Kas::orderBy('id', 'desc')->first();
        return $lastKas ? $lastKas->saldo : 0;
    }

    public function modelable()
    {
        return $this->morphTo();  // Relasi polymorphic
    }
}
