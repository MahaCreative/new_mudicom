import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { CheckBox } from "@mui/icons-material";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    InputLabel,
} from "@mui/material";
import React from "react";

export default function Index(props) {
    const permission = props.permission;
    const role = props.role;
    console.log(permission);

    return (
        <div className="px-4 md:px-8 lg:px-16 flex flexcol md:flex-row gap-5">
            <div className="w-full bg-white py-3 px-4 rounded-md border border-primary ">
                <p className=" font-bold text-primary">User Role</p>
                <p className="my-6 font-light">
                    Silahkan menambahkan permission, pada role user yang telah
                    dibuat, fungsi permission akan membatasi apapun yang bisa
                    dilakukan oleh user
                </p>
                <InputText label={"Nama Role"} />
                <button className="bg-primary py-3 px-4 text-white mr-1.5 my-6 rounded-md hover:bg-blue-800">
                    Simpan
                </button>
                <button className="bg-red-500 py-3 px-4 text-white ml-1.5 my-6 rounded-md hover:bg-red-800">
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
                                        {key}
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
                                                        <p className="text-xs  bg-gray-100 py-1 px-2 rounded-md inline">
                                                            {data.name}
                                                        </p>
                                                    )
                                            )}
                                    </Tables.Td>
                                    <Tables.Td>
                                        <button
                                            onClick={() => editKategori(item)}
                                            className="py-1 px-2 text-white bg-orange-500 hover:bg-orange-600 usetransisi text-xs rounded-md drop-shadow-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteKategori(item.id)
                                            }
                                            className="py-1 px-2 text-white bg-red-500 hover:bg-red-600 usetransisi text-xs rounded-md drop-shadow-md"
                                        >
                                            Delete
                                        </button>
                                    </Tables.Td>
                                </tr>
                            ))}
                        </Tables.Tbody>
                    </Tables>
                </div>
            </div>
            <div className="w-full bg-white py-3 px-4 rounded-md border border-primary ">
                <p className=" font-bold text-primary">User Permission</p>
                <p className="my-6 font-light">
                    Silahkan menambahkan permission, pada role user yang telah
                    dibuat, fungsi permission akan membatasi apapun yang bisa
                    dilakukan oleh user
                </p>
                <div className="flex gap-x-2 flex-wrap">
                    {permission.map((item, key) => (
                        <FormControlLabel
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                            className="text-xs"
                            control={<Checkbox />}
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
