import InputText from "@/Components/InputText";
import Quils from "@/Components/Quils";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import ResponseAlert from "@/Hook/ResponseAlert";
import AuthLayout from "@/Layouts/AuthLayout";

import { router, useForm, usePage } from "@inertiajs/react";
import {
    Add,
    Check,
    Clear,
    Close,
    Delete,
    OpenInFull,
} from "@mui/icons-material";
import { debounce, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function FormUpdate({
    kategori,

    jenis,
    paket,
    reason,
    kantor_cabang,
}) {
    const { showResponse } = ResponseAlert();
    const [showReason, setShowReason] = useState(false);
    const [previewReason, setPreviewReason] = useState([""]);

    const [showTrouble, setShowTrouble] = useState(false);

    const [showSoulusi, setShowSolusi] = useState(false);
    const [previewSolusi, setPreviewSolusi] = useState(
        "/storage/" + paket?.solusi?.image_solusi
    );

    const [showCriteria, setShowCriteria] = useState(false);
    const [previewCriteria, setPreviewCriteria] = useState(
        "/storage/" + paket?.kriteria?.image_criteria
    );

    const [showFunfact, setShowFunfact] = useState(false);
    const [previewFunfact, setPreveiwFuncat] = useState(
        "/storage/" + paket?.funfact?.image_funfact
    );
    const [sub, setSub] = useState([]);
    const { materi } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        id: paket?.id || "",
        nama_paket: paket?.nama_paket || "",
        kategori_kursus: paket?.kategori_kursus || "",
        sub_kategori_kursus: paket?.sub_kategori_kursus || "",
        jenis_kursus: paket?.jenis_kursus || "",
        status: paket?.status || "",
        deskripsi: paket?.deskripsi || "",
        kantor_cabang_id: paket?.kantor_cabang_id || "",
        judul_alasan: paket?.judul_alasan || "",
        total_pertemuan: paket?.total_pertemuan || 0,
        total_materi: paket?.total_materi || 0,
        harga: paket?.harga || "",
        harga_promo: paket?.harga_promo || "",
        thumbnail: paket?.thumbnail || "",
        materi_input: "",
        pertemuan_input: "",
        materi: [], // kamu bisa isi dari paket?.detail jika perlu
        pertemuan: [],
        reason: paket?.reason?.map((item) => ({
            reason_id: item.id,
            icon: "/storage/" + item.icon,
            reason: item.reason,
        })) || [
            {
                reason_id: "",
                icon: "",
                reason: "",
            },
        ],
        trouble: paket?.trouble.map((item) => ({
            reason_id: item.id,
            deskripsi_trouble: item.deskripsi_trouble,
        })) || [
            {
                reason_id: "",
                deskripsi_trouble: "",
            },
        ],
        deskripsi_solusi: paket?.solusi?.deskripsi_solusi || "",
        image_solusi: paket?.solusi?.image_solusi || "",
        deskripsi_criteria: paket?.kriteria?.deskripsi_criteria || "",
        image_criteria: paket?.kriteria?.image_criteria || "",
        deskripsi_funfact: paket?.funfact?.deskripsi_funfact || "",
        image_funfact: paket?.funfact?.image_funfact || "",
    });

    const clearInput = () => {
        setData({ ...data, pertemuan_input: "", materi_input: "" });
    };
    const addMateri = () => {
        if (data.materi_input === "" && data.pertemuan_input === "") return;

        setData((prev) => ({
            ...prev,
            materi_input: "",
            pertemuan_input: "",
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
        if (data.materi.length == 0 || paket?.detail.length === 0) return;
        post(route("admin.update-management-paket-kursus"), {
            onStart: () => {
                setShowTrouble(false);
                setShowSolusi(false);
                setShowCriteria(false);
                setShowFunfact(false);
            },
            onSuccess: () => {
                // reset();
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui paket kursus"
                );
            },
            onError: (err) => {
                console.log(err);
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal memperbaharui paket kursus, sihkan periksa kembali isian anda"
                );
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (data.materi.length == 0 || paket?.detail.length === 0) return;

        post(route("admin.store-management-paket-kursus"), {
            onStart: () => {
                setShowReason(false);
                setShowTrouble(false);
                setShowSolusi(false);
                setShowCriteria(false);
                setShowFunfact(false);
            },
            onSuccess: () => {
                reset(
                    "nama_paket",
                    "kategori_kursus",
                    "sub_kategori_kursus",
                    "jenis_kursus",
                    "deskripsi",
                    "thumbnail",
                    "harga",
                    "harga_promo",
                    "status",
                    "judul_alasan",
                    "materi_input",
                    "pertemuan_input",
                    "kantor_cabang_id",
                    "materi",
                    "pertemuan",
                    "reason",
                    "reason_id",
                    "icon",
                    "reason",
                    "trouble",
                    "reason_id",
                    "deskripsi_trouble",
                    "image_solusi",
                    "deskripsi_solusi",
                    "image_criteria",
                    "deskripsi_criteria",
                    "image_funfact",
                    "deskripsi_funfact"
                );
                showResponse(
                    "success",
                    "Berhasil",
                    "Brehasil menambahkan 1 paket kursus baru kedalam database"
                );
            },
            onError: (err) => {
                console.log(err);

                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan paket, silahkan periksa kembali isian anda"
                );
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
    const getSub = async () => {
        try {
            let response = await axios.get(
                route("api.get-all-sub-kategori", {
                    kategori: data.kategori_kursus,
                })
            );

            if (response.data.length > 0) {
                setSub(response.data);
            } else {
                setSub([]);
            }
        } catch (err) {
            alert(
                "terjadi kesalahan saat fetching data Sub Kategori Error Code: " +
                    err
            );
            setSub([]);
        }
    };

    const changeIconReason = (e, key) => {
        let image = e.target.files[0];
        const preview = [...previewReason];
        preview[key] = URL.createObjectURL(image);
        setPreviewReason(preview);
        const dataChange = [...data.reason];
        dataChange[key]["icon"] = image;
        setData((prev) => ({ ...data, reason: dataChange }));
    };
    const changeReason = (e, key) => {
        const dataChange = [...data.reason];
        dataChange[key]["reason"] = e.target.value;
        setData((prev) => ({ ...data, reason: dataChange }));
    };
    const addReason = () => {
        let emptyReason = {
            reason_id: "",
            icon: "",
            reason: "",
        };
        let newData = [...data.reason];
        let preview = [...previewReason];

        setPreviewReason((prev) => ["", ...prev]);
        setData((prev) => ({ ...prev, reason: [emptyReason, ...prev.reason] }));
    };

    const removeReason = (id) => {
        URL.revokeObjectURL(previewReason[id]);
        setPreviewReason((prev) => prev.filter((_, i) => i !== id));
        setData((prev) => {
            const filtered = prev.reason.filter((_, index) => index !== id);
            const updated = filtered.map((b, index) => ({
                reason_id: b.reason_id,
                icon: b.icon,
                reason: b.reason,
            }));
            return { ...prev, reason: updated };
        });
    };
    const changeTrouble = (e, key) => {
        const dataTrouble = [...data.trouble];
        dataTrouble[key]["deskripsi_trouble"] = e.target.value;
        setData((prev) => ({ ...prev, trouble: dataTrouble }));
    };
    const addTrouble = () => {
        let emptytrouble = {
            id: "",
            deskripsi_trouble: "",
        };
        setData((prev) => ({
            ...prev,
            trouble: [emptytrouble, ...prev.trouble],
        }));
    };
    const removeTrouble = (id) => {
        setData((prev) => {
            const filtered = prev.trouble.filter((_, index) => index !== id);
            const updated = filtered.map((b, index) => ({
                reason: b.trouble,
            }));
            return { ...prev, trouble: updated };
        });
    };
    const hasTroubleError = Object.keys(errors).some((key) =>
        key.startsWith("trouble")
    );
    const hasReasonError = Object.keys(errors).some((key) =>
        key.startsWith("reason")
    );
    const changeImageSolusi = (e) => {
        let image = e.target.files[0];
        setPreviewSolusi(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, image_solusi: image }));
    };
    const changeImageCriteria = (e) => {
        let image = e.target.files[0];
        setPreviewCriteria(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, image_criteria: image }));
    };
    const changeImageFunfaact = (e) => {
        let image = e.target.files[0];
        setPreveiwFuncat(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, image_funfact: image }));
    };

    useEffect(() => {
        getSub();
    }, [data.kategori_kursus]);
    useEffect(() => {
        if (data.materi.length > 0) {
            let pertemuan = 0;
            data.pertemuan.forEach((item) => {
                pertemuan += parseInt(item);
            });

            if (
                data.total_pertemuan !== pertemuan ||
                data.total_materi !== data.materi.length
            ) {
                setData((prev) => ({
                    ...prev,
                    total_pertemuan: pertemuan,
                    total_materi: data.materi.length,
                }));
            }
        }
    }, [data.materi, data.pertemuan]);
    const [initialized, setInitialized] = useState(false);

    return (
        <form
            onSubmit={paket ? updateHandler : submitHandler}
            className=" pt-9 pb-3 px-8"
        >
            <div className="flex flex-col md:flex-row gap-x-3">
                <div className="">
                    <div className="w-full">
                        <div className="flex gap-x-3 items-center w-full ">
                            <div className="w-full">
                                <SelectOption
                                    required={paket ? false : true}
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
                                        required={paket ? false : true}
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
                                        <MenuItem
                                            className="capitalize"
                                            value=""
                                        >
                                            Pilih Sub Kategori
                                        </MenuItem>
                                        {sub.map((item, key) => (
                                            <MenuItem
                                                key={key}
                                                className="capitalize"
                                                value={item.nama_sub_kategori}
                                            >
                                                {item.nama_sub_kategori}
                                            </MenuItem>
                                        ))}
                                    </SelectOption>
                                </div>
                            )}
                            <div className="w-full">
                                <SelectOption
                                    required={paket ? false : true}
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
                        <div className="w-full my-3">
                            <SelectOption
                                required={paket ? false : true}
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
                                        {item.nama + " | " + item.status}
                                    </MenuItem>
                                ))}
                            </SelectOption>
                        </div>
                        <div className="flex gap-x-3 items-center w-full py-3">
                            <div className="w-full">
                                <InputText
                                    required={paket ? false : true}
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
                                    required={paket ? false : true}
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
                        <div className="w-full">
                            <InputText
                                required={paket ? false : true}
                                label={"Potongan"}
                                name="harga_promo"
                                // value={formatRupiah(data.harga_promo)}
                                value={data.harga_promo}
                                errors={errors.harga_promo}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex gap-x-3 items-center w-full py-3">
                            <div className="w-full">
                                <InputText
                                    required={paket ? false : true}
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
                                    required={paket ? false : true}
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
                                required={paket ? false : true}
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
                                    required={paket ? false : true}
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
                                    <MenuItem
                                        className="capitalize"
                                        value="aktif"
                                    >
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
                                {paket && (
                                    <p className="text-sm font-medium tracking-tight">
                                        *Biarkan kosong jika tidak ingin
                                        mengganti thumbnail
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
                                    <Tables.Th
                                        className={"text-xs text-center"}
                                    >
                                        #
                                    </Tables.Th>
                                    <Tables.Th
                                        className={"text-xs text-center"}
                                    >
                                        Nama Materi
                                    </Tables.Th>
                                    <Tables.Th
                                        className={"text-xs text-center"}
                                    >
                                        Jumlah Pertemuan
                                    </Tables.Th>
                                    <Tables.Th
                                        className={"text-xs text-center"}
                                    >
                                        Aksi
                                    </Tables.Th>
                                </tr>
                            </thead>
                            <Tables.Tbody>
                                <tr>
                                    <Tables.Td>0</Tables.Td>
                                    <Tables.Td>
                                        <SelectOption
                                            required={
                                                data.materi.length == 0
                                                    ? true
                                                    : false
                                            }
                                            label={"Pilih Materi"}
                                            name="materi_input"
                                            value={data.materi_input}
                                            errors={errors.materi_input}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    [e.target.name]:
                                                        e.target.value,
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
                                                            value={
                                                                item.nama_materi
                                                            }
                                                        >
                                                            {item.nama_materi}
                                                        </MenuItem>
                                                    )
                                            )}
                                        </SelectOption>
                                    </Tables.Td>
                                    <Tables.Td>
                                        <InputText
                                            required={
                                                data.materi.length == 0
                                                    ? true
                                                    : false
                                            }
                                            type="number"
                                            label={"Jumlah Pertemuan"}
                                            name="pertemuan_input"
                                            value={data.pertemuan_input}
                                            errors={errors.pertemuan_input}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    [e.target.name]:
                                                        e.target.value,
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
                                                errors={
                                                    errors["materi." + index]
                                                }
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
                                            className={
                                                "flex gap-x-1 items-center"
                                            }
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
                            {paket && (
                                <>
                                    <tr>
                                        <Tables.Td
                                            colSpan={4}
                                            className={
                                                "text-center bg-gray-200"
                                            }
                                        >
                                            Daftar Materi Yang Sudah Di
                                            Tambahkan
                                        </Tables.Td>
                                    </tr>
                                    {paket?.detail.map((item, key) => (
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
                                        </tr>
                                    ))}
                                </>
                            )}
                        </Tables>
                    </div>
                    <div className="flex gap-x-3 justify-end items-center py-4">
                        <button className="bg-blue-500 hover:bg-blue-700 usetransisi py-2 px-3 text-sm text-white font-medium rounded-md">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 usetransisi py-2 px-3 text-sm text-white font-medium rounded-md"
                        >
                            Cancell
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    {/* reason */}
                    <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                        <div
                            className={`${
                                hasReasonError ? "bg-red-500" : "bg-blue-800"
                            } py-2 px-3 text-white flex justify-between items-center`}
                        >
                            <div className="flex gap-x-3 items-center">
                                <h1>Alasan Memilih Paket</h1>
                            </div>
                            <button
                                onClick={() => setShowReason(!showReason)}
                                type="button"
                                className="leading-3"
                            >
                                {showReason ? (
                                    <OpenInFull size="small" />
                                ) : (
                                    <Close />
                                )}
                            </button>
                        </div>
                        <div
                            className={`${
                                showReason == false || hasReasonError
                                    ? ""
                                    : "hidden"
                            }`}
                        >
                            <div className="w-full px-4 pt-6 py-2">
                                <InputText
                                    required={paket ? false : true}
                                    label="Judul Alasan"
                                    type="text"
                                    value={data.judul_alasan}
                                    errors={errors.judul_alasan}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            judul_alasan: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            {data.reason.map((item, key) => (
                                <div
                                    key={key}
                                    className="flex flex-row gap-x-3 items-center py-2 px-4"
                                >
                                    <InputText
                                        required={paket ? false : true}
                                        label="Icon"
                                        type="file"
                                        onChange={(e) =>
                                            changeIconReason(e, key)
                                        }
                                        errors={errors[`reason.${key}.icon`]}
                                    />
                                    <InputText
                                        required={paket ? false : true}
                                        label="Deskripsi"
                                        value={item.reason}
                                        onChange={(e) => changeReason(e, key)}
                                        errors={errors[`reason.${key}.reason`]}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addReason()}
                                        className="leading-3 text-white py-3 px-4 rounded-md bg-primary"
                                    >
                                        {" "}
                                        <Add
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </button>
                                    {key > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeReason(key)}
                                            className="leading-3 text-white py-3 px-4 rounded-md bg-red-500"
                                        >
                                            {" "}
                                            <Delete
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <div>
                                <h1 className="bg-primary px-4 text-white">
                                    Preview Reason
                                </h1>
                                <div className=" px-4 md:px-8 lg:px-16 flex flex-col  justify-center items-center gap-3 py-2">
                                    <h1 className="font-bold text-2xl w-full text-center md:w-1/2 text-primary">
                                        {data.judul_alasan}
                                    </h1>
                                    <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {data.reason.map((item, key) => (
                                            <div
                                                key={key}
                                                className="bg-primary py-4 px-6 text-white"
                                            >
                                                <img
                                                    className="w-[54px]"
                                                    src={previewReason[key]}
                                                    alt={item.reason}
                                                />
                                                <p className="font-light text-sm">
                                                    {item.reason}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end reason */}
                    {/* trouble */}
                    <div className="w-full">
                        <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                            <div
                                className={`py-2 px-3 ${
                                    hasTroubleError
                                        ? "bg-red-500"
                                        : "bg-blue-800"
                                } text-white flex justify-between items-center`}
                            >
                                <div className="flex gap-x-3 items-center">
                                    <h1>Trouble View</h1>
                                </div>
                                <button
                                    onClick={() => setShowTrouble(!showTrouble)}
                                    type="button"
                                    className="leading-3"
                                >
                                    {showTrouble ? (
                                        <Close />
                                    ) : (
                                        <OpenInFull size="small" />
                                    )}
                                </button>
                            </div>
                            <div className={`${showTrouble ? "" : "hidden"}`}>
                                {data.trouble.map((item, key) => (
                                    <div
                                        key={key}
                                        className="flex flex-row gap-x-3 items-center py-2 px-4"
                                    >
                                        <div className="w-full">
                                            <InputText
                                                required={paket ? false : true}
                                                label="Deskripsi"
                                                value={item.deskripsi_trouble}
                                                onChange={(e) =>
                                                    changeTrouble(e, key)
                                                }
                                                errors={
                                                    errors[
                                                        `trouble.${key}.deskripsi_trouble`
                                                    ]
                                                }
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => addTrouble()}
                                            className="leading-3 text-white py-3 px-4 rounded-md bg-primary"
                                        >
                                            <Add
                                                color="inherit"
                                                fontSize="inherit"
                                            />
                                        </button>
                                        {key > 0 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTrouble(key)
                                                }
                                                className="leading-3 text-white py-3 px-4 rounded-md bg-red-500"
                                            >
                                                <Delete
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <div>
                                    <h1 className="bg-primary px-4 text-white">
                                        Preview Trouble
                                    </h1>
                                    <div className=" px-4 md:px-8 lg:px-16 flex flex-col  justify-center items-center gap-3 py-24">
                                        <h1 className="font-bold text-2xl w-full text-center md:w-1/2 text-primary">
                                            Online Course Excel ini cocok untuk
                                            Anda yang memiliki salah satu
                                            masalah ini
                                        </h1>
                                        <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-20">
                                            {data.trouble.map((item, key) => (
                                                <div className="bg-primary py-4 px-6 text-white relative w-full min-w-full">
                                                    <div
                                                        key={key}
                                                        className="absolute rounded-md -top-12 left-0 w-full flex justify-center items-center"
                                                    >
                                                        <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                                            <img
                                                                src={
                                                                    "/storage/image/Group-1802.jpg"
                                                                }
                                                                alt={`trouble_${key}`}
                                                                className="w-[100px]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className="font-light text-sm mt-12">
                                                        {item.deskripsi_trouble}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end trouble */}
                    {/* solusi */}
                    <div className="w-full">
                        <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                            <div
                                className={`py-2 px-3 ${
                                    errors.deskripsi_solusi ||
                                    errors.image_solusi
                                        ? "bg-red-500"
                                        : "bg-blue-800"
                                } text-white flex justify-between items-center`}
                            >
                                <div className="flex gap-x-3 items-center">
                                    <h1>Solusi View</h1>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowSolusi(!showSoulusi)}
                                    className="leading-3"
                                >
                                    {showSoulusi ? (
                                        <OpenInFull size="small" />
                                    ) : (
                                        <Close />
                                    )}
                                </button>
                            </div>
                            <div
                                className={`${
                                    showSoulusi == true ||
                                    errors.deskripsi_solusi
                                        ? ""
                                        : "hidden"
                                }`}
                            >
                                <div className="px-4 py-6">
                                    <div className="w-full my-2">
                                        <InputText
                                            required={paket ? false : true}
                                            label="image"
                                            type="file"
                                            onChange={(e) =>
                                                changeImageSolusi(e)
                                            }
                                            errors={errors.image_solusi}
                                        />
                                    </div>
                                    {errors.deskripsi_solusi && (
                                        <p className="text-red-500 italic text-sm">
                                            {" "}
                                            {errors.deskripsi_solusi}
                                        </p>
                                    )}
                                    <Quils
                                        value={data.deskripsi_solusi}
                                        onChange={(value) =>
                                            setData({
                                                ...data,
                                                deskripsi_solusi: value,
                                            })
                                        }
                                    />
                                </div>
                                <div className=" px-4 md:px-8 lg:px-16 flex flex-col md:flex-row  justify-center items-center gap-9 py-6">
                                    <div className="my-4  gap-4 w-full md:w-1/2">
                                        <div className="flex justify-center items-center">
                                            <img
                                                src={
                                                    previewSolusi
                                                        ? previewSolusi
                                                        : "/storage/image/default_thumnbnail.jpg"
                                                }
                                                alt=""
                                                className=" w-[400px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <h1 className="font-medium text-xl w-full md:w-1/2 text-primary">
                                            Solusi Terbaik Buat Kamu
                                        </h1>
                                        <p className=" my-6 font-bold text-4xl">
                                            Saatnya Kamu Temukan Solusi Susahnya
                                            Belajar {data.nama_paket}
                                        </p>
                                        <p
                                            className="font-light  my-6"
                                            dangerouslySetInnerHTML={{
                                                __html: data.deskripsi_solusi,
                                            }}
                                        />

                                        <button
                                            type="button"
                                            className="text-primary font-bold text-xl leading-3 border py-5 px-3 border-primary rounded-md hover:bg-primary hover:text-white hover:border-white"
                                        >
                                            Selengkapnya
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end solusi */}
                    {/* kriteria */}
                    <div className="w-full">
                        <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                            <div
                                className={`py-2 px-3 ${
                                    showCriteria == true ||
                                    errors.deskripsi_criteria ||
                                    errors.image_criteria
                                        ? "bg-red-500"
                                        : "bg-blue-800"
                                } text-white flex justify-between items-center`}
                            >
                                <div className="flex gap-x-3 items-center">
                                    <h1>Kriteria View</h1>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCriteria(!showCriteria)
                                    }
                                    className="leading-3"
                                >
                                    {showCriteria ? (
                                        <OpenInFull size="small" />
                                    ) : (
                                        <Close />
                                    )}
                                </button>
                            </div>
                            <div
                                className={`${
                                    showCriteria == true ||
                                    errors.deskripsi_criteria ||
                                    errors.image_criteria
                                        ? ""
                                        : "hidden"
                                }`}
                            >
                                <div className="px-4 py-6">
                                    <div className="w-full my-2">
                                        <InputText
                                            required={paket ? false : true}
                                            label="image"
                                            type="file"
                                            onChange={(e) =>
                                                changeImageCriteria(e)
                                            }
                                            errors={errors.image_criteria}
                                        />
                                    </div>
                                    {errors.deskripsi_criteria && (
                                        <p className="text-red-500 italic text-sm">
                                            {" "}
                                            {errors.deskripsi_criteria}
                                        </p>
                                    )}
                                    <Quils
                                        value={data.deskripsi_criteria}
                                        onChange={(value) =>
                                            setData({
                                                ...data,
                                                deskripsi_criteria: value,
                                            })
                                        }
                                    />
                                </div>
                                <div className=" px-4 md:px-8 lg:px-16 flex flex-col md:flex-row  justify-center items-center gap-9 py-6">
                                    <div className="my-4  gap-4 w-full md:w-1/2">
                                        <div className="flex justify-center items-center">
                                            <img
                                                src={
                                                    previewCriteria
                                                        ? previewCriteria
                                                        : "/storage/image/default_thumnbnail.jpg"
                                                }
                                                alt=""
                                                className=" w-[400px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <h1 className="font-medium text-xl w-full md:w-1/2 text-primary">
                                            {data.nama_paket} Kriteria
                                        </h1>

                                        <p
                                            className=" my-6"
                                            dangerouslySetInnerHTML={{
                                                __html: data.deskripsi_criteria,
                                            }}
                                        />

                                        <button
                                            type="button"
                                            className="text-primary font-bold text-xl leading-3 border py-5 px-3 border-primary rounded-md hover:bg-primary hover:text-white hover:border-white"
                                        >
                                            Selengkapnya
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fundfact */}
                    <div className="w-full">
                        <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                            <div
                                className={`py-2 px-3 ${
                                    errors.deskripsi_funfact ||
                                    errors.image_funfact
                                        ? "bg-red-500"
                                        : "bg-blue-800"
                                } text-white flex justify-between items-center`}
                            >
                                <div className="flex gap-x-3 items-center">
                                    <h1>Fun Fact View</h1>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowFunfact(!showFunfact)}
                                    className="leading-3"
                                >
                                    {showFunfact ? (
                                        <OpenInFull size="small" />
                                    ) : (
                                        <Close />
                                    )}
                                </button>
                            </div>
                            <div
                                className={`${
                                    showFunfact == true ||
                                    errors.deskripsi_funfact ||
                                    errors.image_funfact
                                        ? ""
                                        : "hidden"
                                }`}
                            >
                                <div className="px-4 py-6">
                                    <div className="w-full my-2">
                                        <InputText
                                            label="image"
                                            type="file"
                                            onChange={(e) =>
                                                changeImageFunfaact(e)
                                            }
                                            errors={errors.image_funfact}
                                        />
                                    </div>
                                    {errors.deskripsi_funfact && (
                                        <p className="text-red-500 italic text-sm">
                                            {" "}
                                            {errors.deskripsi_funfact}
                                        </p>
                                    )}
                                    <Quils
                                        value={data.deskripsi_funfact}
                                        onChange={(value) =>
                                            setData({
                                                ...data,
                                                deskripsi_funfact: value,
                                            })
                                        }
                                    />
                                </div>
                                <div className=" px-4 md:px-8 lg:px-16 flex flex-col md:flex-row  justify-center items-center gap-9 py-6">
                                    <div className="my-4  gap-4 w-full md:w-1/2">
                                        <div className="flex justify-center items-center">
                                            <img
                                                src={
                                                    previewFunfact
                                                        ? previewFunfact
                                                        : "/storage/image/default_thumnbnail.jpg"
                                                }
                                                alt=""
                                                className=" w-[400px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <h1 className="font-medium text-xl w-full md:w-1/2 text-primary">
                                            Fun Fact
                                        </h1>

                                        <p
                                            className=" my-6"
                                            dangerouslySetInnerHTML={{
                                                __html: data.deskripsi_funfact,
                                            }}
                                        />

                                        <button
                                            type="button"
                                            className="text-primary font-bold text-xl leading-3 border py-5 px-3 border-primary rounded-md hover:bg-primary hover:text-white hover:border-white"
                                        >
                                            Selengkapnya
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

FormUpdate.layout = (page) => <AuthLayout children={page} />;
