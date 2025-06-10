import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import { router, useForm } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import React, { useEffect } from "react";

export default function FormJenis({ model, onClose, kantor_cabang }) {
    const { data, setData, post, reset, errors } = useForm({
        jenis_kursus: "",
        deskripsi: "",
        thumbnail: "",
        benefit: "",
        kantor_cabang_id: "",
        benefits: [],
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-jenis-kategori-kursus"));
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-jenis-kategori-kursus"));
    };
    useEffect(() => {
        setData({
            ...data,

            id: model ? model.id : "",
            jenis_kursus: model ? model.jenis_kursus : "",
            deskripsi: model ? model.deskripsi : "",
            kantor_cabang_id: model ? model.kantor_cabang_id : "",
            thumbnail: model ? model.thumbnail : "",
        });
    }, [model]);
    const addBenefit = () => {
        if (data.benefit.trim === "") return;
        const newBenefit = {
            id: data.benefits.length + 1,
            benefit: data.benefit,
        };
        setData((prev) => ({
            ...prev,
            benefits: [...prev.benefits, newBenefit],
        }));
        setData((prev) => ({ ...prev, benefit: "" }));
    };
    const removeBenefit = (id) => {
        setData((prev) => {
            const filtered = prev.benefits.filter((b) => b.id !== id);
            // Reassign ID setelah penghapusan
            const updated = filtered.map((b, index) => ({
                id: index + 1,
                benefit: b.benefit,
            }));
            return { ...prev, benefits: updated };
        });
    };

    const deleteBenefit = (id) => {
        if (model) {
            router.delete(
                route("delete-benefit-jenis-kategori-kursus", { id })
            );
        }
    };

    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="w-full py-9 "
        >
            <div className="flex flex-col lg:flex-row items-start gap-x-3">
                <div>
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
                        <InputText
                            name={"jenis_kursus"}
                            value={data.jenis_kursus}
                            errors={errors.jenis_kursus}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            multiline={false}
                            label="Nama Jenis Kursus"
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
                    <div className="p-2">
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
                    <div className="p-2 flex gap-x-3 items-center">
                        <div className="w-full">
                            <InputText
                                name={"benefit"}
                                value={data.benefit}
                                errors={errors.benefit}
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
                        <button
                            type="button"
                            onClick={addBenefit}
                            className="py-2 px-4 rounded-md bg-blue-950 text-white text-2xl"
                        >
                            <Add color="inherit" fontSize="inherit" />
                        </button>
                    </div>
                </div>
                <div className="py-2 px-4 w-full">
                    <h1 className="text-blue-500 font-medium">
                        Prefiew Benefit
                    </h1>

                    <div class="  ">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl p-6 relative overflow-hidden min-w-[300px] max-w-[400px]">
                            <h3 className="text-2xl font-bold mb-4 capitalize">
                                {data.jenis_kursus
                                    ? data.jenis_kursus
                                    : "Nama Jenis Kursus"}
                            </h3>
                            <p>{data.deskripsi}</p>
                            <div className="space-y-6 relative ml-2">
                                <div className="absolute left-3 top-2 bottom-2 w-1 bg-white rounded"></div>
                                {model &&
                                    model?.benefit.length > 0 &&
                                    model?.benefit.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-4"
                                        >
                                            <div className="w-7 h-7 rounded-full border-4 border-white bg-blue-600 z-10"></div>
                                            <div>
                                                <p>{item.benefit}</p>
                                                {errors[
                                                    `benefits.${index}.benefit`
                                                ] && (
                                                    <p className="text-red-500 text-xs italic">
                                                        {
                                                            errors[
                                                                `benefits.${index}.benefit`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteBenefit(item.id)
                                                }
                                                className="text-xs bg-red-500 p-1 rounded-md "
                                            >
                                                <Delete color="inherit" />
                                            </button>
                                        </div>
                                    ))}
                                {data.benefits.length > 0 &&
                                    data.benefits.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-4"
                                        >
                                            <div className="w-7 h-7 rounded-full border-4 border-white bg-blue-600 z-10"></div>
                                            <div>
                                                <p>{item.benefit}</p>
                                                {errors[
                                                    `benefits.${index}.benefit`
                                                ] && (
                                                    <p className="text-red-500 text-xs italic">
                                                        {
                                                            errors[
                                                                `benefits.${index}.benefit`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeBenefit(item.id)
                                                }
                                                className="text-xs bg-red-500 p-1 rounded-md "
                                            >
                                                <Delete color="inherit" />
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
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
