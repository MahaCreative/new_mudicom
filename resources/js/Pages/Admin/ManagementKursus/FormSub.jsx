import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm } from "@inertiajs/react";
import { MenuItem } from "@mui/material";
import React, { useEffect } from "react";

export default function FormSub({ model, kategori, onClose, kantor_cabang }) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        kategori_kursus_id: "",
        nama_sub_kategori: "",
        thumbnail: "",
        deskripsi: "",
        kantor_cabang_id: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-sub-kategori-kursus"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan data sub kategori"
                );
                onClose();
                reset();
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan data kategori, silahkan periksa kembali isian anda"
                );
                onClose();
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-sub-kategori-kursus"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui data sub kategori"
                );
                onClose();
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal memperbaharui data kategori, silahkan periksa kembali isian anda"
                );
                onClose();
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,

            id: model ? model.id : "",
            kategori_kursus_id: model ? model.kategori_kursus_id : "",
            nama_sub_kategori: model ? model.nama_sub_kategori : "",
            thumbnail: model ? model.thumbnail : "",
            deskripsi: model ? model.deskripsi : "",
            kantor_cabang_id: model ? model.kantor_cabang_id : "",
        });
    }, [model]);
    console.log(model);

    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="w-full py-6"
        >
            <div className="flex gap-x-3">
                <div className="w-full">
                    <SelectOption
                        value={data.kategori_kursus_id}
                        label="Kategori Kursus"
                        name="kategori_kursus_id"
                        errors={errors.kategori_kursus_id}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""}>Pilih Kategori</MenuItem>
                        {kategori.map((item, key) => (
                            <MenuItem value={item.id} key={key}>
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
            </div>
            <div className="p-2">
                <InputText
                    name={"nama_sub_kategori"}
                    value={data.nama_sub_kategori}
                    errors={errors.nama_sub_kategori}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    multiline={false}
                    label="Nama Sub Kategori"
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
                    {model ? "Update" : "Submit"}
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
