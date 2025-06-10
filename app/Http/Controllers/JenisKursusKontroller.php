<?php

namespace App\Http\Controllers;

use App\Models\BenefitJenisKursus;
use App\Models\JenisKursus;
use Illuminate\Http\Request;

class JenisKursusKontroller extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'jenis_kursus' => 'required|string|min:3|max:25|unique:jenis_kursuses,jenis_kursus',
            'deskripsi' => 'required|string|min:25|max:255',
            'thumbnail' => 'required|image|mimes:jpeg,jpeg,jpg,png,webp,gif',
            'benefits.*.benefit' => 'required|string|min:25|max:100',
            'kantor_cabang_id' => 'required',
        ]);
        $thumbnail = $request->file('thumbnail')->store('jenis_kursus');
        $jenis = JenisKursus::create([
            'kantor_cabang_id' => $request->kantor_cabang_id,
            'created_by' => $request->user()->name,
            'jenis_kursus' => $request->jenis_kursus,
            'deskripsi' => $request->deskripsi,
            'thumbnail' => $thumbnail,
        ]);
        foreach ($request->benefits as $item) {

            $benefit = BenefitJenisKursus::create([
                'jenis_kursus_id' => $jenis->id,
                'benefit' => $item['benefit'],
            ]);
        }
    }

    public function update(Request $request)
    {

        $jenis = JenisKursus::find($request->id);
        $request->validate([
            'jenis_kursus' => 'required|string|min:3|max:25|unique:jenis_kursuses,jenis_kursus,' . $jenis->id,
            'deskripsi' => 'required|string|min:25|max:255',
            'kantor_cabang_id' => 'required',
            'benefits.*.benefit' => 'required|string|min:25|max:100'
        ]);
        $thumbnail = $jenis->thumbnail;
        if ($request->file('thumbnail')) {
            $request->validate([
                'thumbnail' => 'required|image|mimes:jpeg,jpeg,jpg,png,webp,gif',
            ]);
            $thumbnail = $request->file('thumbnail')->store('jenis_kursus');
        }
        $jenis->update([
            'kantor_cabang_id' => $request->kantor_cabang_id,
            'jenis_kursus' => $request->jenis_kursus,
            'deskripsi' => $request->deskripsi,
            'thumbnail' => $thumbnail,
            'updated_by' => $request->user()->name,
        ]);
        foreach ($request->benefits as $item) {

            $benefit = BenefitJenisKursus::create([
                'jenis_kursus_id' => $jenis->id,
                'benefit' => $item['benefit'],
            ]);
        }
    }

    public function delete(Request $request)
    {
        JenisKursus::find($request->id)->delete();
    }

    public function delete_benefit(Request $request)
    {
        BenefitJenisKursus::find($request->id)->delete();
    }
}
