import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, usePage } from "@inertiajs/react";
import { Delete, Edit } from "@mui/icons-material";
import { MenuItem, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";

export default function Index(props) {
    const { auth } = usePage().props;
    const roles = auth.roles;
    const permissions = auth.permissions;
    const kantor = props.kantor;
    return (
        <div className="py-6 px-8 w-full">
            <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                Management Informasi Kantor
            </h1>
            <p>
                Informasi perusahaan yang tampil pada website, adalah data
                Kantor yang statusnya Pusat, dan data kantor pusat hanya bisa
                dibuat 1 kali, tidak bisa di edit ataupun dihapus
            </p>
            <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                <div className="w-full flex flex-row justify-between items-center">
                    {permissions.includes("create_kantor_cabang") && (
                        <Link
                            href={route(
                                "admin.create-management-profile-perusahaan"
                            )}
                            className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                        >
                            Tambah Kantor Cabang
                        </Link>
                    )}
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
                                Kode
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Nama Kantor
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Alamat
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Kota
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Provinsi
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Telp / HP
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Email
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Status
                            </Tables.Th>

                            <Tables.Th className="text-xs capitalize">
                                Logo
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Thumbnail
                            </Tables.Th>
                            <Tables.Th className="text-xs capitalize">
                                Status Konfirmasi
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

                            <Tables.Th className="text-xs capitalize">
                                Aksi
                            </Tables.Th>
                        </thead>
                        <Tables.Tbody>
                            {kantor.length > 0 ? (
                                kantor.map((item, key) => (
                                    <tr className="odd:bg-gray-200 w-full">
                                        <Tables.Td
                                            className={
                                                "flex flex-row items-center gap-x-1"
                                            }
                                        >
                                            <p>{key + 1}</p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs">
                                                {item.kode}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[150px] capitalize text-xs">
                                                {item.nama}
                                            </p>
                                        </Tables.Td>

                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs">
                                                {item.alamat}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs">
                                                {item.kota}
                                            </p>
                                        </Tables.Td>

                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.provinsi}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[70px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.telepon}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[140px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.email}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[100px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.status}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <img
                                                src={"/storage/" + item.logo}
                                                alt=""
                                            />
                                        </Tables.Td>
                                        <Tables.Td>
                                            <img
                                                src={
                                                    "/storage/" + item.thumbnail
                                                }
                                                alt=""
                                            />
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"text-black text-xs"}
                                        >
                                            {permissions.includes(
                                                "confirm_kantor_cabang"
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
                                            <p className="w-[140px] capitalize text-xs text-wrap line-clamp-1">
                                                {moment(item.updated_at).format(
                                                    "LL"
                                                )}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[140px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.created_by}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p className="w-[140px] capitalize text-xs text-wrap line-clamp-1">
                                                {item.updated_by}
                                            </p>
                                        </Tables.Td>

                                        <Tables.Td>
                                            {permissions.includes(
                                                "edit_kantor_cabang"
                                            ) && (
                                                <Tooltip
                                                    title={`Edit ${item.nama}`}
                                                >
                                                    <Link
                                                        href={route(
                                                            "admin.edit-management-profile-perusahaan",
                                                            item.kode
                                                        )}
                                                        className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                    >
                                                        <Edit
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    </Link>
                                                </Tooltip>
                                            )}
                                            {item.status == "cabang" &&
                                                permissions.includes(
                                                    "delete_kantor_cabang"
                                                ) && (
                                                    <>
                                                        <Tooltip
                                                            title={`Delete ${item.nama}`}
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
                                                    </>
                                                )}
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
