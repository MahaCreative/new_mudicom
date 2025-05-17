<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use Carbon\Carbon;
use Illuminate\Http\Request;

class KasController extends Controller
{
    public function index(Request $request)
    {
        $query = Kas::query();
        $kas = $query->latest()->get();

        $hariIni = Carbon::today();

        // Jumlah pemasukan hari ini
        $totalPemasukan = Kas::whereDate('tanggal', $hariIni)
            ->where('kantor_cabang', 'mudicom')
            ->where('jenis_transaksi', 'pemasukan')
            ->sum('debit');

        // Jumlah pengeluaran hari ini
        $totalPengeluaran = Kas::whereDate('tanggal', $hariIni)
            ->where('kantor_cabang', 'mudicom')
            ->where('jenis_transaksi', 'pengeluaran')
            ->sum('kredit');

        // Saldo terakhir (saldo dari transaksi terbaru)
        $saldoTerakhir = Kas::orderBy('tanggal', 'desc')
            ->where('kantor_cabang', 'mudicom')
            ->orderBy('id', 'desc')
            ->value('saldo');
        return inertia('Admin/Kas/Index', compact(
            'kas',
            'totalPemasukan',
            'totalPengeluaran',
            'saldoTerakhir',
        ));
    }
}
