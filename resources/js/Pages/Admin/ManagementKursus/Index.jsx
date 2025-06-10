import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { ClassTwoTone } from "@mui/icons-material";

import React, { useState } from "react";
import FormKategoriKursus from "./FormKategoriKursus";
import Dialogs from "@/Components/Dialogs";
import { router } from "@inertiajs/react";
import FormSub from "./FormSub";
import FormJenis from "./FormJenis";
import moment from "moment";

export default function Index(props) {
    const kategori = props.kategori;
    const kantor_cabang = props.kantor_cabang;
    const sub = props.sub;
    const jenis = props.jenis;
    const [modalKategori, setModalKategori] = useState(false);
    const [modalSub, setModalSub] = useState(false);
    const [modalJenis, setModalJenis] = useState(false);
    const [model, setModel] = useState(null);
    const [status, setStatus] = useState();

    const editKategori = (value) => {
        setStatus("kategori");
        setModalKategori(true);
        setModel(value);
    };
    const deleteKategori = (id) => {
        router.delete(route("admin.delete-management-kursus", { id }));
    };
    const editSub = (value) => {
        setStatus("sub");
        setModalSub(true);
        setModel(value);
    };
    const deleteSub = (id) => {
        router.delete(route("admin.delete-sub-kategori-kursus", { id }));
    };
    const editJenis = (value) => {
        setStatus("jenis");
        setModalJenis(true);
        setModel(value);
    };
    const deleteJenis = (id) => {
        router.delete(route("admin.delete-jenis-kategori-kursus", { id }));
    };
    return (
        <>
            <Dialogs
                open={modalKategori}
                title={
                    model ? "Edit Kategori Kursus" : "Tambah Kategori Kursus"
                }
                handleClose={() => {
                    setModalKategori(false);
                    setModel(null);
                }}
            >
                <FormKategoriKursus
                    kantor_cabang={kantor_cabang}
                    model={model}
                    onClose={() => {
                        setModalKategori(false);
                        setModel(null);
                    }}
                />
            </Dialogs>
            <Dialogs
                open={modalSub}
                title={
                    model
                        ? "Edit Sub Kategori Kursus"
                        : "Tambah Sub Kategori Kursus"
                }
                handleClose={() => {
                    setModalSub(false);
                    setModel(null);
                }}
            >
                <FormSub
                    kantor_cabang={kantor_cabang}
                    model={model}
                    kategori={kategori}
                    onClose={() => {
                        setModalSub(false);
                        setModel(null);
                    }}
                />
            </Dialogs>
            <Dialogs
                kantor_cabang={kantor_cabang}
                open={modalJenis}
                title={model ? "Edit Jenis Kursus" : "Tambah Jenis Kursus"}
                handleClose={() => {
                    setModalJenis(false);
                    setModel(null);
                }}
            >
                <FormJenis
                    kantor_cabang={kantor_cabang}
                    model={model}
                    onClose={() => {
                        setModalJenis(false);
                        setModel(null);
                    }}
                />
            </Dialogs>
            <div className="py-6 px-8 w-full">
                <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                    Management Kursus
                </h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium libero vel eaque facilis laboriosam eum saepe,
                    ea voluptate non, sapiente cupiditate eveniet nihil facere
                    dolore molestias veritatis rem atque perferendis.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                        <div className="flex justify-between items-center w-full">
                            <p className="font-bold text-6xl text-white">
                                <ClassTwoTone
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </p>
                            <p className="font-bold text-6xl text-white">
                                {kategori.length}
                            </p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Kategori Kursus
                        </p>
                    </div>
                    <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                        <div className="flex justify-between items-center w-full">
                            <p className="font-bold text-6xl text-white">
                                <ClassTwoTone
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </p>
                            <p className="font-bold text-6xl text-white">
                                {sub.length}
                            </p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Sub Kategori Kursus
                        </p>
                    </div>
                    <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                        <div className="flex justify-between items-center w-full">
                            <p className="font-bold text-6xl text-white">
                                <ClassTwoTone
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </p>
                            <p className="font-bold text-6xl text-white">120</p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Jenis Kursus
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 py-4">
                    {/* kategori kursus */}
                    <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200">
                        <h3 className="text-blue-950 font-semibold text-xl tracking-tight">
                            Kelola Data Kategori Kursus
                        </h3>
                        <p>
                            {" "}
                            Kategori kursus adalah pengelompokan kursus
                            berdasarkan topik atau bidang tertentu, seperti
                            Komputer, Manajemen, Bahasa Inggris, dan lainnya
                        </p>
                        <div className="py-2 w-full min-h-[300px] max-h-[300px] overflow-x-auto overflow-y-auto">
                            <button
                                onClick={() => setModalKategori(true)}
                                className="py-1 px-2 text-white bg-blue-500 hover:bg-blue-600 usetransisi  rounded-md drop-shadow-md my-2"
                            >
                                Tambah Kategori
                            </button>
                            <Tables>
                                <thead>
                                    <tr>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            #
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Thumbnail
                                        </Tables.Th>
                                        <Tables.Th
                                            className={
                                                "text-black text-xs w-[150px]"
                                            }
                                        >
                                            Kategori Kursus
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Deskripsi Kategori
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Kantor
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Updated_at
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Created_by
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Updated_by
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Aksi
                                        </Tables.Th>
                                    </tr>
                                </thead>
                                <Tables.Tbody>
                                    {kategori.length > 0 ? (
                                        kategori.map((item, key) => (
                                            <tr key={key}>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {key}
                                                </Tables.Td>
                                                <Tables.Td>
                                                    <img
                                                        src={
                                                            "/storage/" +
                                                            item.thumbnail
                                                        }
                                                        alt=""
                                                        className="w-10 h-10 bg-blue-500  text-xs"
                                                    />
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.nama_kategori}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    <p
                                                        className="line-clamp-2 "
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.deskripsi,
                                                        }}
                                                    />
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.nama_kantor}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {moment(
                                                        item.updated_at
                                                    ).format("ll")}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.created_by}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.updated_by}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={"flex gap-2"}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            editKategori(item)
                                                        }
                                                        className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteKategori(
                                                                item.id
                                                            )
                                                        }
                                                        className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        Delete
                                                    </button>
                                                </Tables.Td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <Tables.Td
                                                colSpan={10}
                                                className="text-center"
                                            >
                                                Belum ada kategori yang telah
                                                dibuat
                                            </Tables.Td>
                                        </tr>
                                    )}
                                </Tables.Tbody>
                            </Tables>
                        </div>
                    </div>
                    {/* end kategori */}
                    {/* sub kategori */}
                    <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200">
                        <h3 className="text-blue-950 font-semibold text-xl tracking-tight">
                            Kelola Data Sub Kategori Kursus
                        </h3>
                        <p>
                            Sub kategori kursus adalah pengelompokan lebih
                            spesifik dari kategori kursus, seperti Aplikasi
                            Perkantoran, Pemrograman, Manajemen Proyek, dan
                            lain-lain
                        </p>
                        <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                            <button
                                onClick={() => setModalSub(true)}
                                className="py-1 px-2 text-white bg-blue-500 hover:bg-blue-600 usetransisi  rounded-md drop-shadow-md my-2"
                            >
                                Tambah Sub Kategori
                            </button>
                            <Tables>
                                <thead>
                                    <tr>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            #
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Thumbnail
                                        </Tables.Th>
                                        <Tables.Th
                                            className={
                                                "text-black text-xs w-[150px]"
                                            }
                                        >
                                            Kategori
                                        </Tables.Th>
                                        <Tables.Th
                                            className={
                                                "text-black text-xs w-[150px]"
                                            }
                                        >
                                            Nama
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Deskripsi
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Kantor
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Updated_at
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Created_by
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Updated_by
                                        </Tables.Th>
                                        <Tables.Th
                                            className={"text-black text-xs"}
                                        >
                                            Aksi
                                        </Tables.Th>
                                    </tr>
                                </thead>
                                <Tables.Tbody>
                                    {sub.length > 0 ? (
                                        sub.map((item, key) => (
                                            <tr key={key}>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {key}
                                                </Tables.Td>
                                                <Tables.Td>
                                                    <img
                                                        src={
                                                            "/storage/" +
                                                            item.thumbnail
                                                        }
                                                        alt=""
                                                        className="w-10 h-10 bg-blue-500  text-xs"
                                                    />
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.nama_kategori}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.nama_sub_kategori}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    <p
                                                        className="line-clamp-2 "
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.deskripsi,
                                                        }}
                                                    />
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.nama_kantor}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {moment(
                                                        item.updated_at
                                                    ).format("ll")}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.created_by}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={
                                                        "text-black text-xs"
                                                    }
                                                >
                                                    {item.updated_by}
                                                </Tables.Td>
                                                <Tables.Td
                                                    className={"flex gap-2"}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            editSub(item)
                                                        }
                                                        className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteSub(item.id)
                                                        }
                                                        className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        Delete
                                                    </button>
                                                </Tables.Td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <Tables.Td
                                                colSpan={10}
                                                className="text-center"
                                            >
                                                Belum ada sub kategori yang
                                                telah dibuat
                                            </Tables.Td>
                                        </tr>
                                    )}
                                </Tables.Tbody>
                            </Tables>
                        </div>
                    </div>
                    {/* end sub kategori */}
                </div>
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200">
                    <h3 className="text-blue-950 font-semibold text-xl tracking-tight">
                        Kelola Data Jenis Kursus
                    </h3>
                    <p>
                        Jenis kursus adalah cara pengelompokan kursus
                        berdasarkan format atau metode pembelajaran, seperti
                        Private, Regular, Online, dan lain-lain
                    </p>
                    <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                        <button
                            onClick={() => setModalJenis(true)}
                            className="py-1 px-2 text-white bg-blue-500 hover:bg-blue-600 usetransisi  rounded-md drop-shadow-md my-2"
                        >
                            Tambah Jenis Kursus
                        </button>
                        <Tables>
                            <thead>
                                <tr>
                                    <Tables.Th className={"text-black text-xs"}>
                                        #
                                    </Tables.Th>
                                    <Tables.Th className={"text-black text-xs"}>
                                        Thumbnail
                                    </Tables.Th>
                                    <Tables.Th
                                        className={
                                            "text-black text-xs w-[150px]"
                                        }
                                    >
                                        Jenis Kursus
                                    </Tables.Th>

                                    <Tables.Th className={"text-black text-xs"}>
                                        Deskripsi
                                    </Tables.Th>
                                    <Tables.Th className={"text-black text-xs"}>
                                        Total Benefit
                                    </Tables.Th>
                                    <Tables.Th className={"text-black text-xs"}>
                                        Kantor
                                    </Tables.Th>
                                    <Tables.Th className={"text-black text-xs"}>
                                        Updated_at
                                    </Tables.Th>
                                    <Tables.Th className={"text-black text-xs"}>
                                        Created_by
                                    </Tables.Th>
                                    <Tables.Th className={"text-black text-xs"}>
                                        Updated_by
                                    </Tables.Th>
                                    <Tables.Th className={"text-black text-xs"}>
                                        Aksi
                                    </Tables.Th>
                                </tr>
                            </thead>
                            <Tables.Tbody>
                                {jenis.length > 0 ? (
                                    jenis.map((item, key) => (
                                        <tr key={key}>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {key}
                                            </Tables.Td>
                                            <Tables.Td>
                                                <img
                                                    src={
                                                        "/storage/" +
                                                        item.thumbnail
                                                    }
                                                    alt=""
                                                    className="w-10 h-10 bg-blue-500  text-xs"
                                                />
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {item.jenis_kursus}
                                            </Tables.Td>

                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                <p
                                                    className="line-clamp-2 "
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.deskripsi,
                                                    }}
                                                />
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {item.benefit.length}
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {item.nama_kantor}
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {moment(item.updated_at).format(
                                                    "ll"
                                                )}
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {item.created_by}
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {item.updated_by}
                                            </Tables.Td>
                                            <Tables.Td className={"flex gap-2"}>
                                                <button
                                                    onClick={() =>
                                                        editJenis(item)
                                                    }
                                                    className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteJenis(item.id)
                                                    }
                                                    className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    Delete
                                                </button>
                                            </Tables.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Tables.Td
                                            colSpan={3}
                                            className="text-center"
                                        >
                                            Belum ada sub kategori yang telah
                                            dibuat
                                        </Tables.Td>
                                    </tr>
                                )}
                            </Tables.Tbody>
                        </Tables>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
