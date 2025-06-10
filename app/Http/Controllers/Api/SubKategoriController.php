<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KategoriKursus;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;

class SubKategoriController extends Controller
{
    public function index(Request $request)
    {
        $query = SubKategoriKursus::query();
        if ($request->kategori) {
            $kategori = KategoriKursus::where('nama_kategori', $request->kategori)->first();

            if ($kategori) {
                $query->where('kategori_kursus_id', $kategori->id);
            }
        }
        $sub = $query->latest()->get();
        return response()->json($sub);
    }
}
