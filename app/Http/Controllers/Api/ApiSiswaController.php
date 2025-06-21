<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use Illuminate\Http\Request;

class ApiSiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Siswa::query()->where('status_konfirmasi', '=', 'terima');
        if ($request->search) {
            $query->where('kd_siswa', 'like', '%' . $request->search . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $request->search . '%')
                ->orWhere('nik_ktp', 'like', '%' . $request->search . '%');
        }
        if ($request->kantor_cabang_id) {
            $query->where('kantor_cabang_id', $request->kantor_cabang_id);
        }
        $siswa = $query->latest()->get();
        return response()->json($siswa);
    }
}
