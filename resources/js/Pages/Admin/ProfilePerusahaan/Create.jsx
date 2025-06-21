import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import ResponseAlert from "@/Hook/ResponseAlert";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import {
    Add,
    Close,
    Delete,
    Maximize,
    Minimize,
    OpenInFull,
} from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Create() {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        nama: "",
        kode: "",
        alamat: "",
        kota: "",
        provinsi: "",
        kode_pos: "",
        telepon: "",
        email: "",
        status: "",
        deskripsi: "",
        logo: "",
        thumbnail: "",
        visi: "",
        misi: [""],
        sosial_media: [
            {
                kategori: "",
                name: "",
                link: "",
            },
        ],
    });
    const [showDeskripsi, setShowDeskripsi] = useState(false);
    const [showSosmed, setShowSosmed] = useState(true);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [previewThumbnail, setPreviewThumbnail] = useState(null);
    const thumbnailRef = useRef(null);
    const logolRef = useRef(null);
    const imageClick = () => {
        logolRef.current.click();
    };
    const changeImage = (e) => {
        const image = e.target.files[0];
        setPreviewLogo(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, logo: image }));
    };
    const imageClickThumbnail = () => {
        thumbnailRef.current.click();
    };
    const changeImageThumbnail = (e) => {
        const image = e.target.files[0];
        setPreviewThumbnail(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, thumbnail: image }));
    };
    const addSosmed = () => {
        const updatedSosmed = [...data.sosial_media];
        const empty = {
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

    const changeMisi = (index, field, value) => {
        const updateMisi = [...data.misi];
        updateMisi[index] = value;
        setData((prev) => ({ ...prev, misi: updateMisi }));
    };
    const addMisi = () => {
        const updatedMisi = [...data.misi];
        setData((prev) => ({ ...prev, misi: ["", ...updatedMisi] }));
    };
    const removeMisi = (index) => {
        const updatedMisi = [...data.misi];
        updatedMisi.splice(1, index);
        setData((prev) => ({ ...prev, misi: updatedMisi }));
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],

            [{ align: [] }],

            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "color",
        "background",
        "script",
        "list",
        "bullet",
        "indent",

        "align",
        "clean",
    ];
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-management-profile-perusahaan"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan 1 data baru kedalam database"
                );
                reset();
                setPreviewLogo(null);
                setPreviewThumbnail(null);
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan data kantor baru, silahkan periksa isian anda kembali Err Code: " +
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
                        <h1>Profile Kantor</h1>
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
                                            previewLogo
                                                ? previewLogo
                                                : "/storage/image/default_profile.png"
                                        }
                                        alt=""
                                        className=" w-full h-full object-cover object-center "
                                    />
                                    <p className="bg-blue-500 text-center absolute inline-block p-2 rounded-md text-white top-2 right-2">
                                        Klik Untuk Ganti Logo
                                    </p>
                                    {errors.logo && (
                                        <p className="bg-red-500 text-center absolute inline-block p-2 rounded-md text-xs text-white top-14 right-2">
                                            {errors.logo}
                                        </p>
                                    )}
                                    <input
                                        ref={logolRef}
                                        type="file"
                                        hidden
                                        onChange={changeImage}
                                    />
                                </div>
                                <div
                                    onClick={imageClickThumbnail}
                                    className="hover:cursor-pointer hover:scale-105 usetransisi relative"
                                >
                                    <img
                                        src={
                                            previewThumbnail
                                                ? previewThumbnail
                                                : "/storage/image/default_profile.png"
                                        }
                                        alt=""
                                        className=" w-full h-full object-cover object-center "
                                    />
                                    <p className="bg-blue-500 text-center absolute inline-block p-2 rounded-md text-white top-2 right-2">
                                        Klik Untuk Ganti Thumbnail
                                    </p>
                                    {errors.thumbnail && (
                                        <p className="bg-red-500 text-center absolute inline-block p-2 rounded-md text-xs text-white top-14 right-2">
                                            {errors.thumbnail}
                                        </p>
                                    )}
                                    <input
                                        ref={thumbnailRef}
                                        type="file"
                                        hidden
                                        onChange={changeImageThumbnail}
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
                                Informasi Kantor
                            </h1>
                            <div className="flex flex-row gap-x-3 w-full my-2">
                                <div className="w-full">
                                    <InputText
                                        label="Nama"
                                        name="nama"
                                        value={data.nama}
                                        errors={errors.nama}
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
                                <div className="w-full">
                                    <InputText
                                        type="number"
                                        label="Telp /HP"
                                        name="telepon"
                                        value={data.telepon}
                                        errors={errors.telepon}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row gap-x-3 w-full my-2"></div>
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
                                        label="Kota"
                                        name="kota"
                                        value={data.kota}
                                        errors={errors.kota}
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
                                        label="Provinsi"
                                        name="provinsi"
                                        value={data.provinsi}
                                        errors={errors.provinsi}
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
                                        label="Kode Pos"
                                        type="number"
                                        name="kode_pos"
                                        value={data.kode_pos}
                                        errors={errors.kode_pos}
                                        onChange={(e) =>
                                            setData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex gap-x-3">
                                <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                                    <div className="py-2 px-3 bg-blue-800 text-white flex justify-between items-center">
                                        <h1>Visi dan Misi</h1>
                                        <button
                                            onClick={() =>
                                                setShowSosmed(!showSosmed)
                                            }
                                            type="button"
                                            className="leading-3"
                                        >
                                            {showSosmed ? (
                                                <Close />
                                            ) : (
                                                <OpenInFull size="small" />
                                            )}
                                        </button>
                                    </div>
                                    <div
                                        className={`${
                                            showSosmed
                                                ? "py-2 px-3"
                                                : "h-0 overflow-hidden"
                                        } `}
                                    >
                                        <div className="w-full">
                                            <InputText
                                                label="Visi"
                                                name="visi"
                                                value={data.visi}
                                                errors={errors.visi}
                                                onChange={(e) =>
                                                    setData((prev) => ({
                                                        ...prev,
                                                        [e.target.name]:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        {data.misi.map((item, key) => (
                                            <div
                                                key={key}
                                                className="flex items-center gap-x-2 my-2"
                                            >
                                                <div className="w-full">
                                                    <InputText
                                                        value={data.misi[key]}
                                                        errors={
                                                            errors[
                                                                `misi.${key}`
                                                            ]
                                                        }
                                                        label="Misi"
                                                        onChange={(e) =>
                                                            changeMisi(
                                                                key,
                                                                "misi",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex gap-x-2 items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addMisi()
                                                        }
                                                        className="p-2 text-base text-white bg-green-500 leading-3 rounded-full"
                                                    >
                                                        <Add
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeMisi(key)
                                                        }
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
                                <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                                    <div className="py-2 px-3 bg-blue-800 text-white flex justify-between items-center">
                                        <h1>Sosial Media Kantor</h1>
                                        <button
                                            onClick={() =>
                                                setShowSosmed(!showSosmed)
                                            }
                                            type="button"
                                            className="leading-3"
                                        >
                                            {showSosmed ? (
                                                <Close />
                                            ) : (
                                                <OpenInFull size="small" />
                                            )}
                                        </button>
                                    </div>
                                    <div
                                        className={`${
                                            showSosmed
                                                ? "py-2 px-3"
                                                : "h-0 overflow-hidden"
                                        } `}
                                    >
                                        {data.sosial_media.map((item, key) => (
                                            <div
                                                key={key}
                                                className="flex items-center gap-x-2 my-2"
                                            >
                                                <div className="w-full">
                                                    <InputText
                                                        value={
                                                            data.sosial_media[
                                                                key
                                                            ].name
                                                        }
                                                        errors={
                                                            errors[
                                                                `sosial_media.${key}.name`
                                                            ]
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
                                                        value={
                                                            data.sosial_media[
                                                                key
                                                            ].link
                                                        }
                                                        errors={
                                                            errors[
                                                                `sosial_media.${key}.link`
                                                            ]
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
                                                        value={
                                                            data.sosial_media[
                                                                key
                                                            ].kategori
                                                        }
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
                                                        onClick={() =>
                                                            addSosmed()
                                                        }
                                                        className="p-2 text-base text-white bg-green-500 leading-3 rounded-full"
                                                    >
                                                        <Add
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeSosmed(key)
                                                        }
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
                            <div className="w-full bg-white rounded-md drop-shadow  overflow-hidden my-3">
                                <div className="py-2 px-3 bg-blue-800 text-white flex justify-between items-center">
                                    <div className="flex gap-x-3 items-center">
                                        <h1>Deskripsi Kantor</h1>
                                        {errors.deskripsi && (
                                            <p className="py-1 px-2 rounded-md bg-red-500 text-white capitalize">
                                                {errors.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() =>
                                            setShowDeskripsi(!showDeskripsi)
                                        }
                                        type="button"
                                        className="leading-3"
                                    >
                                        {showDeskripsi ? (
                                            <Close />
                                        ) : (
                                            <OpenInFull size="small" />
                                        )}
                                    </button>
                                </div>
                                <ReactQuill
                                    onChange={(value) =>
                                        setData((prev) => ({
                                            ...prev,
                                            deskripsi: value,
                                        }))
                                    }
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                    value={data.deskripsi}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

Create.layout = (page) => <AuthLayout children={page} />;
