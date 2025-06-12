import Dialogs from "@/Components/Dialogs";
import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Link, usePage } from "@inertiajs/react";
import {
    Cancel,
    ClassTwoTone,
    Done,
    LockClock,
    Pending,
} from "@mui/icons-material";
import moment from "moment";
import React, { useState } from "react";
import FormCreate from "./FormCreate";

export default function Index({ payment }) {
    const { auth } = usePage().props;
    const roles = auth.roles;
    const permissions = auth.permissions;
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState([]);
    return (
        <>
            <Dialogs
                open={modal}
                handleClose={() => setModal(false)}
                title={"Buat Pembayaran Baru"}
            >
                <FormCreate />
            </Dialogs>
            <div className="py-6 px-8 w-full">
                <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                    Management Pendaftaran Kursus
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
                                <Pending color="inherit" fontSize="inherit" />
                            </p>
                            <p className="font-bold text-6xl text-white">0</p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Pembayaran Pending
                        </p>
                    </div>

                    <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                        <div className="flex justify-between items-center w-full">
                            <p className="font-bold text-6xl text-white">
                                <Done color="inherit" fontSize="inherit" />
                            </p>
                            <p className="font-bold text-6xl text-white">0</p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Pembayaran Settlement
                        </p>
                    </div>
                    <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                        <div className="flex justify-between items-center w-full">
                            <p className="font-bold text-6xl text-white">
                                <Cancel color="inherit" fontSize="inherit" />
                            </p>
                            <p className="font-bold text-6xl text-white">0</p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Pembayaran Cancell
                        </p>
                    </div>
                </div>
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                    <div className="w-full flex flex-row justify-between items-center">
                        {permissions.includes("create_pembayaran_kursus") && (
                            <button
                                onClick={() => setModal(true)}
                                className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                            >
                                Buat Pembayaran Baru
                            </button>
                        )}
                        <InputText
                            label={"Cari Pembayaran"}
                            placeHolder="Cari Pembayaran..."
                        />
                    </div>
                    <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                        <Tables>
                            <thead className="w-full">
                                <Tables.Th className={"text-xs"}>
                                    Kode Pendaftaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Kode Pembayaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Nama Siswa
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Jumlah Pembayaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Sisa Pembayaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Pembayaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Status
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Payment Type
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Tanggal Pembayaran
                                </Tables.Th>

                                <Tables.Th className={"text-xs"}>
                                    Proses By
                                </Tables.Th>

                                <Tables.Th className={"text-xs"}>
                                    Aksi
                                </Tables.Th>
                            </thead>
                            <Tables.Tbody>
                                {payment.length > 0 ? (
                                    payment.map((item, key) => (
                                        <tr
                                            className="odd:bg-gray-200 w-full"
                                            key={key}
                                        >
                                            <Tables.Td className="text-xs capitalize">
                                                {item.pesanan.kd_transaksi}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs capitalize">
                                                {item.order_id}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs capitalize">
                                                {item.siswa.nama_lengkap}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs capitalize">
                                                {formatRupiah(
                                                    item.gross_amount
                                                )}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs capitalize">
                                                {formatRupiah(
                                                    item.remaining_amount
                                                )}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs capitalize">
                                                {item.installment_number}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs capitalize">
                                                {item.status}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs capitalize">
                                                {item.payment_type}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs">
                                                {moment(
                                                    item.succeeded_at
                                                ).format("DD-MM-Y")}
                                            </Tables.Td>

                                            <Tables.Td className="text-xs">
                                                {item.petugas.name}
                                            </Tables.Td>

                                            <Tables.Td
                                                className={"flex gap-x-2"}
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.one-invoice-pendaftaran-kursus",
                                                        item.order_id
                                                    )}
                                                    className="py-1 px-2 text-white bg-blue-500 hover:bg-blue-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    Cetak Invoice
                                                </Link>
                                            </Tables.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Tables.Td
                                            colspan={10}
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
