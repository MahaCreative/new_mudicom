import Dialogs from "@/Components/Dialogs";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { InstrukturRecoil } from "../Recoil/DataInstrukturRecoil";
import { ModalInstrukturRecoil } from "../Recoil/ModalInstrukturRecoil";
import Tables from "@/Components/Tables";
import { Check, Checklist, Refresh, Search } from "@mui/icons-material";
import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import { InputLabel, MenuItem } from "@mui/material";
import { FormDataRecoil } from "../Recoil/FormDataRecoil";
import { DataSiswaRecoil } from "../Recoil/DataSiswaRecoil";
import { ModalSiswaRecoil } from "../Recoil/ModalSiswaRecoil";
import { router } from "@inertiajs/react";

export default function ComponentSiswa() {
    const [dataSiswa, setDataSiswa] = useRecoilState(DataSiswaRecoil);
    const [formData, setFormData] = useRecoilState(FormDataRecoil);
    const [modal, setModal] = useRecoilState(ModalSiswaRecoil);
    const [params, setParams] = useState({ search: "" });
    const searchSiswa = async () => {
        try {
            const response = await axios.get(route("api.get-data-siswa"), {
                params: {
                    search: params.search,
                },
            });

            setDataSiswa(response.data);
        } catch (err) {
            setModal(false);
            alert(
                "Ups terjadi kesalahan saat melakukan pencarian data siswa, silahkan lakukan kembali"
            );
        }
    };

    const pilihHandler = (value) => {
        setParams((prev) => ({ ...prev, search: "" }));
        setFormData((prev) => ({
            ...prev,
            siswa: value.kd_siswa,
            nama_siswa: value.nama_lengkap,
            kd_siswa: value.kd_siswa,
            nik_siswa: value.nik_ktp,
            telp_siswa: value.telp,
            alamat_siswa: value.alamat,
        }));
        setModal(false);
    };
    useEffect(() => {
        searchSiswa();
    }, []);
    return (
        <>
            <Dialogs
                title={"Cari Siswa"}
                open={modal}
                handleClose={() => {
                    setModal(false);
                    setDataSiswa();
                }}
            >
                <div className="py-6 px-4 w-full min-w-[1000px]">
                    <div className="flex py-3 items-start w-full gap-x-3">
                        <div className="w-full">
                            <div className="w-full">
                                <InputText
                                    variant="filled"
                                    label="Cari Siswa"
                                    value={params.search}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            search: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-3">
                            <button
                                onClick={() => searchSiswa()}
                                className="bg-blue-500 py-4 h-full px-4 rounded-md text-white tracking-tight flex items-center gap-x-1 leading-3"
                            >
                                <Search color="inherit" fontSize="inherit" />
                            </button>
                            <button className="bg-orange-500 py-4 h-full px-4 rounded-md text-white tracking-tight flex items-center gap-x-1 leading-3">
                                <Refresh color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                    </div>
                    <Tables>
                        <thead>
                            <tr>
                                <Tables.Th>#</Tables.Th>
                                <Tables.Th>Kode Siswa</Tables.Th>
                                <Tables.Th>Nik Siswa</Tables.Th>
                                <Tables.Th>Nama Siswa</Tables.Th>
                                <Tables.Th>Telp / HP</Tables.Th>
                                <Tables.Th>Aksi</Tables.Th>
                            </tr>
                        </thead>
                        <Tables.Tbody>
                            {dataSiswa &&
                                dataSiswa.length > 0 &&
                                dataSiswa.map((item, key) => (
                                    <tr key={key}>
                                        <Tables.Td>{key + 1}</Tables.Td>
                                        <Tables.Td className={"capitalize"}>
                                            {item.kd_siswa}
                                        </Tables.Td>
                                        <Tables.Td className={"capitalize"}>
                                            {item.nik_ktp}
                                        </Tables.Td>
                                        <Tables.Td className={"capitalize"}>
                                            {item.nama_lengkap}
                                        </Tables.Td>
                                        <Tables.Td className={"capitalize"}>
                                            {item.telp}
                                        </Tables.Td>
                                        <Tables.Td className={"capitalize"}>
                                            <button
                                                onClick={() =>
                                                    pilihHandler(item)
                                                }
                                                className="bg-blue-500 py-2 px-2 rounded-md text-white tracking-tight flex items-center gap-x-1 leading-3"
                                            >
                                                <Check
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                                <p>Pilih</p>
                                            </button>
                                        </Tables.Td>
                                    </tr>
                                ))}
                        </Tables.Tbody>
                    </Tables>
                </div>
            </Dialogs>
        </>
    );
}
