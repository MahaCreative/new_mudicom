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

export default function ComponentInstruktur({ kategori }) {
    const [dataInstruktur, setDataInstruktur] =
        useRecoilState(InstrukturRecoil);
    const [formData, setFormData] = useRecoilState(FormDataRecoil);
    const [modal, setModal] = useRecoilState(ModalInstrukturRecoil);
    const [params, setParams] = useState({ search: "", kategori: "" });
    const searchInstruktur = async () => {
        console.log(params);

        try {
            const response = await axios.get(route("api.data-instruktur"), {
                params: {
                    search: params.search,
                    kategori: params.kategori,
                },
            });

            setDataInstruktur(response.data);
        } catch (err) {
            setShowModalInstruktur(false);
            alert(
                "Ups terjadi kesalahan saat melakukan pencarian data instruktur, silahkan lakukan kembali"
            );
        }
    };
    const changeHandler = (e) => {
        setFormData((prev) => ({ ...prev, kategori_kursus: e.target.value }));
        setParams((prev) => ({ ...prev, kategori: e.target.value }));
    };
    const pilihHandler = (value) => {
        setParams((prev) => ({ ...prev, kategori: "", search: "" }));
        const updateData = [...formData.paket];
        const newData = {
            nama_instruktur: value.nama_lengkap,
            kd_instruktur: value.kd_instruktur,
        };
        updateData[formData.index_form] = {
            ...updateData[formData.index_form],
            ...newData,
        };
        setFormData((prev) => ({
            ...prev,

            paket: updateData,
        }));

        setModal(false);
    };
    useEffect(() => {
        searchInstruktur();
    }, []);
    return (
        <>
            <Dialogs
                title={"Cari Instruktur"}
                open={modal}
                handleClose={() => {
                    setModal(false);
                    setDataInstruktur(false);
                }}
            >
                <div className="py-6 px-4 w-full min-w-[1000px]">
                    <div className="flex py-3 items-start w-full gap-x-3">
                        <div className="w-full">
                            <div className="w-full">
                                <InputText
                                    variant="filled"
                                    label="Cari Instruktur"
                                    value={params.search}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            search: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    id="kategori_kursus"
                                    name="kategori_kursus"
                                    className="w-[140px] text-left"
                                >
                                    Kategori Kursus
                                </InputLabel>
                                <div className="w-full">
                                    <SelectOption
                                        size="small"
                                        name="kategori"
                                        id="kategori"
                                        value={params.kategori}
                                        onChange={changeHandler}
                                    >
                                        <MenuItem value="">
                                            Pilih Kategori
                                        </MenuItem>
                                        {kategori.map((item, key) => (
                                            <MenuItem
                                                value={item.nama_kategori}
                                                key={key}
                                            >
                                                {item.nama_kategori}
                                            </MenuItem>
                                        ))}
                                    </SelectOption>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-3">
                            <button
                                onClick={() => searchInstruktur()}
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
                                <Tables.Th>Kode Instruktur</Tables.Th>
                                <Tables.Th>Nik Instruktur</Tables.Th>
                                <Tables.Th>Nama Instruktur</Tables.Th>
                                <Tables.Th>Telp / HP</Tables.Th>
                                <Tables.Th>Aksi</Tables.Th>
                            </tr>
                        </thead>
                        <Tables.Tbody>
                            {dataInstruktur &&
                                dataInstruktur.length > 0 &&
                                dataInstruktur.map((item, key) => (
                                    <tr key={key}>
                                        <Tables.Td>{key + 1}</Tables.Td>
                                        <Tables.Td className={"capitalize"}>
                                            {item.kd_instruktur}
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
