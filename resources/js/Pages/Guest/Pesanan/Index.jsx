import Profile from "@/Components/Guest/Profile";
import Tables from "@/Components/Tables";
import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function Index(props) {
    const pesanan = props.pesanan;
    return (
        <Profile>
            <div className="w-full">
                <Tables className="w-full">
                    <thead>
                        <tr>
                            <Tables.Th className={"text-xs"}>
                                Kode Transaksi
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Total Materi
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Jumlah Pertemuan
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Tanggal Pesanan
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Total Harga
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Status Pesanan
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Status Pembayaran
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Status Konfiramsi
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>Aksi </Tables.Th>
                        </tr>
                    </thead>
                    <Tables.Tbody>
                        {pesanan.length > 0 ? (
                            pesanan.map((item, key) => (
                                <tr key={key}>
                                    <Tables.Td>{item.kd_transaksi}</Tables.Td>
                                    <Tables.Td>
                                        {item.total_materi + " Materi"}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.total_pertemuan + " Pertemuan"}
                                    </Tables.Td>

                                    <Tables.Td>
                                        {moment(item.tanggal_pesan).format(
                                            "Y-M-D"
                                        )}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {formatRupiah(item.total_netto)}
                                    </Tables.Td>
                                    <Tables.Td>{item.status_pesanan}</Tables.Td>
                                    <Tables.Td>
                                        {item.status_pembayaran}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.status_konfirmasi}
                                    </Tables.Td>
                                    <Tables.Td className={"flex"}>
                                        <Link
                                            href={route(
                                                "siswa.show-history-pesanan-kursus",
                                                item.kd_transaksi
                                            )}
                                            className="bg-primary text-white py-2 px-3 rounded-md"
                                        >
                                            Lihat
                                        </Link>
                                        {item.status_konfirmasi ==
                                            "menunggu konfirmasi" && (
                                            <button className="bg-red-500 text-white py-2 px-3 rounded-md">
                                                Batal
                                            </button>
                                        )}
                                    </Tables.Td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <Tables.Td
                                    colspan={12}
                                    className={"text-center w-full bg-gray-100"}
                                >
                                    Belum ada data yang ditambahkan
                                </Tables.Td>
                            </tr>
                        )}
                    </Tables.Tbody>
                </Tables>
            </div>
        </Profile>
    );
}

Index.layou = (page) => <GuestLayout children={page} />;
