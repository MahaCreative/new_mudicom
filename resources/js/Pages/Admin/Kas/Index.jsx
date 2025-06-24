import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { ClassTwoTone } from "@mui/icons-material";
import moment from "moment";
import React from "react";

export default function Index(props) {
    const kas = props.kas;
    const totalPemasukan = props.totalPemasukan;
    const totalPengeluaran = props.totalPengeluaran;
    const saldoTerakhir = props.saldoTerakhir;
    return (
        <div className="py-6 px-8 w-full">
            <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                Management Kas Perusahaan
            </h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium libero vel eaque facilis laboriosam eum saepe, ea
                voluptate non, sapiente cupiditate eveniet nihil facere dolore
                molestias veritatis rem atque perferendis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-6xl text-white">
                            <ClassTwoTone color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-6xl text-white">
                            {formatRupiah(saldoTerakhir)}
                        </p>
                    </div>
                    <p className="text-white border-t border-b-blue-800 w-full text-center">
                        Total Kas Saat Ini
                    </p>
                </div>
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-6xl text-white">
                            <ClassTwoTone color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-6xl text-white">
                            {formatRupiah(totalPemasukan)}
                        </p>
                    </div>
                    <p className="text-white border-t border-b-blue-800 w-full text-center">
                        Jumlah Pemasukan Hari Ini
                    </p>
                </div>
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-6xl text-white">
                            <ClassTwoTone color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-6xl text-white">
                            {formatRupiah(totalPengeluaran)}
                        </p>
                    </div>
                    <p className="text-white border-t border-b-blue-800 w-full text-center">
                        Jumlah Pengeluaran Hari Ini
                    </p>
                </div>
            </div>
            <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                <div className="w-full flex flex-row justify-between items-center">
                    <button
                        onClick={() => setModal(true)}
                        className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                    >
                        Tambah Transaksi
                    </button>
                    <InputText
                        label={"Cari Materi"}
                        placeHolder="Cari Materi..."
                    />
                </div>
                <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                    <Tables>
                        <thead className="w-full">
                            <Tables.Th className={"text-xs"}>#</Tables.Th>
                            <Tables.Th className={"text-xs"}>Tanggal</Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Jenis Transaksi
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>sumber</Tables.Th>
                            <Tables.Th className={"text-xs"}>debit</Tables.Th>
                            <Tables.Th className={"text-xs"}>kredit</Tables.Th>
                            <Tables.Th className={"text-xs"}>saldo</Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                kantor Cabang
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Create By
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Update By
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>Aksi</Tables.Th>
                        </thead>
                        <Tables.Tbody>
                            {kas.length > 0 ? (
                                kas.map((item, key) => (
                                    <tr className="odd:bg-gray-200 w-full">
                                        <Tables.Td className={"text-xs"}>
                                            {key + 1}
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="text-xs capitalize">
                                                {moment(item.tanggal).format(
                                                    "DD-MMMM-YYYY"
                                                )}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {item.sumber}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {item.keterangan}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {formatRupiah(item.debit)}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {formatRupiah(item.kredit)}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {formatRupiah(item.saldo)}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {formatRupiah(item.saldo)}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {item.kantor_cabang}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {item.created_by}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {item.updated_by}
                                            </p>
                                        </Tables.Td>

                                        <Tables.Td className={"flex gap-x-2"}>
                                            {/* <button
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
                                            </button> */}
                                        </Tables.Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Tables.Td
                                        colspan={12}
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
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
