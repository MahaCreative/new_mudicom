import Dialogs from "@/Components/Dialogs";
import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { ClassTwoTone } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Link, router, usePage } from "@inertiajs/react";
import { data } from "autoprefixer";
import moment from "moment";

export default function Index(props) {
    const { auth } = usePage().props;
    const roles = auth.roles;
    const permissions = auth.permissions;
    const paket = props.paket;
    const kantor_cabang = props.kantor_cabang;
    const kategori = props.kategori;
    const sub = props.sub;
    const jenis = props.jenis;
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState(null);
    console.log(paket);

    const deleteHandler = (id) => {
        router.delete(route("admin.delete-management-paket-kursus", { id }));
    };
    return (
        <>
            <Dialogs
                title={model ? "Edit Paket Kursus" : "Tambah Paket Kursus"}
                open={modal}
                handleClose={() => {
                    setModel(null);
                    setModal(false);
                }}
            >
                <Form
                    kantor_cabang={kantor_cabang}
                    onClose={() => {
                        setModel(null);
                        setModal(false);
                    }}
                    model={model}
                    kategori={kategori}
                    sub={sub}
                    jenis={jenis}
                />
            </Dialogs>
            <div className="py-6 px-8 w-full">
                <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                    Management Paket Kursus
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
                                {paket.length}
                            </p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Paket Kursus
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
                            <p className="font-bold text-6xl text-white">0</p>
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
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                    <div className="w-full flex justify-between items-center">
                        <div>
                            {permissions.includes("create_paket") && (
                                <Link
                                    as="button"
                                    href={route(
                                        "admin.create-management-paket-kursus"
                                    )}
                                    className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                                >
                                    Tambah Paket Kursus
                                </Link>
                            )}
                        </div>
                        <div className="flex ga-x-3 items-center w-[600px]">
                            <div className="w-full px-1">
                                <InputText
                                    label={"Cari Materi"}
                                    placeHolder="Cari Materi..."
                                />
                            </div>
                            <div className="w-full px-1">
                                <SelectOption label="Kategori">
                                    <MenuItem className="capitalize" value="">
                                        Pilih Kategori
                                    </MenuItem>
                                    {kategori.map((item, key) => (
                                        <MenuItem
                                            className="capitalize"
                                            key={key}
                                            value={item.id}
                                        >
                                            {item.nama_kategori}
                                        </MenuItem>
                                    ))}
                                </SelectOption>
                            </div>
                            <div className="w-full px-1">
                                <SelectOption label="Sub Kategori">
                                    <MenuItem className="capitalize" value="">
                                        Pilih Sub Kategori
                                    </MenuItem>
                                    {sub.map(
                                        (item, key) =>
                                            item.kategori.nama_kategori ==
                                                data.kategori_kursus && (
                                                <MenuItem
                                                    className="capitalize"
                                                    key={key}
                                                    value={item.id}
                                                >
                                                    {item.nama_sub_kategori}
                                                </MenuItem>
                                            )
                                    )}
                                </SelectOption>
                            </div>
                            <div className="w-full px-1">
                                <SelectOption label="Sub Kategori">
                                    <MenuItem className="capitalize" value="">
                                        Pilih Jenis
                                    </MenuItem>
                                    {jenis.map((item, key) => (
                                        <MenuItem
                                            className="capitalize"
                                            key={key}
                                            value={item.id}
                                        >
                                            {item.jenis_kursus}
                                        </MenuItem>
                                    ))}
                                </SelectOption>
                            </div>
                        </div>
                    </div>
                    <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                        <Tables>
                            <thead className="w-full">
                                <Tables.Th className={"text-xs capitalize"}>
                                    #
                                </Tables.Th>
                                <Tables.Th className={"text-xs capitalize"}>
                                    Kode Paket
                                </Tables.Th>
                                <Tables.Th className={"text-xs capitalize"}>
                                    Nama Paket
                                </Tables.Th>
                                <Tables.Th className={"text-xs capitalize"}>
                                    Kategori
                                </Tables.Th>

                                <Tables.Th className={"text-xs capitalize"}>
                                    Total Materi / Pertemuan
                                </Tables.Th>

                                <Tables.Th className={"text-xs capitalize"}>
                                    Harga Paket
                                </Tables.Th>

                                <Tables.Th className="text-xs capitalize">
                                    Status Konfirmasi
                                </Tables.Th>

                                <Tables.Th className="text-xs capitalize">
                                    Status
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Updated_at
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Created_by
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Updated_by
                                </Tables.Th>
                            </thead>
                            <Tables.Tbody>
                                {paket.length > 0 ? (
                                    paket.map((item, key) => (
                                        <tr className="odd:bg-gray-200 w-full">
                                            <Tables.Td
                                                className={
                                                    "text-xs flex flex-col gap-2"
                                                }
                                            >
                                                {permissions.includes(
                                                    "edit_paket"
                                                ) && (
                                                    <Link
                                                        href={route(
                                                            "admin.edit-management-paket-kursus",
                                                            item.slug
                                                        )}
                                                        className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        Edit
                                                    </Link>
                                                )}
                                                {permissions.includes(
                                                    "delete_paket"
                                                ) && (
                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(
                                                                item.id
                                                            )
                                                        }
                                                        className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </Tables.Td>
                                            <Tables.Td className={"text-xs"}>
                                                <p className="w-[70px]">
                                                    {item.kd_paket}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td className={"text-xs"}>
                                                <p className=" capitalize w-[130px]">
                                                    {item.nama_paket}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td className={"text-xs"}>
                                                <p className=" capitalize w-[170px]">
                                                    {"Kategori :" +
                                                        item.kategori_kursus +
                                                        " Sub Kategori :" +
                                                        item.sub_kategori_kursus +
                                                        " Jenis Kursus :" +
                                                        item.jenis_kursus}
                                                </p>
                                            </Tables.Td>

                                            <Tables.Td className={"text-xs"}>
                                                <p className=" capitalize w-[80px]">
                                                    {item.total_materi +
                                                        " Materi / " +
                                                        item.total_pertemuan +
                                                        " X Pertemuan"}
                                                </p>
                                            </Tables.Td>

                                            <Tables.Td className={"text-xs"}>
                                                <p className=" capitalize w-[80px]">
                                                    {formatRupiah(item.harga)}
                                                </p>
                                            </Tables.Td>

                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {permissions.includes(
                                                    "confirm_paket"
                                                ) ? (
                                                    <SelectOption
                                                        value={
                                                            item.status_konfirmasi
                                                        }
                                                        onChange={(e) =>
                                                            updateStatus(
                                                                e,
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <MenuItem
                                                            className="capitalize"
                                                            value="menunggu konfirmasi"
                                                        >
                                                            menunggu konfirmasi
                                                        </MenuItem>
                                                        <MenuItem
                                                            className="capitalize"
                                                            value="terima"
                                                        >
                                                            terima
                                                        </MenuItem>
                                                        <MenuItem
                                                            className="capitalize"
                                                            value="tolak"
                                                        >
                                                            tolak
                                                        </MenuItem>
                                                    </SelectOption>
                                                ) : (
                                                    item.status_konfirmasi
                                                )}
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[50px] capitalize text-xs text-wrap line-clamp-1">
                                                    {item.status}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                    {moment(
                                                        item.updated_at
                                                    ).format("LL")}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                    {item.created_by}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                    {item.updated_by}
                                                </p>
                                            </Tables.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Tables.Td
                                            colspan={11}
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
