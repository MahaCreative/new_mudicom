import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { router, useForm, usePage } from "@inertiajs/react";
import { Check, Checklist, Clear, Delete } from "@mui/icons-material";
import { MenuItem, Table } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Form({ kategori, sub, jenis, model, open, onClose }) {
    const { materi } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_paket: "",
        kategori_kursus: "",
        sub_kategori_kursus: "",
        jenis_kursus: "",
        deskripsi: "",
        thumbnail: "",
        total_pertemuan: 0,
        total_materi: 0,
        harga: "",
        status: "",
        materi_input: "",
        pertemuan_input: "",
        materi: [],
        pertemuan: [],
    });
    const clearInput = () => {
        setData({ ...data, pertemuan_input: "", materi_input: "" });
    };
    const addMateri = () => {
        if (data.materi_input === "" && data.pertemuan_input === "") return;

        setData((prev) => ({
            ...prev,
            materi: [...prev.materi, data.materi_input],
            pertemuan: [...prev.pertemuan, data.pertemuan_input],
        }));
        setData((prev) => ({ ...prev, benefit: "" }));
    };
    const removeMateri = (id) => {
        setData((prev) => {
            const filterMateri = prev.materi.filter((b) => b.id !== id);
            // Reassign ID setelah penghapusan
            const updatedMateri = filterMateri.map((item, index) => item);

            const filterPertemuan = prev.pertemuan.filter((b) => b.id !== id);
            // Reassign ID setelah penghapusan
            const updatedPertemuan = filterPertemuan.map((item, index) => item);
            return {
                ...prev,
                materi: updatedMateri,
                pertemuan: updatedPertemuan,
            };
        });
    };

    const updateHandler = (e) => {
        e.preventDefault();

        post(route("admin.update-management-paket-kursus"), {
            onSuccess: () => {
                reset(
                    "nama_paket",
                    "kategori_kursus",
                    "sub_kategori_kursus",
                    "jenis_kursus",
                    "deskripsi",
                    "thumbnail",
                    "total_pertemuan",
                    "total_materi",
                    "harga",
                    "materi_input",
                    "pertemuan_input",
                    "materi",
                    "pertemuan",
                    "status"
                );
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (data.materi.length == 0 || model?.detail.length === 0) return;
        post(route("admin.store-management-paket-kursus"), {
            onError: (err) => {
                console.log(err.response.data);
            },
        });
    };
    const deleteMateri = (value) => {
        setData({
            ...data,
            total_pertemuan: data.total_pertemuan - value.jmlh_pertemuan,
        });
        router.delete(
            route("admin.delete-detail-management-paket-kursus", { ...value })
        );
    };

    useEffect(() => {
        if (data.materi.length > 0) {
            let pertemuan = model ? model.total_pertemuan : 0;
            data.pertemuan.forEach((item) => {
                pertemuan = pertemuan + parseInt(item);
            });
            setData({
                ...data,
                total_pertemuan: pertemuan,
                total_materi: data.materi.length,
            });
        }
    }, [data.materi]);
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_paket: model ? model.nama_paket : "",
            kategori_kursus: model ? model.kategori_kursus : "",
            sub_kategori_kursus: model ? model.sub_kategori_kursus : "",
            jenis_kursus: model ? model.jenis_kursus : "",
            status: model ? model.status : "",
            deskripsi: model ? model.deskripsi : "",

            total_pertemuan: model ? model.total_pertemuan : 0,
            total_materi: model ? model.total_materi : 0,
            harga: model ? model.harga : "",
        });
    }, [model]);

    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="min-w-[800px] pt-6 pb-3 px-4"
        >
            <div className="">
                <div className="w-full">
                    <div className="flex gap-x-3 items-center w-full ">
                        <div className="w-full">
                            <SelectOption
                                label={"Kategori"}
                                name="kategori_kursus"
                                value={data.kategori_kursus}
                                errors={errors.kategori_kursus}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem className="capitalize" value="">
                                    Pilih Kategori
                                </MenuItem>
                                {kategori.map((item, key) => (
                                    <MenuItem
                                        className="capitalize"
                                        value={item.nama_kategori}
                                    >
                                        {item.nama_kategori}
                                    </MenuItem>
                                ))}
                            </SelectOption>
                        </div>
                        {data.kategori_kursus && (
                            <div className="w-full">
                                <SelectOption
                                    label={"Sub Kategori"}
                                    name="sub_kategori_kursus"
                                    value={data.sub_kategori_kursus}
                                    errors={errors.sub_kategori_kursus}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem className="capitalize" value="">
                                        Pilih Sub Kategori
                                    </MenuItem>
                                    {sub.map(
                                        (item, key) =>
                                            data.kategori_kursus ==
                                                item.kategori.nama_kategori && (
                                                <MenuItem
                                                    className="capitalize"
                                                    value={
                                                        item.nama_sub_kategori
                                                    }
                                                >
                                                    {item.nama_sub_kategori}
                                                </MenuItem>
                                            )
                                    )}
                                </SelectOption>
                            </div>
                        )}
                        <div className="w-full">
                            <SelectOption
                                label={"Jenis Paket"}
                                name="jenis_kursus"
                                value={data.jenis_kursus}
                                errors={errors.jenis_kursus}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem className="capitalize" value="">
                                    Pilih Jenis Kursus
                                </MenuItem>
                                {jenis.map((item, key) => (
                                    <MenuItem
                                        className="capitalize"
                                        value={item.jenis_kursus}
                                    >
                                        {item.jenis_kursus}
                                    </MenuItem>
                                ))}
                            </SelectOption>
                        </div>
                    </div>
                    <div className="flex gap-x-3 items-center w-full py-3">
                        <div className="w-full">
                            <InputText
                                label={"Nama Paket"}
                                name="nama_paket"
                                value={data.nama_paket}
                                errors={errors.nama_paket}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <InputText
                                label={"Harga Paket"}
                                name="harga"
                                // value={formatRupiah(data.harga)}
                                value={data.harga}
                                errors={errors.harga}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-3 items-center w-full py-3">
                        <div className="w-full">
                            <InputText
                                disabled
                                label={"Total Materi"}
                                name="total_materi"
                                value={data.total_materi}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <InputText
                                disabled
                                label={"Total Pertemuan"}
                                name="total_pertemuan"
                                value={data.total_pertemuan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <InputText
                            label={"Deskripsi Paket"}
                            name="deskripsi"
                            value={data.deskripsi}
                            errors={errors.deskripsi}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <div className="pt-4 w-full">
                            <SelectOption
                                label={"Status Paket"}
                                name="status"
                                value={data.status}
                                errors={errors.status}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem className="capitalize" value="">
                                    Pilih Status Paket
                                </MenuItem>
                                <MenuItem className="capitalize" value="aktif">
                                    aktif
                                </MenuItem>
                                <MenuItem
                                    className="capitalize"
                                    value="nonaktif"
                                >
                                    nonaktif
                                </MenuItem>
                            </SelectOption>
                        </div>
                        <div className="pt-4 w-full">
                            <p className="text-sm text-blue-500">
                                Thumbnail {"(Image)"}
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
                    </div>
                </div>
                <p className="py-3 font-medium text-blue-600">
                    Pilih Materi Untuk Paket yang akan dibuat
                </p>
                <div className="w-full ">
                    <Tables>
                        <thead>
                            <tr>
                                <Tables.Th className={"text-xs text-center"}>
                                    #
                                </Tables.Th>
                                <Tables.Th className={"text-xs text-center"}>
                                    Nama Materi
                                </Tables.Th>
                                <Tables.Th className={"text-xs text-center"}>
                                    Jumlah Pertemuan
                                </Tables.Th>
                                <Tables.Th className={"text-xs text-center"}>
                                    Aksi
                                </Tables.Th>
                            </tr>
                        </thead>
                        <Tables.Tbody>
                            <tr>
                                <Tables.Td>0</Tables.Td>
                                <Tables.Td>
                                    <SelectOption
                                        label={"Pilih Materi"}
                                        name="materi_input"
                                        value={data.materi_input}
                                        errors={errors.materi_input}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    >
                                        <MenuItem
                                            className="capitalize"
                                            value=""
                                        >
                                            Pilih Ajar
                                        </MenuItem>

                                        {materi.map(
                                            (item, key) =>
                                                data.sub_kategori_kursus ==
                                                    item.kategori
                                                        .nama_sub_kategori && (
                                                    <MenuItem
                                                        className="capitalize"
                                                        value={item.nama_materi}
                                                    >
                                                        {item.nama_materi}
                                                    </MenuItem>
                                                )
                                        )}
                                    </SelectOption>
                                </Tables.Td>
                                <Tables.Td>
                                    <InputText
                                        type="number"
                                        label={"Jumlah Pertemuan"}
                                        name="pertemuan_input"
                                        value={data.pertemuan_input}
                                        errors={errors.pertemuan_input}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                </Tables.Td>
                                <Tables.Td
                                    className={"flex gap-x-1 items-center"}
                                >
                                    <button
                                        onClick={addMateri}
                                        type="button"
                                        className="bg-green-500 text-white p-1 rounded-md"
                                    >
                                        <Check
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </button>
                                    <button
                                        onClick={clearInput}
                                        type="button"
                                        className="bg-red-500 text-white p-1 rounded-md"
                                    >
                                        <Clear
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </button>
                                </Tables.Td>
                            </tr>
                        </Tables.Tbody>
                        {data.materi.length > 0 &&
                            data.materi.map((item, index) => (
                                <tr>
                                    <Tables.Td>{index + 1}</Tables.Td>
                                    <Tables.Td>
                                        <InputText
                                            disabled
                                            label={"Nama Materi"}
                                            value={data.materi[index]}
                                            errors={errors["materi." + index]}
                                        />
                                    </Tables.Td>
                                    <Tables.Td>
                                        <InputText
                                            disabled
                                            label={"Jumlah Pertemuan"}
                                            value={
                                                data.pertemuan[index] +
                                                " Pertemuan"
                                            }
                                            errors={
                                                errors["pertemuan." + index]
                                            }
                                        />
                                    </Tables.Td>
                                    <Tables.Td
                                        className={"flex gap-x-1 items-center"}
                                    >
                                        <button
                                            onClick={() => removeMateri()}
                                            type="button"
                                            className="bg-red-500 text-white p-1 rounded-md"
                                        >
                                            <Clear
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        </button>
                                    </Tables.Td>
                                </tr>
                            ))}
                        {model && (
                            <>
                                <tr>
                                    <Tables.Td
                                        colSpan={4}
                                        className={"text-center bg-gray-200"}
                                    >
                                        Daftar Materi Yang Sudah Di Tambahkan
                                    </Tables.Td>
                                </tr>
                                {model?.detail.map((item, key) => (
                                    <tr key={key}>
                                        <Tables.Td>{key + 1}</Tables.Td>
                                        <Tables.Td>
                                            <InputText
                                                disabled
                                                label={"Nama Materi"}
                                                value={item.nama_materi}
                                            />
                                        </Tables.Td>
                                        <Tables.Td>
                                            <InputText
                                                disabled
                                                label={"Jumlah Pertemuan"}
                                                value={item.jmlh_pertemuan}
                                            />
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "flex gap-x-1 items-center"
                                            }
                                        >
                                            {model?.detail.length > 1 && (
                                                <button
                                                    onClick={() =>
                                                        deleteMateri(item)
                                                    }
                                                    type="button"
                                                    className="bg-red-500 text-white p-1 rounded-md"
                                                >
                                                    <Delete
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </button>
                                            )}
                                        </Tables.Td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </Tables>
                </div>
            </div>
            <div className="flex gap-x-3 justify-end items-center py-4">
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
