<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Guest/Register/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|numeric|unique:users,phone',
            'password' => 'required|string|min:6',
        ]);

        $otp = rand(100000, 999999);



        // Simpan OTP dan expired-nya (contoh: 5 menit)
        $user = User::create([
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => $request->password,
            'otp' => $otp,
            'is_verified' => false,
            'expires_at' => Carbon::now()->addMinutes(65),
        ]);
        $user->assignRole('siswa');

        // Kirim OTP ke WhatsApp
        $this->sendMessage($user->phone, $otp);
        Auth::login($user);
    }

    public function verifikasi(Request $request)
    {

        $expires_at = $request->user()->expires_at;
        return inertia('Guest/Register/Verifikasi', compact('expires_at'));
    }

    public function store_verif(Request $request)
    {
        $user = $request->user();
        $user->update([
            'is_verified' => true
        ]);
        return redirect()->route('dashboard');
    }

    public function resend_otp(Request $request)
    {
        $otp = rand(100000, 999999);

        $user = $request->user();
        $user->update([
            'expires_at' => Carbon::now()->addMinutes(65),
            'otp' => $otp
        ]);
        $this->sendMessage($user->phone, $otp);
    }

    public function sendMessage($phone, $otp)
    {
        $message = "Halo! 👋\n\nKode OTP Anda adalah: *$otp*\n\nKode ini hanya berlaku selama *5 menit*.\nJangan berikan kode ini ke siapa pun.\n\nTerima kasih.";

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => [
                'target' => $phone,
                'message' => $message,
            ],
            CURLOPT_HTTPHEADER => [
                'Authorization: oAMf+vjnQeV9gmqAGRb8',
            ],
        ));
        $response = curl_exec($curl);
        curl_close($curl);
    }
}
