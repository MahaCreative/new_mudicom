<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\KategoriKursus;
use App\Models\PaketKursus;
use Illuminate\Http\Request;

class KategoriKursusController extends Controller
{
    public function index(Request $request)
    {
        $kategori = KategoriKursus::latest()->get();
        $query = PaketKursus::query();
        $paket = $query->latest()->get();
        return inertia('Guest/KategoriKursus/Index', compact('paket', 'kategori'));
    }
}
