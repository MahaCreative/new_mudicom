<?php

namespace App\Http\Controllers;

use App\Models\DetailPaketKursus;
use App\Models\DetailPesananKursus;
use App\Models\KategoriKursus;
use App\Models\PesananKursus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DaftarPesananKursusController extends Controller
{
    public function index(Request $request)
    {


        $count_kategori = $detail = DB::table('detail_pesanan_kursuses')->join('paket_kursuses', 'detail_pesanan_kursuses.paket_kursus_id', '=', 'paket_kursuses.id')
            ->select('paket_kursuses.kategori_kursus', DB::raw('COUNT(*) as total_dipesan'))
            ->groupBy('paket_kursuses.kategori_kursus')
            ->get();

        $detail = DetailPesananKursus::join('paket_kursuses', 'detail_pesanan_kursuses.paket_kursus_id', '=', 'paket_kursuses.id')
            ->join('pesanan_kursuses', 'pesanan_kursuses.id', '=', 'detail_pesanan_kursuses.pesanan_kursus_id')
            ->join('siswas', 'pesanan_kursuses.siswa_id', '=', 'siswas.id')
            ->join('instrukturs', 'instrukturs.id', '=', 'detail_pesanan_kursuses.instruktur_id')
            ->select(
                'detail_pesanan_kursuses.*',
                'paket_kursuses.nama_paket',
                'paket_kursuses.kategori_kursus',
                'paket_kursuses.jenis_kursus',
                'paket_kursuses.sub_kategori_kursus',
                'paket_kursuses.total_pertemuan',
                'paket_kursuses.total_materi',
                'pesanan_kursuses.kd_transaksi',
                'siswas.nama_lengkap as nama_siswa',
                'instrukturs.nama_lengkap as nama_instruktur'
            )
            ->get();


        return inertia('Admin/DaftarPesananKursus/Index', compact('detail', 'count_kategori'));
    }
}
