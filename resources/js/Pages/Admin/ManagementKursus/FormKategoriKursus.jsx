import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm } from "@inertiajs/react";
import { MenuItem } from "@mui/material";
import React, { useEffect } from "react";

export default function FormKategoriKursus({ model, onClose, kantor_cabang }) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        nama_kategori: "",
        deskripsi: "",
        thumbnail: "",
        kantor_cabang_id: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.post-management-kursus"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan kategori"
                );
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan kategori, silahkan periksa kembali isian anda"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-management-kursus"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui kategori"
                );
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal memperbaharui kategori, silahkan periksa kembali isian anda"
                );
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,

            id: model ? model.id : "",
            nama_kategori: model ? model.nama_kategori : "",
            deskripsi: model ? model.deskripsi : "",
            kantor_cabang_id: model ? model.kantor_cabang_id : "",
            thumbnail: model ? model.thumbnail : "",
        });
    }, [model]);
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="w-full"
        >
            <div className="p-2">
                <InputText
                    name={"nama_kategori"}
                    value={data.nama_kategori}
                    errors={errors.nama_kategori}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    multiline={false}
                    label="Nama Kategori"
                />
            </div>
            <div className="p-2">
                <InputText
                    name={"deskripsi"}
                    value={data.deskripsi}
                    errors={errors.deskripsi}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    multiline={true}
                    label="Deskripsi"
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
                    <MenuItem value="">Pilih Kantor Mengajar</MenuItem>
                    {kantor_cabang.map((item, key) => (
                        <MenuItem
                            key={key}
                            value={item.id}
                            className="capitalize"
                        >
                            {item.nama + " | " + item.status}
                        </MenuItem>
                    ))}
                </SelectOption>
            </div>
            <div className="p-2">
                <input
                    type="file"
                    name={"thumbnail"}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.files[0] })
                    }
                />
                {model && (
                    <p className="text-sm font-medium tracking-tight">
                        *Biarkan kosong jika tidak ingin mengganti thumbnail
                    </p>
                )}
                {errors.thumbnail && (
                    <p className="text-xs italic text-red-500 tracking-tighter">
                        {errors.thumbnail}
                    </p>
                )}
            </div>

            <div className="flex gap-x-3 justify-end items-center">
                <button className="bg-blue-500 hover:bg-blue-700 usetransisi py-2 px-3 text-sm text-white font-medium rounded-md">
                    Submit
                </button>
                <button
                    onClick={onClose}
                    type="button"
                    className="bg-red-500 hover:bg-red-700 usetransisi py-2 px-3 text-sm text-white font-medium rounded-md"
                >
                    Cancell
                </button>
            </div>
        </form>
    );
}
