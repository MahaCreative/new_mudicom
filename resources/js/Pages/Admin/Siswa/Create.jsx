import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import ResponseAlert from "@/Hook/ResponseAlert";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import { Icon, MenuItem } from "@mui/material";
import React, { useRef, useState } from "react";

export default function Create(props) {
    const { showResponse } = ResponseAlert();
    const kantor_cabang = props.kantor_cabang;
    const kategori = props.kategori;
    const imageRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const { data, setData, post, reset, errors } = useForm({
        user_id: "",
        kd_siswa: "",
        nik_ktp: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        agama: "",
        alamat: "",
        kelurahan: "",
        kecamatan: "",
        kabupaten: "",
        telp: "",
        pendidikan: "",
        pekerjaan: "",
        nama_ayah: "",
        nama_ibu: "",
        foto: "",
        kantor_cabang_id: "",
        status: "",
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
        post(route("admin.store-management-siswa"), {
            onSuccess: () => {
                reset();
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil mendaftarkan 1 siswa baru"
                );
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal mendaftarkan siswa baru, periksa kembali isian anda Error Code: " +
                        err
                );
            },
        });
    };

    return (
        <form onSubmit={submitHandler} className="py-6 px-8">
            <div className="flex gap-x-4 items-center">
                <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden">
                    <div className="py-2 px-3 bg-blue-800 text-white">
                        <h1>Profile Siswa</h1>
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
                                Profile siswa
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
                                        label="Pekerjaan"
                                        name="pekerjaan"
                                        value={data.pekerjaan}
                                        errors={errors.pekerjaan}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Pekerjaan
                                        </MenuItem>
                                        <MenuItem value="petani">
                                            Petani
                                        </MenuItem>
                                        <MenuItem value="nelayan">
                                            Nelayan
                                        </MenuItem>
                                        <MenuItem value="pedagang">
                                            Pedagang
                                        </MenuItem>
                                        <MenuItem value="pns">PNS</MenuItem>
                                        <MenuItem value="tni">TNI</MenuItem>
                                        <MenuItem value="polri">Polri</MenuItem>
                                        <MenuItem value="buruh">Buruh</MenuItem>
                                        <MenuItem value="karyawan_swasta">
                                            Karyawan Swasta
                                        </MenuItem>
                                        <MenuItem value="wiraswasta">
                                            Wiraswasta
                                        </MenuItem>
                                        <MenuItem value="guru">Guru</MenuItem>
                                        <MenuItem value="dosen">Dosen</MenuItem>
                                        <MenuItem value="dokter">
                                            Dokter
                                        </MenuItem>
                                        <MenuItem value="perawat">
                                            Perawat
                                        </MenuItem>
                                        <MenuItem value="pengacara">
                                            Pengacara
                                        </MenuItem>
                                        <MenuItem value="notaris">
                                            Notaris
                                        </MenuItem>
                                        <MenuItem value="pegawai_bumn">
                                            Pegawai BUMN
                                        </MenuItem>

                                        <MenuItem value="tidak_bekerja">
                                            Tidak Bekerja
                                        </MenuItem>
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
                            </div>
                            <div className="w-full">
                                <SelectOption
                                    label="Status Siswa"
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
                                        Pilih Status Siswa
                                    </MenuItem>
                                    <MenuItem value="aktif">Aktif</MenuItem>
                                    <MenuItem value="nonaktif">
                                        Nonaktif
                                    </MenuItem>
                                </SelectOption>
                            </div>
                            <h1 className="font-bold text-blue-900">
                                Informasi Orang Tua
                            </h1>
                            <div className="flex flex-row gap-x-3 w-full my-2">
                                <div className="w-full">
                                    <InputText
                                        label="Nama Ayah"
                                        name="nama_ayah"
                                        value={data.nama_ayah}
                                        errors={errors.nama_ayah}
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
                                        label="Nama Ibu"
                                        name="nama_ibu"
                                        value={data.nama_ibu}
                                        errors={errors.nama_ibu}
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
                        <h1>Create Akun siswa</h1>
                    </div>
                    <div className="py-2 px-3">
                        <p className="bg-gray-100 p-2 rounded-md tracking-tighter">
                            Silahkan mengisikan password jika ingin membuatkan
                            akun untuk siswa yang akan dibuat
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
