<?php

namespace App\Http\Controllers;

use App\Models\KantorCabang;
use App\Models\Petugas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class PetugasController extends Controller
{
    public function index(Request $request)
    {
        $query = Petugas::query()->join('kantor_cabangs', 'kantor_cabangs.id', 'petugas.kantor_cabang_id')
            ->select('kantor_cabangs.nama as nama_kantor', 'petugas.*');
        $petugas = $query->latest()->get();

        return inertia('Admin/Petugas/Index', compact('petugas',));
    }
    public function create(Request $request)
    {
        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };
        $roles = Role::latest()->get();

        return inertia('Admin/Petugas/Create', compact('kantor_cabang', 'roles'));
    }
    public function store(Request $request)
    {
        $request->validate([

            "nik_ktp" => 'nullable|numeric|digits:16|unique:instrukturs,nik_ktp',
            "nama_lengkap" => 'required|string|min:3|max:255',
            "tempat_lahir" => 'required|string|min:3|max:255',
            "tanggal_lahir" => 'required|date',
            "tanggal_masuk" => 'required|date',
            "tanggal_keluar" => 'nullable|date|after_or_equal:tanggal_masuk',
            "jenis_kelamin" => 'required|in:laki-laki,perempuan',
            "agama" => 'required',
            "alamat" => 'required',
            "kelurahan" => 'nullable|string|min:3',
            "kecamatan" => 'nullable|string|min:3',
            "kabupaten" => 'nullable|string|min:3',
            "telp" => 'required|numeric|digits_between:10,15|unique:instrukturs,telp',
            "pendidikan" => 'required',
            "foto" => 'required|image|mimes:jpeg,png,jpg|max:2048',
            "kantor_cabang_id" => 'required',
            "status" => 'required|in:aktif,keluar',
            "jabatan" => 'required',

        ]);
        if ($request->filled('email')) {
            $request->validate([
                "email" => 'required|email|unique:users,email',
                "password" => 'required|string|confirmed|min:8|max:50',
            ]);
        }
        DB::beginTransaction();
        try {
            $userId = null;
            if ($request->filled('email')) {
                $user = User::create([
                    'name' => $request->nama_lengkap,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                    'phone' => $request->telp
                ]);
                $user->assignRole($request->jabatan);
                $userId = $user->id;
            }
            $foto = $request->file('foto')->store('profile/petugas');
            $kd_petugas = 'PE-' . str_pad(Petugas::count() + 1, 5, '0', STR_PAD_LEFT);;
            $petugas = Petugas::create([
                'user_id' => $userId,

                'kd_petugas' => $kd_petugas,
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
                'foto' => $foto,
                'tanggal_masuk' => $request->tanggal_masuk,
                'tanggal_keluar' => $request->tanggal_keluar,
                'kantor_cabang_id' => $request->kantor_cabang_id,
                'status' => $request->status,
                'jabatan' => $request->jabatan,
                'created_by' => $request->user()->name
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function edit(Request $request, $kd_petugas)
    {
        $kantor_cabang = KantorCabang::latest()->get();
        $roles = Role::latest()->get();
        $petugas = Petugas::with('user')->where('kd_petugas', $kd_petugas)->first();
        return inertia('Admin/Petugas/Update', compact('kantor_cabang', 'petugas', 'roles'));
    }

    public function update(Request $request)
    {
        $petugas = Petugas::where('kd_petugas', $request->kd_petugas)->first();
        $userId = $petugas->user_id;
        $request->validate([

            "nik_ktp" => 'nullable|numeric|digits:16|unique:petugas,nik_ktp,' . $petugas->id,
            "nama_lengkap" => 'required|string|min:3|max:255',
            "tempat_lahir" => 'required|string|min:3|max:255',
            "tanggal_lahir" => 'required|date',
            "tanggal_masuk" => 'required|date',
            "tanggal_keluar" => 'nullable|date|after_or_equal:tanggal_masuk',
            "jenis_kelamin" => 'required|in:laki-laki,perempuan',
            "agama" => 'required',
            "alamat" => 'required',
            "kelurahan" => 'nullable|string|min:3',
            "kecamatan" => 'nullable|string|min:3',
            "kabupaten" => 'nullable|string|min:3',
            "telp" => 'required|numeric|digits_between:10,15|unique:petugas,telp,' . $petugas->id,
            "pendidikan" => 'required',
            "foto" => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            "kantor_cabang_id" => 'required',
            "status" => 'required|in:aktif,keluar',
            "jabatan" => 'required',

        ]);
        $foto =  $petugas->foto;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto')->store('profile/petugas');
        }


        if ($petugas->user_id) {
            $user = User::find($petugas->user_id);

            if ($request->filled('email')) {
                $request->validate([
                    "email" => 'required|email|unique:users,email,' . $petugas->user_id,
                    "password" => 'nullable|string|confirmed|min:8|max:50',
                ]);
            }

            $user->update([
                'phone' => $request->telp,
                'email' => $request->email,
                'password' => $request->password ? bcrypt($request->password) : $user->password
            ]);

            // Update role di sini
            $user->syncRoles($request->jabatan);
        } else {
            if ($request->filled('email')) {
                $request->validate([
                    "email" => 'required|email|unique:users,email',
                    "password" => 'required|string|confirmed|min:8|max:50',
                ]);
            }

            $user = User::create([
                'phone' => $request->telp,
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            // Assign role baru
            $user->assignRole($request->jabatan);
            $userId = $user->id;
        }
        $petugas->update([
            'user_id' => $userId,
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
            'foto' => $foto,
            'tanggal_masuk' => $request->tanggal_masuk,
            'tanggal_keluar' => $request->tanggal_keluar,
            'kantor_cabang_id' => $request->kantor_cabang_id,
            'status' => $request->status,
            'jabatan' => $request->jabatan,
            'updated_by' => $request->user()->name
        ]);
    }

    public function delete(Request $request, $kd_petugas)
    {
        Petugas::where('kd_petugas', $kd_petugas)->first()->delete();
    }

    public function confirm(Request $request,)
    {

        $petugas = Petugas::where('kd_petugas', $request->kd_petugas)->first();
        $petugas->update(['status_konfirmasi' => $request->value, 'updated_by' => $request->user()->name]);
    }
}
