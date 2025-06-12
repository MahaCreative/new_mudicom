import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";

import { Icon, MenuItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function Create(props) {
    const kantor_cabang = props.kantor_cabang;
    const petugas = props.petugas;

    const imageRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        user_id: "",
        kd_petugas: "",
        nik_ktp: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        tanggal_masuk: "",
        tanggal_keluar: "",
        jenis_kelamin: "",
        agama: "",
        alamat: "",
        kelurahan: "",
        kecamatan: "",
        kabupaten: "",
        telp: "",
        pendidikan: "",
        foto: "",
        kantor_cabang_id: "",
        status: "",
        jabatan: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const imageClick = () => {
        imageRef.current.click();
    };
    const changeImage = (e) => {
        let foto = e.target.files[0];
        setData((prev) => ({ ...prev, foto: foto }));
        setPreview(URL.createObjectURL(foto));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-management-petugas"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil mengupdate petugas baru kedalam database"
                );
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal mengupdate petugas, silahkan periksa isian anda kembali"
                );
            },
        });
    };

    useEffect(() => {
        setData({
            ...data,
            user_id: petugas.user_id,
            kd_petugas: petugas.kd_petugas,
            nik_ktp: petugas.nik_ktp,
            nama_lengkap: petugas.nama_lengkap,
            tempat_lahir: petugas.tempat_lahir,
            tanggal_lahir: petugas.tanggal_lahir,
            tanggal_masuk: petugas.tanggal_masuk,
            tanggal_keluar: petugas.tanggal_keluar,
            jenis_kelamin: petugas.jenis_kelamin,
            agama: petugas.agama,
            alamat: petugas.alamat,
            kelurahan: petugas.kelurahan,
            kecamatan: petugas.kecamatan,
            kabupaten: petugas.kabupaten,
            telp: petugas.telp,
            pendidikan: petugas.pendidikan,
            foto: "",
            kantor_cabang_id: petugas.kantor_cabang_id,
            status: petugas.status,
            jabatan: petugas.jabatan,
            email: petugas.user ? petugas.user.email : "",
            password: "",
            password_confirmation: "",
        });
        setPreview("/storage/" + petugas.foto);
    }, []);

    return (
        <form onSubmit={submitHandler} className="py-6 px-8">
            <div className="flex gap-x-4 items-center">
                <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden">
                    <div className="py-2 px-3 bg-blue-800 text-white">
                        <h1>Profile Petugas</h1>
                    </div>
                    <div className="flex flex-row gap-x-3">
                        <div className=" px-4  w-[400px] h-full ">
                            <div className=" h-full">
                                <div
                                    onClick={imageClick}
                                    className="hover:cursor-pointer hover:scale-105 usetransisi relative"
                                >
                                    <img
                                        src={
                                            preview
                                                ? preview
                                                : "/storage/image/default_profile.png"
                                        }
                                        alt=""
                                        className=" w-full h-full object-cover object-center "
                                    />
                                    <p className="bg-blue-500 text-center absolute inline-block p-2 rounded-md text-white top-2 right-2">
                                        Klik Untuk Ganti Gambar
                                    </p>
                                    {errors.foto && (
                                        <p className="bg-red-500 text-center absolute inline-block p-2 rounded-md text-xs text-white top-14 right-2">
                                            {errors.foto}
                                        </p>
                                    )}
                                    <input
                                        ref={imageRef}
                                        type="file"
                                        hidden
                                        onChange={changeImage}
                                    />
                                </div>
                                <div className="w-full px-3 py-2">
                                    <div className="flex items-center gap-x-3">
                                        <button
                                            type="submit"
                                            className="text-white w-full bg-blue-950 hover:bg-blue-500 usetransisi py-2 px-3 rounded-md font-bold"
                                        >
                                            Simpan
                                        </button>
                                        <button
                                            type="button"
                                            className="text-white w-full bg-red-500 hover:bg-red-700 usetransisi py-2 px-3 rounded-md font-bold"
                                        >
                                            Batalkan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-3  px-4">
                            <h1 className="font-bold text-blue-900">
                                Profile Petugas
                            </h1>
                            <div className="flex flex-row gap-x-3 w-full my-2">
                                <div className="w-full">
                                    <InputText
                                        label="Nik KTP"
                                        name="nik_ktp"
                                        value={data.nik_ktp}
                                        errors={errors.nik_ktp}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <InputText
                                        label="Nama Lengkap"
                                        name="nama_lengkap"
                                        value={data.nama_lengkap}
                                        errors={errors.nama_lengkap}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-x-3 w-full my-2">
                                <div className="w-full">
                                    <InputText
                                        label="Tempat Lahir"
                                        name="tempat_lahir"
                                        value={data.tempat_lahir}
                                        errors={errors.tempat_lahir}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <InputText
                                        label="Tanggal Lahir"
                                        type="date"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        errors={errors.tanggal_lahir}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="w-full">
                                    <InputText
                                        label="Telp / HP"
                                        name="telp"
                                        value={data.telp}
                                        errors={errors.telp}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row gap-x-3 w-full my-2">
                                <div className="w-full">
                                    <SelectOption
                                        label="Jenis Kelamin"
                                        name="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        errors={errors.jenis_kelamin}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="laki-laki">
                                            Laki-Laki
                                        </MenuItem>
                                        <MenuItem value="perempuan">
                                            Perempuan
                                        </MenuItem>
                                    </SelectOption>
                                </div>
                                <div className="w-full">
                                    <SelectOption
                                        label="Pendidikan"
                                        name="pendidikan"
                                        value={data.pendidikan}
                                        errors={errors.pendidikan}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Pendidikan Terkahir
                                        </MenuItem>
                                        <MenuItem value="sd">SD</MenuItem>
                                        <MenuItem value="smp">SMP</MenuItem>
                                        <MenuItem value="sma/smk">
                                            SMA/SMK
                                        </MenuItem>
                                        <MenuItem value="d1">D1</MenuItem>
                                        <MenuItem value="d2">D2</MenuItem>
                                        <MenuItem value="d3">D3</MenuItem>
                                        <MenuItem value="s1">S1</MenuItem>
                                        <MenuItem value="s2">S2</MenuItem>
                                        <MenuItem value="s3">S3</MenuItem>
                                        <MenuItem value="lainnya">
                                            Lainnya
                                        </MenuItem>
                                    </SelectOption>
                                </div>
                                <div className="w-full">
                                    <SelectOption
                                        label="Agama"
                                        name="agama"
                                        value={data.agama}
                                        errors={errors.agama}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Agama Terkahir
                                        </MenuItem>
                                        <MenuItem value="islam">Islam</MenuItem>
                                        <MenuItem value="kristen">
                                            Kristen
                                        </MenuItem>
                                        <MenuItem value="katolik">
                                            Katolik
                                        </MenuItem>
                                        <MenuItem value="hindu">Hindu</MenuItem>
                                        <MenuItem value="budha">Budha</MenuItem>
                                        <MenuItem value="konghucu">
                                            Konghucu
                                        </MenuItem>
                                        <MenuItem value="lainnya">
                                            Lainnya
                                        </MenuItem>
                                    </SelectOption>
                                </div>
                            </div>
                            <h1 className="font-bold text-blue-900">
                                Informasi Alamat
                            </h1>
                            <div className="flex flex-row gap-x-3 w-full my-2">
                                <div className="w-full">
                                    <InputText
                                        label="Alamat"
                                        name="alamat"
                                        value={data.alamat}
                                        errors={errors.alamat}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <InputText
                                        label="Kecamatan"
                                        name="kecamatan"
                                        value={data.kecamatan}
                                        errors={errors.kecamatan}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <InputText
                                        label="Kelurahan"
                                        name="kelurahan"
                                        value={data.kelurahan}
                                        errors={errors.kelurahan}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <InputText
                                        label="Kabupaten / Kota"
                                        name="kabupaten"
                                        value={data.kabupaten}
                                        errors={errors.kabupaten}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <h1 className="font-bold text-blue-900">
                                Informasi Kerja
                            </h1>
                            <div className="flex flex-row gap-x-3 w-full my-2">
                                <div className="w-full">
                                    <SelectOption
                                        label="jabtan"
                                        name="jabatan"
                                        value={data.jabatan}
                                        errors={errors.jabatan}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Jabatan
                                        </MenuItem>
                                        <MenuItem value="Super Admin">
                                            Super Admin
                                        </MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="Keuangan">
                                            Keuangan
                                        </MenuItem>
                                    </SelectOption>
                                </div>
                                <div className="w-full">
                                    <SelectOption
                                        label="Kantor"
                                        name="kantor_cabang_id"
                                        value={data.kantor_cabang_id}
                                        errors={errors.kantor_cabang_id}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Kantor Mengajar
                                        </MenuItem>
                                        {kantor_cabang.map((item, key) => (
                                            <MenuItem
                                                key={key}
                                                value={item.id}
                                                className="capitalize"
                                            >
                                                {item.nama +
                                                    " | " +
                                                    item.status}
                                            </MenuItem>
                                        ))}
                                    </SelectOption>
                                </div>
                                <div className="w-full">
                                    <SelectOption
                                        label="Status Kerja"
                                        name="status"
                                        value={data.status}
                                        errors={errors.status}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Status Kerja
                                        </MenuItem>
                                        <MenuItem value="aktif">Aktif</MenuItem>
                                        <MenuItem value="nonaktif">
                                            Nonaktif
                                        </MenuItem>
                                    </SelectOption>
                                </div>
                                <div className="w-full">
                                    <InputText
                                        type="date"
                                        label="Tanggal Masuk"
                                        name="tanggal_masuk"
                                        value={data.tanggal_masuk}
                                        errors={errors.tanggal_masuk}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <InputText
                                        disabled={
                                            data.status !== "nonaktif"
                                                ? true
                                                : false
                                        }
                                        type="date"
                                        label="Tanggal Keluar"
                                        name="tanggal_keluar"
                                        value={data.tanggal_keluar}
                                        errors={errors.tanggal_keluar}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-x-4 items-start">
                <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                    <div className="py-2 px-3 bg-blue-800 text-white">
                        <h1>Create Akun Petugas</h1>
                    </div>
                    <div className="py-2 px-3">
                        <p className="bg-gray-100 p-2 rounded-md tracking-tighter">
                            Silahkan mengisikan password jika ingin membuatkan
                            akun untuk Petugas yang akan dibuat
                        </p>
                        <div className="w-full py-3">
                            <InputText
                                type="email"
                                label="Email"
                                name="email"
                                value={data.email}
                                errors={errors.email}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="w-full py-3">
                            <InputText
                                type="password"
                                label="Password"
                                name="password"
                                value={data.password}
                                errors={errors.password}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="w-full py-3">
                            <InputText
                                type="password"
                                label="Konfirmasi Password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                errors={errors.password_confirmation}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

Create.layout = (page) => <AuthLayout children={page} />;
