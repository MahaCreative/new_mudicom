<?php

namespace App\Http\Controllers;

use App\Models\Instruktur;
use App\Models\Kas;
use App\Models\PesananKursus;
use App\Models\Petugas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $count = [];
        $siswa = Siswa::count();
        $instruktur = Instruktur::count();
        $petugas = Petugas::count();
        $pendaftaran = PesananKursus::whereMonth('created_at', now()->format('m'))->count();
        $kas = Kas::where('kantor_cabang_id', 1)->latest()->first();

        $total_kas = $kas ? $kas->saldo : 0;
        $pemasukan = Kas::where('kantor_cabang_id', 1)->whereMonth('created_at', now()->format('m'))->sum('debit');
        $pengeluaran = Kas::where('kantor_cabang_id', 1)->whereMonth('created_at', now()->format('m'))->sum('kredit');
        $count = [
            'siswa' => $siswa,
            'instruktur' => $instruktur,
            'petugas' => $petugas,
            'total_kas' => $total_kas,
            'pemasukan' => $pemasukan,
            'pengeluaran' => $pengeluaran,
            'pendaftaran' => $pendaftaran,
        ];
        $tahun = $tahun ?? date('Y');

        // Semua nama bulan dalam Bahasa Indonesia
        $bulanIndo = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember'
        ];

        // Ambil data grup berdasarkan bulan
        $data = DB::table('kas') // ganti dengan nama tabel kamu
            ->selectRaw('MONTH(tanggal) as bulan, 
                     SUM(debit) as total_pemasukan, 
                     SUM(kredit) as total_pengeluaran')
            ->whereYear('tanggal', $tahun)
            ->groupByRaw('MONTH(tanggal)')
            ->get()
            ->keyBy('bulan');

        // Siapkan array lengkap 12 bulan
        $grafik_kas = [];
        foreach ($bulanIndo as $key => $namaBulan) {
            $grafik_kas[] = [
                'bulan' => $namaBulan,
                'pemasukan' => $data[$key]->total_pemasukan ?? 0,
                'pengeluaran' => $data[$key]->total_pengeluaran ?? 0,
            ];
        }
        return inertia('Dashboard/Index', compact('count', 'grafik_kas'));
    }
}
