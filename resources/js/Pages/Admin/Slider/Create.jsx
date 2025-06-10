import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { MenuItem } from "@mui/material";
import React, { useState } from "react";

export default function Create(props) {
    const kantor_cabang = props.kantor_cabang;
    const { data, setData, post, errors, reset } = useForm({
        judul: "",
        tag_line: "",
        thumbnail: "",
        status: "",
        kantor_cabang_id: "",
    });
    const [preview, setPreview] = useState(null);
    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreview(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, thumbnail: image }));
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-management-slider"));
    };
    return (
        <form onSubmit={submitHandler} className="py-6 px-8">
            <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                <div className="py-2 px-3 bg-blue-800 text-white">
                    <h1>Slider</h1>
                </div>
                <div className="w-full px-4 py-6">
                    <div className="py-2">
                        <InputText
                            label="Judul"
                            name="judul"
                            value={data.judul}
                            errors={errors.judul}
                            onChange={(e) =>
                                setData({ ...data, judul: e.target.value })
                            }
                        />
                    </div>
                    <div className="py-2">
                        <InputText
                            label="Tag Line"
                            name="tag_line"
                            value={data.tag_line}
                            errors={errors.tag_line}
                            onChange={(e) =>
                                setData({ ...data, tag_line: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex gap-x-3 w-full">
                        <div className="py-2 w-full">
                            <SelectOption
                                label="Status Slider"
                                name="status"
                                value={data.status}
                                errors={errors.status}
                                onChange={(e) =>
                                    setData({ ...data, status: e.target.value })
                                }
                            >
                                <MenuItem value="">
                                    Pilih status slider
                                </MenuItem>
                                <MenuItem value="aktif">Aktif</MenuItem>
                                <MenuItem value="nonaktif">Nonaktif</MenuItem>
                            </SelectOption>
                        </div>
                        <div className="py-2 w-full">
                            <InputText
                                type="file"
                                label="Image"
                                name="image"
                                errors={errors.image}
                                onChange={(e) => changeImage(e)}
                            />
                        </div>
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
                <div className="flex items-center gap-x-3 py-4 px-3">
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
            <img
                src={
                    preview ? preview : "/storage/image/default_thumnbnail.jpg"
                }
                alt=""
                className="w-full h-[600px] object-cover object-top"
            />
        </form>
    );
}

Create.layout = (page) => <AuthLayout children={page} />;
