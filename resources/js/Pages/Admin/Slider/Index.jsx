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
    const slider = props.slider;
    return (
        <div>
            <div className="py-6 px-8 w-full">
                <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                    Management Slider
                </h1>
                <p>
                    Informasi perusahaan yang tampil pada website, adalah data
                    Kantor yang statusnya Pusat, dan data kantor pusat hanya
                    bisa dibuat 1 kali, tidak bisa di edit ataupun dihapus
                </p>
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md border border-gray-200 my-2">
                    <div className="w-full flex flex-row justify-between items-center">
                        {permissions.includes("create_slider") && (
                            <Link
                                href={route("admin.create-management-slider")}
                                className="py-2 px-4 rounded-md bg-blue-500 text-white tracking-tighter font-medium"
                            >
                                Tambah Kantor Cabang
                            </Link>
                        )}
                        <InputText
                            label={"Cari Slider"}
                            placeHolder="Cari Slider..."
                        />
                    </div>
                    <div className="py-2 w-full min-h-[300px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                        <Tables>
                            <thead className="w-full">
                                <Tables.Th className="text-xs capitalize">
                                    #
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Image
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Judul
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Tag Line
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Status
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    Konfirmasi
                                </Tables.Th>
                                <Tables.Th className="text-xs capitalize">
                                    By_Kantor
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
                                {slider.length > 0 ? (
                                    slider.map((item, key) => (
                                        <tr className="odd:bg-gray-200 w-full">
                                            <Tables.Td
                                                className={
                                                    "flex flex-row items-center gap-x-1"
                                                }
                                            >
                                                <p>{key + 1}</p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <a
                                                    href={
                                                        "/storage/" +
                                                        item.thumbnail
                                                    }
                                                    target="_blank"
                                                >
                                                    <img
                                                        src={
                                                            "/storage/" +
                                                            item.thumbnail
                                                        }
                                                        alt={item.judul}
                                                        className="w-12 h-12 object-cover object-center"
                                                    />
                                                </a>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[150px] capitalize text-xs">
                                                    {item.judul}
                                                </p>
                                            </Tables.Td>

                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs">
                                                    {item.tagline}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs">
                                                    {item.status}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td
                                                className={"text-black text-xs"}
                                            >
                                                {permissions.includes(
                                                    "confirm_slider"
                                                ) ? (
                                                    <SelectOption
                                                        value={item.status}
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
                                                <p className="w-[100px] capitalize text-xs">
                                                    {item.nama_cabang}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs">
                                                    {moment(
                                                        item.updated_at
                                                    ).format("LL")}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs">
                                                    {item.created_by}
                                                </p>
                                            </Tables.Td>
                                            <Tables.Td>
                                                <p className="w-[100px] capitalize text-xs">
                                                    {item.updated_by}
                                                </p>
                                            </Tables.Td>

                                            <Tables.Td>
                                                {permissions.includes(
                                                    "edit_slider"
                                                ) && (
                                                    <Tooltip
                                                        title={`Edit ${item.judul}`}
                                                    >
                                                        <Link
                                                            href={route(
                                                                "admin.edit-management-profile-perusahaan",
                                                                item.id
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
                                                {permissions.includes(
                                                    "delete_slider"
                                                ) && (
                                                    <Tooltip
                                                        title={`Delete ${item.judul}`}
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
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
