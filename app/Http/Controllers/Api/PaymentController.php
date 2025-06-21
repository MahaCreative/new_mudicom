<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\PesananKursus;
use Illuminate\Http\Request;

class PaymentController extends Controller
{

    public function after_payment(Request $request)
    {
        $payment = Payment::where('order_id', $request->order_id)->first();

        $signature_key = hash('sha512',  $request->order_id . $request->status_code . $payment->gross_amount . '.00' . config('services.midtrans.server_key'));

        if ($request->signature_key == $signature_key) {

            $payment->update([
                'succeeded_at' => $request->settlement_time,
                'status' => $request->transaction_status,
            ]);
            $pesanan = PesananKursus::where('id', $payment->pesanan_kursus_id)->update([
                'status_pembayaran' => 'lunas',
                'tanggal_pembayaran_terakhir' => now(),
            ]);
        }
    }
    public function sendMessage($phone, $kd_transaksi, $created_at, $total_pembayaran)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => "$phone",
                'message' => "
1 pembayaran berhasil dilakukan silahkan melakukan konfirmasi pembayaran pengunjung             

            
                ",

            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: oAMf+vjnQeV9gmqAGRb8'
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);

        if (isset($error_msg)) {
            echo $error_msg;
        }
    }
}
