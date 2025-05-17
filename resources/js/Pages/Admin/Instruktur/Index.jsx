import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, router } from "@inertiajs/react";
import { ClassTwoTone, Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";

export default function Index(props) {
    const instruktur = props.instruktur;
    const editHandler = (item) => {
        router.get(
            route("admin.edit-management-instruktur", item.kd_instruktur)
        );
    };
    return (
        <div className="py-6 px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-6xl text-white">
                            <ClassTwoTone color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-6xl text-white">0</p>
                    </div>
                    <p className="text-white border-t border-b-blue-800 w-full text-center">
                        Jumlah Instruktur
                    </p>
                </div>
            </div>
            <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                <div className="w-full flex flex-row justify-between items-center">
                    <Link
                        href={route("admin.create-management-instruktur")}
                        className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                    >
                        Tambah Instruktur
                    </Link>
                    <InputText
                        label={"Cari Instruktur"}
                        placeHolder="Cari Instruktur..."
                    />
                </div>
                <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                    <Tables>
                        <thead className="w-full">
                            <Tables.Th className="text-xs capitalize">
                                #
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Kd Instruktur
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Nama Lengkap
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Jenis Kelamin
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Telp
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Tanggal Lahir
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Agama
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Pendidikan
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Tanggal Masuk
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Instruktur
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Instruktur Cabang
                            </Tables.Th>

                            <Tables.Th className="text-xs capitalize">
                                Status
                            </Tables.Th>
                        </thead>
                        <Tables.Tbody>
                            {instruktur.length > 0 ? (
                                instruktur.map((item, key) => (
                                    <tr className="odd:bg-gray-200 w-full">
                                        <Tables.Td
                                            className={
                                                "flex flex-row items-center gap-x-1"
                                            }
                                        >
                                            <p>{key + 1}</p>
                                            <Tooltip
                                                title={`Edit ${item.nama_lengkap}`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        editHandler(item)
                                                    }
                                                    className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    <Edit
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                title={`Delete ${item.nama_lengkap}`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        deleteHandler(item.id)
                                                    }
                                                    className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                >
                                                    <Delete
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </button>
                                            </Tooltip>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs">
                                                {item.kd_instruktur}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {item.nama_lengkap}
                                            </p>
                                        </Tables.Td>

                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs">
                                                {item.jenis_kelamin}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs">
                                                {item.telp}
                                            </p>
                                        </Tables.Td>

                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                {moment(
                                                    item.tanggal_lahir
                                                ).format("DD-MMMM-YYYY")}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[70px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.agama}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[140px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.pendidikan}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                {moment(
                                                    item.tanggal_masuk
                                                ).format("DD-MMMM-YYYY")}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                {"mobil"}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.kantor_cabang}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.status}
                                            </p>
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
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
