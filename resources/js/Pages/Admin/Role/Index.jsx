import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState, useEffect } from "react";

import { router } from "@inertiajs/react";
import ResponseAlert from "@/Hook/ResponseAlert";

export default function Index(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const permission = props.permission;
    const role = props.role;

    const [namaRole, setNamaRole] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [editingId, setEditingId] = useState(null); // null untuk create, id untuk edit
    const [errors, setErrors] = useState([]);
    // Handle input role name
    const handleInputChange = (e) => {
        setNamaRole(e.target.value);
    };

    // Handle checkbox select
    const handlePermissionChange = (value) => {
        if (selectedPermissions.includes(value)) {
            setSelectedPermissions(
                selectedPermissions.filter((v) => v !== value)
            );
        } else {
            setSelectedPermissions([...selectedPermissions, value]);
        }
    };

    // Simpan atau update role
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: namaRole,
            permissions: selectedPermissions,
        };

        try {
            if (editingId) {
                // Update
                router.put(
                    route("auth.update-role-permission", editingId),
                    payload,
                    {
                        onSuccess: () => {
                            showResponse(
                                "success",
                                "Berhasil",
                                "Berhasil mengupdate role"
                            );
                            setNamaRole("");
                            setSelectedPermissions([]);
                            setEditingId(null);
                            setErrors([]);
                        },
                        onError: (err) => {
                            showResponse(
                                "error",
                                "Gagal mengupdate role",
                                "Terdapat kesalahan saat mengedit, silahkan periksa isian anda kembali"
                            );

                            setErrors(err);
                        },
                    }
                );
            } else {
                // Create
                router.post(route("auth.create-role-permission"), payload, {
                    onSuccess: () => {
                        showResponse(
                            "success",
                            "Berhasil",
                            "Berhasil menambahkan role baru"
                        );
                        setNamaRole("");
                        setSelectedPermissions([]);
                        setEditingId(null);
                        setErrors([]);
                    },
                    onError: (err) => {
                        showResponse(
                            "error",
                            "Gagal",
                            "Terdapat kesalahan saat mengedit, silahkan periksa isian anda kembali"
                        );

                        setErrors(err);
                    },
                });
            }

            // Reset form
        } catch (error) {
            showResponse("error", "Gagal", error);
        }
    };

    const editKategori = (item) => {
        setNamaRole(item.name);
        setSelectedPermissions(item.permissions.map((p) => p.name));
        setEditingId(item.id);
    };

    const deleteKategori = async (id) => {
        ResponseMethode(
            "warning",
            "Warning",
            "Yakin ingin menghapus role ini",
            () => {
                router.delete(route("auth.delete-role-permission", id), {
                    onSuccess: () =>
                        showResponse(
                            "success",
                            "Berhasil",
                            "Berhasil menghapus 1 data dalam databsae"
                        ),
                });
            }
        );
    };

    return (
        <div className="px-4 md:px-8 lg:px-16 flex flexcol md:flex-row gap-5">
            <form
                onSubmit={handleSubmit}
                className="w-full bg-white py-3 px-4 rounded-md border border-primary"
            >
                <p className=" font-bold text-primary">User Role</p>
                <p className="my-6 font-light">
                    Silahkan menambahkan permission, pada role user yang telah
                    dibuat, fungsi permission akan membatasi apapun yang bisa
                    dilakukan oleh user
                </p>
                <InputText
                    errors={errors?.name}
                    label={"Nama Role"}
                    value={namaRole}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="bg-primary py-3 px-4 text-white mr-1.5 my-6 rounded-md hover:bg-blue-800"
                >
                    Simpan
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setNamaRole("");
                        setSelectedPermissions([]);
                        setEditingId(null);
                    }}
                    className="bg-red-500 py-3 px-4 text-white ml-1.5 my-6 rounded-md hover:bg-red-800"
                >
                    Cancell
                </button>

                <div className="py-6">
                    <Tables>
                        <thead>
                            <Tables.Th className={"text-xs"}>#</Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Nama Role
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>
                                Permission
                            </Tables.Th>
                            <Tables.Th className={"text-xs"}>Aksi</Tables.Th>
                        </thead>
                        <Tables.Tbody>
                            {role.map((item, key) => (
                                <tr key={key}>
                                    <Tables.Td className={"text-xs"}>
                                        {key + 1}
                                    </Tables.Td>
                                    <Tables.Td className={"text-xs capitalize"}>
                                        {item.name}
                                    </Tables.Td>
                                    <Tables.Td
                                        className={
                                            "text-xs capitalize flex flex-wrap gap-2"
                                        }
                                    >
                                        {(item.name !== "super admin" ||
                                            item.name == "instruktur") &&
                                            item.permissions.map(
                                                (data, index) =>
                                                    index <= 3 && (
                                                        <p
                                                            key={index}
                                                            className="text-xs bg-gray-100 py-1 px-2 rounded-md inline"
                                                        >
                                                            {data.name}
                                                        </p>
                                                    )
                                            )}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.name !== "super admin" && (
                                            <>
                                                {item.name !== "siswa" && (
                                                    <>
                                                        {item.name !==
                                                            "instruktur" && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    editKategori(
                                                                        item
                                                                    )
                                                                }
                                                                className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                            >
                                                                Edit
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                        {item.name !== "super admin" && (
                                            <>
                                                {item.name !== "siswa" && (
                                                    <>
                                                        {item.name !==
                                                            "instruktur" && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteKategori(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </Tables.Td>
                                </tr>
                            ))}
                        </Tables.Tbody>
                    </Tables>
                </div>
            </form>

            <div className="w-full bg-white py-3 px-4 rounded-md border border-primary ">
                <p className=" font-bold text-primary">User Permission</p>
                <p className="my-6 font-light">
                    Silahkan menambahkan permission, pada role user yang telah
                    dibuat, fungsi permission akan membatasi apapun yang bisa
                    dilakukan oleh user
                </p>
                {errors?.permissions && (
                    <p className="bg-red-500 text-white capitalize py-2 px-3 rounded-md">
                        {errors?.permissions}
                    </p>
                )}
                <div className="flex gap-x-2 flex-wrap">
                    {permission.map((item, key) => (
                        <FormControlLabel
                            key={key}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                            className="text-xs"
                            control={
                                <Checkbox
                                    checked={selectedPermissions.includes(item)}
                                    onChange={() =>
                                        handlePermissionChange(item)
                                    }
                                />
                            }
                            label={item}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
