<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PaketKursus;
use Illuminate\Http\Request;

class ApiPaketController extends Controller
{
    public function index(Request $request)
    {
        $query = PaketKursus::query()->where('status', '=', 'aktif');
        if ($request->kategori) {
            $query->where('kategori_kursus', '=', $request->kategori);
        }
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('kd_paket', 'like', '%' . $request->search . '%');
                $q->orWhere('nama_paket', 'like', '%' . $request->search . '%');
            });
        }
        $paket = $query->latest()->get();
        return response()->json($paket);
    }
}
