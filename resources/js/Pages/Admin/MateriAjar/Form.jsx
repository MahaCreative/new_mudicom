import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm } from "@inertiajs/react";
import { MenuItem } from "@mui/material";
import React, { useEffect } from "react";

export default function Form({ model, setOpen, sub, kantor_cabang }) {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        sub_kategrori_id: "",
        nama_materi: "",
        thumbnail: "",
        deskripsi: "",
        modul: "",
        silabus: "",
        kantor_cabang_id: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-management-materi-ajar"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan data kedalam database"
                );
                reset();
                setOpen(false);
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan data kedalam database"
                );
                setOpen(false);
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-management-materi-ajar"), {
            onSuccess: () => {
                setOpen(false);
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui data kedalam database"
                );
            },
            onError: (err) => {
                setOpen(fales);
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal memperbaharui data kedalam database"
                );
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,

            id: model ? model.id : "",
            sub_kategrori_id: model ? model.sub_kategrori_id : "",
            nama_materi: model ? model.nama_materi : "",
            deskripsi: model ? model.deskripsi : "",
            kantor_cabang_id: model ? model.kantor_cabang_id : "",
        });
    }, [model]);
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="w-full pt-9 pb-3 px-4"
        >
            <div>
                <SelectOption
                    label={"Kategori Materi"}
                    value={data.sub_kategrori_id}
                    name="sub_kategrori_id"
                    errors={errors.sub_kategrori_id}
                    onChange={(e) =>
                        setData({ ...data, sub_kategrori_id: e.target.value })
                    }
                >
                    <MenuItem value="">Pilih Kategori Pelajaran</MenuItem>
                    {sub.map((item, key) => (
                        <MenuItem value={item.id} key={key}>
                            {item.nama_sub_kategori}
                        </MenuItem>
                    ))}
                </SelectOption>
                <div className="w-full my-2">
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
                    <InputText
                        name={"nama_materi"}
                        value={data.nama_materi}
                        errors={errors.nama_materi}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        multiline={false}
                        label="Nama Materi Pelajaran"
                    />
                </div>
                <div className="p-2">
                    <InputText
                        name={"deskripsi"}
                        value={data.deskripsi}
                        errors={errors.deskripsi}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        multiline={true}
                        label="Deskripsi"
                    />
                </div>
                <div className="flex flex-row gap-x-3">
                    <div className="p-2">
                        <p className="text-blue-500 font-medium">
                            Thumnail <span className="font-bold">(*Image)</span>
                        </p>
                        <input
                            type="file"
                            name={"thumbnail"}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.files[0],
                                })
                            }
                        />
                        {model && (
                            <p className="text-sm font-medium tracking-tight">
                                *Biarkan kosong jika tidak ingin mengganti
                                thumbnail
                            </p>
                        )}
                        {errors.thumbnail && (
                            <p className="text-xs italic text-red-500 tracking-tighter">
                                {errors.thumbnail}
                            </p>
                        )}
                    </div>
                    <div className="p-2">
                        <p className="text-blue-500 font-medium">
                            Modul <span className="font-bold">(*PDF)</span>
                        </p>
                        <input
                            type="file"
                            name={"modul"}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.files[0],
                                })
                            }
                        />
                        {model && (
                            <p className="text-sm font-medium tracking-tight">
                                *Biarkan kosong jika tidak ingin mengganti Modul
                            </p>
                        )}
                        {errors.modul && (
                            <p className="text-xs italic text-red-500 tracking-tighter">
                                {errors.modul}
                            </p>
                        )}
                    </div>
                    <div className="p-2">
                        <p className="text-blue-500 font-medium">
                            Silabus <span className="font-bold">(*PDF)</span>
                        </p>
                        <input
                            type="file"
                            name={"silabus"}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.files[0],
                                })
                            }
                        />
                        {model && (
                            <p className="text-sm font-medium tracking-tight">
                                *Biarkan kosong jika tidak ingin mengganti
                                silabus
                            </p>
                        )}
                        {errors.silabus && (
                            <p className="text-xs italic text-red-500 tracking-tighter">
                                {errors.silabus}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-x-3 justify-end items-center my-2">
                <button className="bg-blue-500 hover:bg-blue-700 usetransisi py-2 px-3 text-sm text-white font-medium rounded-md">
                    Submit
                </button>
                <button
                    onClick={setOpen}
                    type="button"
                    className="bg-red-500 hover:bg-red-700 usetransisi py-2 px-3 text-sm text-white font-medium rounded-md"
                >
                    Cancell
                </button>
            </div>
        </form>
    );
}
