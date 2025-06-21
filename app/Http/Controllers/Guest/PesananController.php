<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\DetailPaketKursus;
use App\Models\DetailPesananKursus;
use App\Models\PaketKursus;
use App\Models\Payment;
use App\Models\PesananKursus;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class PesananController extends Controller
{

    public function index(Request $request)
    {
        $profile = Siswa::where('user_id', $request->user()->id)->first();
        $pesanan = PesananKursus::where('siswa_id', $profile->id)->latest()->get();
        return inertia('Guest/Pesanan/Index', compact('pesanan'));
    }

    public function show(Request $request, $kd_transaksi)
    {
        $pesanan = PesananKursus::where('kd_transaksi', $kd_transaksi)->first();
        $siswa = Siswa::where('id', $pesanan->siswa_id)->first();
        $detail = DetailPesananKursus::with('paket', 'instruktur')->where('pesanan_kursus_id', $pesanan->id)->get();
        $payment = Payment::where('pesanan_kursus_id', $pesanan->id)->first();
        return inertia('Guest/Pesanan/Show', compact('pesanan', 'siswa', 'detail', 'payment'));
    }
    public function create(Request $request, $kd_paket)
    {
        $profile = Siswa::where('user_id', $request->user()->id)->first();
        $paket = PaketKursus::where('kd_paket', $kd_paket)->first();
        return inertia('Guest/Pesanan/CreatePesanan', compact('paket', 'profile'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $bank = [
            'bank' => 'bri',
            'nama' => 'supriadi M',
            'rekening' => 'BRI',
            'expiry_time' => '',
        ];

        $siswa = Siswa::where('user_id', $request->user()->id)->first();

        $paket = PaketKursus::where('kd_paket', $request->kd_paket)->first();

        $jumlahPesanan = PesananKursus::where('siswa_id', $siswa->id)->count();
        $kd_transaksi = 'TR-' . now()->format('my') . '-' . $siswa->id . str_pad($jumlahPesanan + 1, 4, '0', STR_PAD_LEFT);
        $total_harga = $paket->harga - $paket->harga_promo;
        $ppn = (int) round($total_harga * 0.11);
        DB::beginTransaction();
        try {
            $pesanan = PesananKursus::create([
                'kd_transaksi' => $kd_transaksi,
                'siswa_id' => $siswa->id,

                'total_pertemuan' => $paket->total_pertemuan,
                'total_materi' => $paket->total_materi,
                'total_discount' => '0',
                'total_harga' => $total_harga,
                'total_netto' => $ppn + $total_harga,
                'ppn' => $ppn, // KASI MUNCUL NANTI INI KARNA DIPAKE
                'jumlah_bayar' => 0,
                'sisa_bayar' => 0,
                'tanggal_pesan' => now(),
                'type_pesanan' => 'online',
                'created_by' => $request->user()->name,
                // 'status_pesanan' => 'trial',
            ]);
            $detail = DetailPesananKursus::create([

                'pesanan_kursus_id' => $pesanan->id,
                'paket_kursus_id' => $paket->id,
                'diskont' => '0',
                'harga' => $total_harga,

            ]);
            $order_id = 'PA-' . now()->format('my') . '-' . $siswa->id . $pesanan->id . now()->format('h:i:s');
            $costumner_detail = [
                "email" => $request->user()->email,
                "first_name" => $request->user()->nama_lengkap,
                "phone" => $request->user()->phone,
            ];
            $itemDetails = [
                'id' => $paket->id,
                'price' => $pesanan->total_netto,
                'quantity' => 1,
                'name' => $paket->nama_paket,
            ];
            $data = [
                'payment_type' => $request->payment_type,
                "transaction_details" => [
                    "gross_amount" => $pesanan->total_netto,
                    "order_id" => $order_id
                ],
                "customer_details" => $costumner_detail,
                "item_details" => $itemDetails,
                'custom_expiry' => [
                    'order_time' => now('Asia/Jakarta')->format('Y-m-d H:i:s O'),
                    'expiry_duration' => 24,
                    'unit' => 'hour',
                ],
            ];
            if ($request->payment_type == 'bank_transfer') {
                $data = [...$data, "bank_transfer" => [
                    'bank' => $request->bank,
                ]];
            } else if ($request->payment_type == 'cstore') {
                $data = [...$data, "cstore" => [
                    "store" => $request->store,
                    "message" => "Message to display"
                ]];
            }
            $payment = Payment::create([
                'pesanan_kursus_id' => $pesanan->id,
                'siswa_id' => $siswa->id,
                'order_id' => $order_id,
                'gross_amount' => $pesanan->total_netto,

                'payment_type' => $request->payment_type,
                // 'kantor_cabang' => '1', // hapus nanti ini
                'remaining_amount' =>  0,
                'created_by' => $request->user()->name,
            ]);
            $paymentInfo = [];
            if ($request->payment_type !== 'manual_transfer') {
                $response = Http::withBasicAuth(config('services.midtrans.server_key') . ":", '')
                    ->post("https://api.sandbox.midtrans.com/v2/charge", $data);
                $body = $response->json();

                if ($request->payment_type == "bank_transfer") {
                    $paymentInfo = [
                        'bank' => [
                            'bank' => $body['va_numbers'][0]['bank'],
                            'va_number' => $body['va_numbers'][0]['va_number'],
                        ]
                    ];
                } else if ($request->payment_type == "gopay") {
                    $paymentInfo = [
                        'qr_code' => $body['actions'][0]['url'],
                    ];
                    // dd($paymentInfo);
                } else if ($request->payment_type == "cstore") {
                    $paymentInfo = [
                        'cstore' => [
                            'store' => $body['store'],
                            'payment_code' => $body['payment_code']
                        ]
                    ];
                }
                $paymentInfo['expiry_time'] = $body['expiry_time'];
            } else {
                $paymentInfo = $bank;
            }






            // return $body;

            $payment->update(['payment_info' => $paymentInfo]);
            DB::commit();
            return redirect()->route('siswa.show-history-pesanan-kursus', $pesanan->kd_transaksi);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function cancell(Request $request, $order_id)
    {
        $payment = Payment::where('order_id', $order_id)->first();
        $payment->update(['status' => 'cancell']);
        $pesanan = PesananKursus::where('id', $payment->pesanan_kursus_id)->first();
        $pesanan->update(['status_pesanan' => 'cancell',  'status_pembayaran' => 'cancell']);
        $response = Http::withBasicAuth(config('services.midtrans.server_key') . ":", '')->post("https://api.sandbox.midtrans.com/v2/$payment->order_id/cancel");
    }
}
