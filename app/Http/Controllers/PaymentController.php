<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\Payment;
use App\Models\PesananKursus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::query()->with('pesanan', 'petugas', 'siswa');

        $payment  = $query->latest()->get();

        return inertia('Admin/ManagementPembayaran/Index', compact('payment'));
    }

    public function store(Request $request)
    {

        $pesanan = PesananKursus::where('kd_transaksi', $request->kd_transaksi)->first();
        DB::beginTransaction();
        try {
            foreach ($request->payment as $item) {
                if ($item['id'] === null) {
                    $payment = Payment::create([
                        'pesanan_kursus_id' => $pesanan->id,
                        'siswa_id' => $pesanan->siswa_id,
                        'petugas_id' => 1,
                        'order_id' => $item['order_id'],
                        'gross_amount' => $item['gross_amount'],
                        'payment_type' => 'tunai',
                        'status' => 'settlement',
                        'succeeded_at' => now(),
                        'remaining_amount' => $item['remaining_amount'],
                        'installment_number' => $item['installment_number'],
                        'kantor_cabang_id' => $pesanan->kantor_cabang_id
                    ]);
                    $kas = Kas::create([
                        'tanggal' => now(),
                        'jenis_transaksi' => 'pemasukan',
                        'sumber' => 'pembayaran kursus',
                        'keterangan' => 'pendaftaran kursus ' . $pesanan->kd_transaksi,
                        'debit' => $request->jumlah_bayar,      // uang masuk
                        'kredit' => 0,                   // tidak ada uang keluar
                        'saldo' => $this->getSaldoTerbaru() + $request->jumlah_bayar,
                        'petugas_id' => auth()->id() ?? 1,
                        'model_id' => $payment->id,
                        'model_type' => Payment::class,
                        'kantor_cabang_id' => $pesanan->kantor_cabang_id
                    ]);
                } else {
                    $payment = Payment::find($item['id']);
                    $payment->update([
                        'petugas_id' => 1,
                        'gross_amount' => $item['gross_amount'],
                        'payment_type' => 'tunai',
                        'status' => 'settlement',
                        'succeeded_at' => now(),
                        'remaining_amount' => $item['remaining_amount'],
                        'installment_number' => $item['installment_number'],
                    ]);

                    // Cari dan update kas terkait jika ada
                    $kas = Kas::where('model_id', $payment->id)
                        ->where('model_type', Payment::class)
                        ->first();

                    if ($kas) {
                        $kas->update([
                            'tanggal' => now(),
                            'debit' => $item['gross_amount'],
                            'saldo' => $this->getSaldoTerbaruTanpa($kas->id) + $item['gross_amount'],
                            'keterangan' => 'update pembayaran kursus ' . $pesanan->kd_transaksi,
                        ]);
                    } else {
                        // Jika tidak ditemukan, mungkin dulu belum tercatat, jadi kita catat sekarang
                        Kas::create([
                            'tanggal' => now(),
                            'jenis_transaksi' => 'pemasukan',
                            'sumber' => 'pembayaran kursus',
                            'keterangan' => 'pembayaran kursus ' . $pesanan->kd_transaksi,
                            'debit' => $item['gross_amount'],
                            'kredit' => 0,
                            'saldo' => $this->getSaldoTerbaru() + $item['gross_amount'],
                            'petugas_id' => auth()->id() ?? 1,
                            'model_id' => $payment->id,
                            'model_type' => Payment::class,
                            'kantor_cabang_id' => $pesanan->kantor_cabang_id
                        ]);
                    }
                }
            }
            $total_bayar = Payment::where('pesanan_kursus_id', $pesanan->id)->sum('gross_amount');
            $sisa_bayar = $pesanan->total_netto - $total_bayar;
            $pesanan->update([
                'jumlah_bayar' => $total_bayar,
                'sisa_bayar' => $sisa_bayar,
                'tanggal_pembayaran_terakhir' => now(),
                'status_pembayaran' => $sisa_bayar > 0 ? "belum_lunas" : "lunas"
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
    private function getSaldoTerbaru()
    {
        $lastKas = \App\Models\Kas::orderBy('id', 'desc')->first();
        return $lastKas ? $lastKas->saldo : 0;
    }
    protected function getSaldoTerbaruTanpa($kasId)
    {
        $lastKas = Kas::where('id', '!=', $kasId)->orderByDesc('id')->first();
        return $lastKas?->saldo ?? 0;
    }
}
