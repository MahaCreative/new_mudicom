<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use Illuminate\Http\Request;

class ApiSiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Siswa::query();
        if ($request->search) {
            $query->where('kd_siswa', 'like', '%' . $request->search . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $request->search . '%')
                ->orWhere('nik_ktp', 'like', '%' . $request->search . '%');
        }
        $siswa = $query->latest()->get();
        return response()->json($siswa);
    }
}
