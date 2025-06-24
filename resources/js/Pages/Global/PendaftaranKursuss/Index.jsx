import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Link, usePage } from "@inertiajs/react";
import { ClassTwoTone, Done, LockClock } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import moment from "moment";
import React from "react";

export default function Index(props) {
    const pesanan = props.pesanan;
    const { auth } = usePage().props;
    const roles = auth.roles;
    const permissions = auth.permissions;

    return (
        <>
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
                                <ClassTwoTone
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </p>
                            <p className="font-bold text-6xl text-white">0</p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Pendaftaran Kursus
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
                            Jumlah Kursus Selesai
                        </p>
                    </div>
                    <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                        <div className="flex justify-between items-center w-full">
                            <p className="font-bold text-6xl text-white">
                                <LockClock color="inherit" fontSize="inherit" />
                            </p>
                            <p className="font-bold text-6xl text-white">0</p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Kursus Berjalan
                        </p>
                    </div>
                </div>
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                    <div className="w-full flex flex-row justify-between items-center">
                        <Link
                            href={route("admin.formulit-pendaftaran-kursus")}
                            onClick={() => setModal(true)}
                            className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                        >
                            Buat Pendaftaran Baru
                        </Link>
                        <InputText
                            label={"Cari Materi"}
                            placeHolder="Cari Materi..."
                        />
                    </div>
                    <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                        <Tables>
                            <thead className="w-full">
                                <Tables.Th className={"text-xs"}>
                                    Kode Transaksi
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Nama Peserta
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Jumlah Paket
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Tanggal Pendaftaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Total Pesananan
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Sisa Pembayaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Tanggal Pembayaran Terakhir
                                </Tables.Th>

                                <Tables.Th className={"text-xs"}>
                                    Status Pembayaran
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Status Pesanan
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Status Konfirmasi
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Tipe
                                </Tables.Th>

                                <Tables.Th className={"text-xs"}>
                                    Proses By
                                </Tables.Th>

                                <Tables.Th className={"text-xs"}>
                                    Aksi
                                </Tables.Th>
                            </thead>
                            <Tables.Tbody>
                                {pesanan.length > 0 ? (
                                    pesanan.map((item, key) => (
                                        <tr
                                            className="odd:bg-gray-200 w-full"
                                            key={key}
                                        >
                                            <Tables.Td className="text-xs">
                                                {item.kd_transaksi}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs">
                                                {item.siswa?.nama_lengkap}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs">
                                                {item.detail.length}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs">
                                                {moment(item.created_at).format(
                                                    "DD-MM-Y"
                                                )}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs">
                                                {formatRupiah(item.total_netto)}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs">
                                                {formatRupiah(item.sisa_bayar)}
                                            </Tables.Td>

                                            <Tables.Td className="text-xs">
                                                {moment(
                                                    item.tanggal_pembayaran_terakhir
                                                ).format("DD-MM-Y")}
                                            </Tables.Td>
                                            <Tables.Td className="text-xs">
                                                {item.status_pembayaran}
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {item.status_pesanan !==
                                                "cancell" ? (
                                                    <SelectOption
                                                        value={
                                                            item.status_pesanan
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
                                                            value="proses"
                                                        >
                                                            proses
                                                        </MenuItem>
                                                        <MenuItem
                                                            className="capitalize"
                                                            value="selesai"
                                                        >
                                                            selesai
                                                        </MenuItem>
                                                        <MenuItem
                                                            className="capitalize"
                                                            value="cancell"
                                                        >
                                                            cancell
                                                        </MenuItem>
                                                    </SelectOption>
                                                ) : (
                                                    item.status_pesanan
                                                )}
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {permissions.includes(
                                                    "confirm_instruktur"
                                                ) &&
                                                item.status_konfirmasi !==
                                                    "terima" ? (
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
                                            <Tables.Td className="text-xs capitalize">
                                                {item.type_pesanan}
                                            </Tables.Td>

                                            <Tables.Td className="text-xs">
                                                {/* {item.petugas.name} */}
                                            </Tables.Td>

                                            <Tables.Td
                                                className={"flex gap-x-2"}
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.show-pendaftaran-kursus",
                                                        item.kd_transaksi
                                                    )}
                                                    className="py-1 px-2 text-white bg-blue-500 hover:bg-blue-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    Lihat
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "admin.edit-pendaftaran-kursus",
                                                        item.kd_transaksi
                                                    )}
                                                    className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    Edit
                                                </Link>
                                                {item.status_pembayaran !==
                                                    "lunas" &&
                                                    item.status_konfirmasi ==
                                                        "terima" && (
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
