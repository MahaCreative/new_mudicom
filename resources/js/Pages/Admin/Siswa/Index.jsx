import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { ClassTwoTone, Delete, Edit } from "@mui/icons-material";
import { MenuItem, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";

export default function Index(props) {
    const { auth } = usePage().props;
    const roles = auth.roles;
    const permissions = auth.permissions;
    const siswa = props.siswa;
    const editHandler = (item) => {
        router.get(route("admin.edit-management-siswa", item.kd_siswa));
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
                        Jumlah siswa
                    </p>
                </div>
            </div>
            <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                <div className="w-full flex flex-row justify-between items-center">
                    {permissions.includes("create_siswa") && (
                        <Link
                            href={route("admin.create-management-siswa")}
                            className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                        >
                            Tambah siswa
                        </Link>
                    )}
                    <InputText
                        label={"Cari siswa"}
                        placeHolder="Cari siswa..."
                    />
                </div>
                <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                    <Tables>
                        <thead className="w-full">
                            <Tables.Th className="text-xs capitalize">
                                #
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Kd siswa
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
                                Tanggal Terdaftar
                            </Tables.Th>

                            <Tables.Th className="text-xs capitalize">
                                By_Kantor
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
                            {siswa.length > 0 ? (
                                siswa.map((item, key) => (
                                    <tr className="odd:bg-gray-200 w-full">
                                        <Tables.Td
                                            className={
                                                "flex flex-row items-center gap-x-1"
                                            }
                                        >
                                            <p>{key + 1}</p>
                                            {permissions.includes(
                                                "edit_siswa"
                                            ) && (
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
                                            )}
                                            {permissions.includes(
                                                "delete_siswa"
                                            ) && (
                                                <Tooltip
                                                    title={`Delete ${item.nama_lengkap}`}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(
                                                                item.id
                                                            )
                                                        }
                                                        className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        <Delete
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    </button>
                                                </Tooltip>
                                            )}
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs">
                                                {item.kd_siswa}
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
                                                {item.nama_kantor}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"text-black text-xs"}
                                        >
                                            {permissions.includes(
                                                "confirm_siswa"
                                            ) ? (
                                                <SelectOption
                                                    value={
                                                        item.status_konfirmasi
                                                    }
                                                    onChange={(e) =>
                                                        updateStatus(e, item.id)
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
                                                {moment(item.updated_at).format(
                                                    "LL"
                                                )}
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
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
