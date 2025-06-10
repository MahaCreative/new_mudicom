<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PesananKursus;
use Illuminate\Http\Request;

class ApiPendaftaranKursusController extends Controller
{
    public function index(Request $request)
    {
        $query = PesananKursus::query()->with(['siswa', 'payment' => function ($q) {
            $q->with('petugas')->orderBy('installment_number', 'desc');
        }]);
        if ($request->kd_transaksi) {
            $query->where(function ($q) use ($request) {
                $q->where('kd_transaksi', 'like', '%' . $request->kd_transaksi . '%')
                    ->orWhereHas('siswa', function ($quer) use ($request) {
                        $quer->where('kd_siswa', 'like', '%' . $request->kd_transaksi . '%')
                            ->orWhere('nama_lengkap', 'like', '%' . $request->kd_transaksi . '%');
                    });
            });
        }

        $pesanan = $query->get();
        return response()->json($pesanan);
    }
}
