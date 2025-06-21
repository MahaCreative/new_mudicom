<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $myProfile = Siswa::where('user_id', $request->user()->id)->first();

        return inertia('Guest/Profile/Index', compact('myProfile'));
    }

    public function store(Request $request)
    {

        $profile = Siswa::where('user_id', $request->user()->id)->first();

        // $request->validate([
        //     "nik_ktp" => 'nullable|numeric|digits:16|unique:siswas,nik_ktp',
        //     "nama_lengkap" => 'required|string|min:3|max:255',
        //     "tempat_lahir" => 'nullable|string|min:3|max:255',
        //     "tanggal_lahir" => 'required|date',
        //     "jenis_kelamin" => 'required|in:laki-laki,perempuan',
        //     "agama" => 'required',
        //     "alamat" => 'required',
        //     "kelurahan" => 'nullable|string|min:3',
        //     "kecamatan" => 'nullable|string|min:3',
        //     "kabupaten" => 'nullable|string|min:3',
        //     "telp" => 'required|numeric|digits_between:10,15|unique:siswas,telp',
        //     "pendidikan" => 'nullable',
        //     'pekerjaan' => 'nullable|string|min:3|max:50',
        //     'nama_ayah' => 'nullable|string|min:3|max:50',
        //     'nama_ibu' => 'nullable|string|min:3|max:50',
        //     "foto" => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        //     "kantor_cabang_id" => 'required',
        //     "status" => 'required|in:aktif,keluar',
        //     "email" => 'required|string|email'
        // ]);
        $user = $request->user();
        $dataProfile = [
            'user_id' => $request->user()->id,
            'nik_ktp' => $request->nik_ktp,
            'nama_lengkap' => $request->nama_lengkap,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'telp' => $request->telp,
            'pendidikan' => $request->pendidikan,
            'agama' => $request->agama,
            'alamat' => $request->alamat,
            'kelurahan' => $request->kelurahan,
            'kecamatan' => $request->kecamatan,
            'kabupaten' => $request->kabupaten,
            'kantor_cabang_id' => $request->kantor_cabang_id,

            'status' => 'aktif',
            'pekerjaan' => $request->pekerjaan,
            'nama_ayah' => $request->nama_ayah,
            'nama_ibu' => $request->nama_ibu,
            'created_by'  => $request->user()->name
        ];
        if ($profile) {
            $foto = $request->file('foto') ? $request->file('foto')->store('profile') : $profile->foto;
            $dataProfile['foto'] = $foto;
            $profile->update($dataProfile);
        } else {
            $kd_siswa = 'SI-' . str_pad(Siswa::count() + 1, 5, '0', STR_PAD_LEFT);;
            $foto = $request->file('foto') ? $request->file('foto')->store('profile') : 'image/default_profile.png';
            $dataProfile['kd_siswa'] = $kd_siswa;
            $dataProfile['foto'] = $foto;
            $profile = Siswa::create($dataProfile);
        }
        if ($request->password) {
            $request->validate(['password' => 'string|min:6|max:255']);
            $dataUser['password'] = bcrypt($request->password);
            $dataUser = [
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'phone' => $profile->telp,
                'avatar' => $foto,
            ];
            $user->update($dataUser);
        }
    }
}
