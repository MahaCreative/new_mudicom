<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CekProfilSiswa
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Misalnya siswa punya relasi 'siswaProfile' di model User
        // Cek jika user login dan punya role 'siswa'
        if ($user && $user->hasRole('siswa')) {
            // Misalnya relasi profil siswa = $user->siswaProfile
            if (!$user->siswa) {
                return redirect()->route('siswa.profile-saya');
            }
        }



        return $next($request);
    }
}
