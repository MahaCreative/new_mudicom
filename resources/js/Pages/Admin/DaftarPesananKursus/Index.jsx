import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { ClassTwoTone } from "@mui/icons-material";
import Tables from "@/Components/Tables";
import moment from "moment";
export default function Index(props) {
    const detail = props.detail;
    const count_kategori = props.count_kategori;
    return (
        <div className="py-6 px-8 w-full">
            <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                Daftar Pesanan Paket Kursus
            </h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium libero vel eaque facilis laboriosam eum saepe, ea
                voluptate non, sapiente cupiditate eveniet nihil facere dolore
                molestias veritatis rem atque perferendis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {count_kategori.map((item, key) => (
                    <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                        <div
                            key={key}
                            className="flex justify-between items-center w-full"
                        >
                            <p className="font-bold text-6xl text-white">
                                <ClassTwoTone
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </p>
                            <p className="font-bold text-6xl text-white">
                                {item.total_dipesan}
                            </p>
                        </div>
                        <p className="text-white border-t border-b-blue-800 w-full text-center">
                            Jumlah Kategori {item.kategori_kursus}
                        </p>
                    </div>
                ))}
            </div>
            <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200">
                <div className="py-2 w-full min-h-[400px]  max-h-full  overflow-x-auto overflow-y-auto">
                    <button
                        onClick={() => setModalJenis(true)}
                        className="py-1 px-2 text-white bg-blue-500 hover:bg-blue-600 usetransisi  rounded-md drop-shadow-md my-2"
                    >
                        Cetak Laporan
                    </button>
                    <Tables>
                        <thead>
                            <tr>
                                <Tables.Th className={"text-black text-xs"}>
                                    #
                                </Tables.Th>
                                <Tables.Th className={"text-black text-xs"}>
                                    Kd_transaksi
                                </Tables.Th>
                                <Tables.Th
                                    className={"text-black text-xs w-[150px]"}
                                >
                                    Nama Siswa
                                </Tables.Th>

                                <Tables.Th className={"text-black text-xs"}>
                                    Nama Paket
                                </Tables.Th>
                                <Tables.Th className={"text-black text-xs"}>
                                    Kategori Kursus
                                </Tables.Th>
                                <Tables.Th className={"text-black text-xs"}>
                                    Jenis Kursus
                                </Tables.Th>
                                <Tables.Th className={"text-black text-xs"}>
                                    Nama Instruktur
                                </Tables.Th>
                                <Tables.Th className={"text-black text-xs"}>
                                    Tanggal Pendaftaran
                                </Tables.Th>
                            </tr>
                        </thead>
                        <Tables.Tbody>
                            {detail.length > 0 ? (
                                detail.map((item, key) => (
                                    <tr key={key}>
                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {key}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {item.kd_transaksi}
                                        </Tables.Td>

                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {item.nama_siswa}
                                        </Tables.Td>

                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {item.nama_paket}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {item.kategori_kursus}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {item.jenis_kursus}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {item.nama_instruktur}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "text-black text-xs capitalize"
                                            }
                                        >
                                            {moment(item.created_at).format(
                                                "DD-MMMM-YYYY"
                                            )}
                                        </Tables.Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Tables.Td
                                        colSpan={3}
                                        className="text-center"
                                    >
                                        Belum ada sub kategori yang telah dibuat
                                    </Tables.Td>
                                </tr>
                            )}
                        </Tables.Tbody>
                    </Tables>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
