import Dialogs from "@/Components/Dialogs";
import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { ClassTwoTone } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "./form";
import { Link, router } from "@inertiajs/react";

export default function Index(props) {
    const sub = props.sub;
    const materi = props.materi;
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState(null);

    const editHandler = (value) => {
        setModel(value);
        setModal(true);
    };
    const deleteHandler = (id) => {
        router.delete(route("admin.delete-management-materi-ajar", { id }));
    };
    return (
        <>
            <Dialogs
                open={modal}
                handleClose={() => {
                    setModel(null);
                    setModal(false);
                }}
                title={model ? "Edit Materi" : "Tambah Materi "}
            >
                <Form
                    model={model}
                    sub={sub}
                    setOpen={() => {
                        setModel(null);
                        setModal(false);
                    }}
                />
            </Dialogs>
            <div className="py-6 px-8 w-full">
                <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                    Management Materi Pelajaran
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
                                {materi.length}
                            </p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Materi Pelajaran
                        </p>
                    </div>
                </div>
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                    <div className="w-full flex flex-row justify-between items-center">
                        <button
                            onClick={() => setModal(true)}
                            className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                        >
                            Tambah Materi
                        </button>
                        <InputText
                            label={"Cari Materi"}
                            placeHolder="Cari Materi..."
                        />
                    </div>
                    <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                        <Tables>
                            <thead className="w-full">
                                <Tables.Th>#</Tables.Th>
                                <Tables.Th>Kategori</Tables.Th>
                                <Tables.Th>Nama Materi</Tables.Th>
                                <Tables.Th>Deskripsi</Tables.Th>
                                <Tables.Th>Modul</Tables.Th>
                                <Tables.Th>Silabus</Tables.Th>
                                <Tables.Th>Aksi</Tables.Th>
                            </thead>
                            <Tables.Tbody>
                                {materi.length > 0 ? (
                                    materi.map((item, key) => (
                                        <tr className="odd:bg-gray-200 w-full">
                                            <Tables.Td>{key + 1}</Tables.Td>
                                            <Tables.Td>
                                                <p>
                                                    {
                                                        item.kategori
                                                            .nama_sub_kategori
                                                    }
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[150px]">
                                                    {item.nama_materi}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p
                                                    className="line-clamp-2 w-[200px]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.deskripsi,
                                                    }}
                                                />
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[150px] line-clamp-1">
                                                    <a
                                                        target="blank"
                                                        className="text-blue-600 text-xs"
                                                        href={
                                                            "/storage/" +
                                                            item.modul
                                                        }
                                                    >
                                                        <p>{item.modul}</p>
                                                    </a>
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[150px] text-wrap line-clamp-1">
                                                    <a
                                                        target="blank"
                                                        className="text-blue-600 text-xs"
                                                        href={
                                                            "/storage/" +
                                                            item.modul
                                                        }
                                                    >
                                                        <p>{item.modul}</p>
                                                    </a>
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"flex gap-x-2"}
                                            >
                                                <button
                                                    onClick={() =>
                                                        editHandler(item)
                                                    }
                                                    className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteHandler(item.id)
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
                                            colspan={6}
                                            className={
                                                "text-center w-full bg-gray-100"
                                            }
                                        >
                                            Belum ada data yang ditambahkan
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
