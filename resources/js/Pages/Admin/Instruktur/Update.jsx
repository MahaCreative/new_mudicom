import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import { Icon, MenuItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function Update(props) {
    const kantor_cabang = props.kantor_cabang;
    const kategori = props.kategori;
    const instruktur = props.instruktur;
    const imageRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        kategori_kursus_id: "",
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
        email: "",
        deskripsi: "",
        pendidikan: "",
        foto: "",
        kantor_cabang_id: "",
        status: "",
        password: "",
        password_confirmation: "",
        sosial_media: [
            {
                id: null,
                kategori: "",
                name: "",
                link: "",
            },
        ],
    });
    const imageClick = () => {
        imageRef.current.click();
    };
    const changeImage = (e) => {
        let foto = e.target.files[0];
        setData((prev) => ({ ...prev, foto: foto }));
        setPreview(URL.createObjectURL(foto));
    };
    const addSosmed = () => {
        const updatedSosmed = [...data.sosial_media];
        const empty = {
            id: null,
            kategori: "",
            name: "",
            link: "",
        };
        setData((prev) => ({
            ...prev,
            sosial_media: [empty, ...updatedSosmed],
        }));
    };
    const removeSosmed = (index) => {
        const updatedSosmed = [...data.sosial_media];
        updatedSosmed.splice(1, index);
        setData((prev) => ({ ...prev, sosial_media: updatedSosmed }));
    };

    const changeSosialMedia = (index, field, value) => {
        const updatedSosmed = [...data.sosial_media];
        updatedSosmed[index][field] = value;
        setData((prev) => ({ ...prev, sosial_media: updatedSosmed }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-management-instruktur"), {
            preserveState: true,
        });
    };

    useEffect(() => {
        let sosmed = [];
        if (instruktur.sosmed.length > 0) {
            instruktur.sosmed.map((item) => {
                sosmed.push({
                    id: item.id,
                    kategori: item.kategori,
                    name: item.name,
                    link: item.link,
                });
            });
        } else {
            sosmed = [
                {
                    id: null,
                    kategori: "",
                    name: "",
                    link: "",
                },
            ];
        }
        setData((prev) => ({
            ...prev,
            kd_instruktur: instruktur.kd_instruktur,
            kategori_kursus_id: instruktur.kategori_kursus_id,
            nik_ktp: instruktur.nik_ktp,
            nama_lengkap: instruktur.nama_lengkap,
            tempat_lahir: instruktur.tempat_lahir,
            tanggal_lahir: instruktur.tanggal_lahir,
            tanggal_masuk: instruktur.tanggal_masuk,
            tanggal_keluar: instruktur.tanggal_keluar,
            jenis_kelamin: instruktur.jenis_kelamin,
            agama: instruktur.agama,
            alamat: instruktur.alamat,
            kelurahan: instruktur.kelurahan,
            kecamatan: instruktur.kecamatan,
            kabupaten: instruktur.kabupaten,
            telp: instruktur.telp,
            deskripsi: instruktur.deskripsi,
            email: instruktur.user ? instruktur.user.email : "",
            pendidikan: instruktur.pendidikan,
            foto: "",
            kantor_cabang_id: instruktur.kantor_cabang_id,
            status: instruktur.status,
            sosial_media: sosmed,
            password: "",
            password_confirmation: "",
        }));
        setPreview("/storage/" + instruktur.foto);
    }, []);
    console.log(data);

    return (
        <form onSubmit={submitHandler} className="py-6 px-8">
            <div className="flex gap-x-4 items-center">
                <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden">
                    <div className="py-2 px-3 bg-blue-800 text-white">
                        <h1>Profile Instruktur</h1>
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
                                Profile Instruktur
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
                            <div className="w-full">
                                <InputText
                                    label="Deskripsi"
                                    name="deskripsi"
                                    multiline={true}
                                    value={data.deskripsi}
                                    errors={errors.deskripsi}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                />
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
                                        label="Mengajari"
                                        name="kategori_kursus_id"
                                        value={data.kategori_kursus_id}
                                        errors={errors.kategori_kursus_id}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Kategori Ajar
                                        </MenuItem>
                                        {kategori.map((item, key) => (
                                            <MenuItem
                                                key={key}
                                                value={item.id}
                                                className="capitalize"
                                            >
                                                {item.nama_kategori}
                                            </MenuItem>
                                        ))}
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
                        <h1>Create Akun Instruktur</h1>
                    </div>
                    <div className="py-2 px-3">
                        {data.email !== "" ? (
                            <p className="bg-gray-100 p-2 rounded-md tracking-tighter">
                                Silahkan ubah email dan password untuk
                                memperbaharui akun instruktur
                            </p>
                        ) : (
                            <p className="bg-gray-100 p-2 rounded-md tracking-tighter">
                                Silahkan mengisikan Email dan password jika
                                ingin membuatkan akun untuk instruktur yang akan
                                dibuat
                            </p>
                        )}
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
                            {data.email !== "" && (
                                <p>
                                    *Kosongkan Password jika tidak ingin
                                    mengubah password
                                </p>
                            )}
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
                <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                    <div className="py-2 px-3 bg-blue-800 text-white">
                        <h1>Sosial Media Instruktur </h1>
                    </div>
                    <div className="py-2 px-3">
                        {data.sosial_media.map((item, key) => (
                            <div
                                key={key}
                                className="flex items-center gap-x-2 my-2"
                            >
                                <div className="w-full">
                                    <InputText
                                        value={data.sosial_media[key].name}
                                        errors={
                                            errors[`sosial_media.${key}.name`]
                                        }
                                        label="Nama Sosial Media"
                                        onChange={(e) =>
                                            changeSosialMedia(
                                                key,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <InputText
                                        value={data.sosial_media[key].link}
                                        errors={
                                            errors[`sosial_media.${key}.link`]
                                        }
                                        label="Link Sosial Media"
                                        onChange={(e) =>
                                            changeSosialMedia(
                                                key,
                                                "link",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="w-full">
                                    <SelectOption
                                        value={data.sosial_media[key].kategori}
                                        errors={
                                            errors[
                                                `sosial_media.${key}.kategori`
                                            ]
                                        }
                                        onChange={(e) =>
                                            changeSosialMedia(
                                                key,
                                                "kategori",
                                                e.target.value
                                            )
                                        }
                                        label="Kategori Sosial Media"
                                    >
                                        <MenuItem value="">
                                            Pilih Sosial Media
                                        </MenuItem>
                                        <MenuItem
                                            value="facebook"
                                            className="capitalize"
                                        >
                                            facebook
                                        </MenuItem>
                                        <MenuItem
                                            value="instagram"
                                            className="capitalize"
                                        >
                                            instagram
                                        </MenuItem>
                                        <MenuItem
                                            value="telegram"
                                            className="capitalize"
                                        >
                                            telegram
                                        </MenuItem>
                                        <MenuItem
                                            value="youtube"
                                            className="capitalize"
                                        >
                                            youtube
                                        </MenuItem>
                                        <MenuItem
                                            value="github"
                                            className="capitalize"
                                        >
                                            github
                                        </MenuItem>
                                        <MenuItem
                                            value="tiktok"
                                            className="capitalize"
                                        >
                                            tiktok
                                        </MenuItem>
                                        <MenuItem
                                            value="x"
                                            className="capitalize"
                                        >
                                            x
                                        </MenuItem>
                                    </SelectOption>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <button
                                        type="button"
                                        onClick={() => addSosmed()}
                                        className="p-2 text-base text-white bg-green-500 leading-3 rounded-full"
                                    >
                                        <Add
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => removeSosmed(key)}
                                        className="p-2 text-base text-white bg-red-500 leading-3 rounded-full"
                                    >
                                        <Delete
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
}

Update.layout = (page) => <AuthLayout children={page} />;
