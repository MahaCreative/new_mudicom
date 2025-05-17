<?php

namespace App\Http\Controllers;

use App\Models\DetailPesananKursus;
use App\Models\Instruktur;
use App\Models\JenisKursus;
use App\Models\Kas;
use App\Models\KategoriKursus;
use App\Models\PaketKursus;
use App\Models\Payment;
use App\Models\PesananKursus;
use App\Models\Siswa;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator;

class ManagementPendaftaranKursusController extends Controller
{
    public function index(Request $request)
    {
        $query = PesananKursus::query()->with(['siswa', 'detail', 'petugas']);
        $pesanan = $query->latest()->get();

        return inertia('Global/PendaftaranKursuss/Index', compact('pesanan'));
    }

    public function show(Request $request, $kd_transaksi)
    {
        $kategori = KategoriKursus::latest()->get();
        $pendaftaran = PesananKursus::with('petugas')->where('kd_transaksi', $kd_transaksi)->first();
        $detail = DetailPesananKursus::with('paket', 'instruktur')->where('pesanan_kursus_id', $pendaftaran->id)->get();
        // dd($detail);
        $payment = Payment::with('petugas')->where('pesanan_kursus_id', $pendaftaran->id)->latest()->get();
        $siswa = Siswa::find($pendaftaran->siswa_id);

        return inertia('Global/PendaftaranKursuss/Show', compact('pendaftaran', 'payment', 'detail', 'siswa', 'kategori', 'kd_transaksi'));
    }

    public function create(Request $request)
    {
        $kategori = KategoriKursus::latest()->get();
        $sub = SubKategoriKursus::with('kategori')->latest()->get();
        $jenis = JenisKursus::latest()->get();
        $kd_transaksi = 'tr-' . now()->format('my') . '-00' . PesananKursus::count() + 1;
        return inertia('Global/PendaftaranKursuss/Create', compact(
            'kategori',
            'sub',
            'jenis',
            'kd_transaksi'
        ));
    }

    public function store(Request $request)
    {
        // Validasi awal

        $validator = FacadesValidator::make($request->all(), [
            'kd_siswa' => 'required|exists:siswas,kd_siswa',
            'nama_siswa' => 'required|string',
            'bayar' => 'required|numeric|min:1',
            'total_harga' => 'required|numeric|min:0',
            'total_netto' => 'required|numeric|min:0',
            'total_discount' => 'nullable|numeric|min:0',
            'total_pertemuan' => 'required|integer|min:1',
            'total_materi' => 'required|integer|min:1',
            'paket' => 'required|array|min:1',
            'paket.*.kd_paket' => 'required|string|exists:paket_kursuses,kd_paket',
            'paket.*.nama_paket' => 'required|string',
            'paket.*.harga' => 'required|numeric|min:50000',
            'paket.*.diskont' => 'required|numeric|min:0',
            'paket.*.kd_instruktur' => 'required',
            'paket.*.nama_instruktur' => 'required|string',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        DB::beginTransaction();

        try {
            $siswa = Siswa::where('kd_siswa', $request->kd_siswa)->firstOrFail();


            $jumlahPesanan = PesananKursus::where('siswa_id', $siswa->id)->count() + 1;
            $kd_transaksi = 'TR-' . now()->format('my') . '-' . $siswa->id . str_pad($jumlahPesanan, 4, '0', STR_PAD_LEFT);

            $status_lunas = $request->bayar >= $request->total_netto ? 'lunas' : 'belum_lunas';
            $sisa_bayar = max(0, $request->total_netto - $request->bayar);

            $pesanan = PesananKursus::create([
                'kd_transaksi' => $kd_transaksi,
                'siswa_id' => $siswa->id,
                'petugas_id' => auth()->id() ?? 1, // Gunakan petugas dari login, fallback ke 1

                'total_pertemuan' => $request->total_pertemuan,
                'total_materi' => $request->total_materi,
                'total_discount' => $request->total_discount ?? 0,
                'total_harga' => $request->total_harga,
                'total_netto' => $request->total_netto,
                'jumlah_bayar' => $request->bayar >= $request->total_netto ? $request->total_netto : $request->bayar,
                'sisa_bayar' => $sisa_bayar,
                'status_pembayaran' => $status_lunas,
                'tanggal_pesan' => now(),
                'tanggal_pembayaran_terakhir' => now(),
            ]);

            foreach ($request->paket as $item) {
                $instruktur = Instruktur::where('kd_instruktur', $item['kd_instruktur'])->firstOrFail();
                $paket = PaketKursus::where('kd_paket', $item['kd_paket'])->firstOrFail();
                DetailPesananKursus::create([
                    'pesanan_kursus_id' => $pesanan->id,
                    'paket_kursus_id' => $paket->id,
                    'instruktur_id' => $instruktur->id,
                    'diskont' => $item['diskont'],
                    'harga' => $item['harga'],
                ]);
            }
            $order_id = 'PA-' . now()->format('my') . '-' . $siswa->id . $pesanan->id . "1";
            $pembayaran = Payment::create([
                'pesanan_kursus_id' => $pesanan->id,
                'siswa_id' => $siswa->id,
                'petugas_id' => auth()->id() ?? 1, // ganti jadi user id
                'order_id' => $order_id,
                'gross_amount' => $request->bayar >= $pesanan->total_netto ? $pesanan->total_netto : $request->bayar,
                'payment_info' => json_encode(['tunai']),
                'payment_type' => 'tunai',
                'status' => 'settlement',
                'succeeded_at' => now(),
                'remaining_amount' => $sisa_bayar,
                'installments' => 1,
                'installment_number' => 1,
            ]);
            $kas = Kas::create([
                'tanggal' => now(),
                'jenis_transaksi' => 'pemasukan',
                'sumber' => 'pembayaran kursus',
                'keterangan' => 'pendaftaran kursus ' . $pesanan->kd_transaksi,
                'debit' => $request->bayar,      // uang masuk
                'kredit' => 0,                   // tidak ada uang keluar
                'saldo' => $this->getSaldoTerbaru() + $request->bayar,
                'petugas_id' => auth()->id() ?? 1,
                'model_id' => $pembayaran->id,
                'model_type' => Payment::class,
            ]);

            DB::commit();

            return response()->json(['pesanan' => $pesanan, 'paket' => $paket, 'pembayaran' => $pembayaran]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }

    public function invoice(Request $request, $kd_transaksi)
    {
        $pendaftaran = PesananKursus::where('kd_transaksi', $kd_transaksi)->first();
        $detail = DetailPesananKursus::with('paket')->where('pesanan_kursus_id', $pendaftaran->id)->get();
        // dd($detail);
        $payment = Payment::where('pesanan_kursus_id', $pendaftaran->id)->latest()->first();
        $siswa = Siswa::find($pendaftaran->siswa_id);

        return inertia('Global/PendaftaranKursuss/Invoice', compact('pendaftaran', 'payment', 'detail', 'siswa'));
    }

    public function edit(Request $request, $kd_transaksi)
    {
        $kategori = KategoriKursus::latest()->get();
        $pendaftaran = PesananKursus::where('kd_transaksi', $kd_transaksi)->first();
        $detail = DetailPesananKursus::with('paket', 'instruktur')->where('pesanan_kursus_id', $pendaftaran->id)->get();
        // dd($detail);
        $payment = Payment::where('pesanan_kursus_id', $pendaftaran->id)->latest()->get();
        $siswa = Siswa::find($pendaftaran->siswa_id);

        return inertia('Global/PendaftaranKursuss/Update', compact('pendaftaran', 'payment', 'detail', 'siswa', 'kategori', 'kd_transaksi'));
    }

    public function update(Request $request)
    {
        // dd($request->all());
        $siswa = Siswa::where('kd_siswa', $request->kd_siswa)->first();
        $pesanan = PesananKursus::where('kd_transaksi', $request->no_transaksi)->first();
        $payment = Payment::where('pesanan_kursus_id', $pesanan->id)->orderBy('created_at')->get();

        $total_pertemuan = 0;
        $total_materi = 0;
        $total_harga = 0;
        $total_diskont = 0;
        $total_netto = 0;
        foreach ($request->paket as $index => $item) {
            $total_pertemuan = $total_pertemuan + $item['jumlah_pertemuan'];
            $total_materi = $total_materi + $item['jumlah_materi'];
            $total_harga = $total_harga + $item['harga'];
            $total_diskont = $total_diskont + $item['diskont'];
            $total_harga_item = $item['harga'] - ($item['harga'] * ($item['diskont'] / 100));
            $total_netto = $total_netto + $total_harga_item;


            $paket = PaketKursus::where('kd_paket', $item['kd_paket'])->first();
            $instruktur = Instruktur::where('kd_instruktur', $item['kd_instruktur'])->first();
            if ($item['id'] == null) {
                $detail = DetailPesananKursus::create([
                    'pesanan_kursus_id' => $pesanan->id,
                    'paket_kursus_id' => $paket->id,
                    'instruktur_id' => $instruktur->id,
                    'diskont' => $item['diskont'],
                    'harga' => $item['harga'],
                ]);
            } else {
                $detail = DetailPesananKursus::where('id', $item['id'])->first();
                $detail->update([
                    'pesanan_kursus_id' => $pesanan->id,
                    'paket_kursus_id' => $paket->id,
                    'instruktur_id' => $instruktur->id,
                    'diskont' => $item['diskont'],
                    'harga' => $item['harga'],
                ]);
            }
        }

        $remaining = $total_netto;

        foreach ($payment as $payments) {
            $gross = $payments->gross_amount;

            $remaining = max($remaining - $gross, 0); // supaya tidak minus
            $payments->update([
                'remaining_amount' => $remaining,
            ]);
        }

        $sisa_bayar = $total_netto - $pesanan->jumlah_bayar;
        $status_lunas = $sisa_bayar > 0 ? 'belum_lunas' : 'lunas';

        $pesanan->update([
            'siswa_id' => $siswa->id,
            'petugas_id' => 1, // update jadi user
            'total_pertemuan' => $total_pertemuan,
            'total_materi' => $total_materi,
            'total_discount' => $total_diskont,
            'total_harga' => $total_harga,
            'total_netto' => $total_netto,
            'sisa_bayar' => $sisa_bayar,
            'status_pembayaran' => $status_lunas,
        ]);
    }

    public function delete_detail(Request $request)
    {
        $detail = DetailPesananKursus::with('paket')->find($request->id);
        $pesanan = PesananKursus::find($detail->pesanan_kursus_id);
        $total_materi = $pesanan->total_materi - $detail->paket->total_materi;
        $total_pertemuan = $pesanan->total_pertemuan - $detail->paket->total_pertemuan;
        $total_discount = $pesanan->total_discount - $detail->diskont;
        $total_harga = $pesanan->total_harga - $detail->harga;
        $netto = $detail->harga - ($detail->harga * $detail->diskont / 100);
        $total_netto = $pesanan->total_netto - $netto;
        $sum_total_bayar = Payment::where('pesanan_kursus_id', $pesanan->id)->orderBy('created_at')->sum('gross_amount');
        $payment = Payment::where('pesanan_kursus_id', $pesanan->id)->orderBy('created_at')->get();
        $statusLunas = $total_netto - $sum_total_bayar > 0 ? "belum_lunas" : "lunas";
        $updated = [
            "total_pertemuan" => $total_pertemuan,
            "total_materi" => $total_materi,
            "total_discount" => $total_discount,
            "total_harga" => $total_harga,
            "total_netto" => $total_netto,
            "sisa_bayar" => $total_netto - $sum_total_bayar,
            'status_pembayaran' => $statusLunas,
            'petugas_id' => '1'
        ];
        $remaining = $total_netto;

        foreach ($payment as $payments) {
            $gross = $payments->gross_amount;

            $remaining = max($remaining - $gross, 0); // supaya tidak minus
            $payments->update([
                'remaining_amount' => $remaining,
            ]);
        }

        $pesanan->update($updated);
        $detail->delete();
    }
    private function getSaldoTerbaru()
    {
        $lastKas = \App\Models\Kas::orderBy('id', 'desc')->first();
        return $lastKas ? $lastKas->saldo : 0;
    }
}
