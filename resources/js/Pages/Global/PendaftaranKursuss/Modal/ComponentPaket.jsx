import Dialogs from "@/Components/Dialogs";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { DataPaketRecoil } from "../Recoil/dataPaketRecoil";

import Tables from "@/Components/Tables";
import { Check, Refresh, Search } from "@mui/icons-material";
import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import { InputLabel, MenuItem } from "@mui/material";
import { FormDataRecoil } from "../Recoil/FormDataRecoil";
import { ModalPaketRecoil } from "../Recoil/ModalPaketRecoil";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";

export default function ComponentPaket({ kategori, paket_ref }) {
    const [dataPaket, setDataPaket] = useRecoilState(DataPaketRecoil);
    const [formData, setFormData] = useRecoilState(FormDataRecoil);
    const [modal, setModal] = useRecoilState(ModalPaketRecoil);
    const [params, setParams] = useState({
        search: "",
        kategori: "",
        sub_kategori: "",
        jenis_kursus: "",
    });
    const searchPaket = async () => {
        try {
            const response = await axios.get(route("api.get-data-paket"), {
                params: {
                    search: params.search,
                    kategori: params.kategori,
                },
            });
            console.log(response.data);

            setDataPaket(response.data);
        } catch (err) {
            console.log(err);

            setModal(false);
            alert(
                "Ups terjadi kesalahan saat melakukan pencarian data Paket, silahkan lakukan kembali"
            );
        }
    };
    const changeHandler = (e) => {
        setFormData((prev) => ({ ...prev, kategori_kursus: e.target.value }));
        setParams((prev) => ({ ...prev, kategori: e.target.value }));
    };
    const pilihHandler = (value, index = 0) => {
        setParams((prev) => ({ ...prev, kategori: "", search: "" }));

        // Harga akhir tetap pakai harga promo, tapi diskon tidak terpengaruh
        const hargaPromo = value.harga_promo ?? 0;
        const hargaAsli = value.harga ?? 0;
        const hargaAkhir = hargaAsli - hargaPromo;

        const paketLama = formData.paket[index] ?? {
            jumlah_pertemuan: 0,
            jumlah_materi: 0,
            harga: 0,
            diskont: 0,
            total_harga: 0,
        };

        const newPaket = {
            id: paketLama.id ?? null,
            kd_paket: value.kd_paket,
            nama_paket: value.nama_paket,
            jumlah_pertemuan: value.total_pertemuan,
            jumlah_materi: value.total_materi,
            harga: hargaAkhir, // yang dibayar setelah promo
            diskont: 0, // tidak terpengaruh harga_promo
            total_harga: hargaAkhir,
        };

        const newPaketList = [...formData.paket];
        newPaketList[index] = newPaket;

        const updatedData = {
            ...formData,
            paket: newPaketList,
            total_pertemuan:
                parseInt(formData.total_pertemuan || 0) -
                parseInt(paketLama.jumlah_pertemuan || 0) +
                parseInt(value.total_pertemuan),

            total_materi:
                parseInt(formData.total_materi || 0) -
                parseInt(paketLama.jumlah_materi || 0) +
                parseInt(value.total_materi),

            total_harga:
                parseInt(formData.total_harga || 0) -
                parseInt(paketLama.harga || 0) +
                hargaAkhir,

            total_netto:
                parseInt(formData.total_netto || 0) -
                parseInt(paketLama.harga || 0) +
                hargaAkhir,

            total_discount: parseInt(formData.total_discount || 0), // Tidak berubah
        };

        setFormData(updatedData);

        setTimeout(() => {
            paket_ref.current[0]?.focus();
        }, 0);

        setModal(false);
    };

    useEffect(() => {
        searchPaket();
    }, [params]);

    return (
        <>
            <Dialogs
                title={"Cari Paket Kursus"}
                open={modal}
                handleClose={() => {
                    setModal(false);
                    setDataPaket(false);
                }}
            >
                <div className="py-2 px-4 w-full min-w-[1000px]">
                    <div className="flex  items-start w-full gap-x-3 py-5">
                        <div className="w-full">
                            <InputText
                                variant="filled"
                                label="Cari Paket"
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
                                    <MenuItem value="">Pilih Kategori</MenuItem>
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

                    <Tables>
                        <thead>
                            <tr>
                                <Tables.Th className={"text-xs"}>#</Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Kode Paket
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Judul Paket
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Kategori / Sub Kategori
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Jenis Paket
                                </Tables.Th>
                                <Tables.Th className={"text-xs px-3"}>
                                    <p className="text-center w-[70px] ">
                                        Total Materi
                                    </p>
                                </Tables.Th>
                                <Tables.Th className={"text-xs px-3"}>
                                    <p className="text-center w-[70px] ">
                                        Jumlah Pertemuan
                                    </p>
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Harga
                                </Tables.Th>
                                <Tables.Th className={"text-xs"}>
                                    Aksi
                                </Tables.Th>
                            </tr>
                        </thead>
                        <Tables.Tbody>
                            {dataPaket &&
                                dataPaket.length > 0 &&
                                dataPaket.map((item, key) => (
                                    <tr key={key}>
                                        <Tables.Td>{key + 1}</Tables.Td>
                                        <Tables.Td
                                            className={"capitalize text-xs"}
                                        >
                                            {item.kd_paket}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"capitalize text-xs"}
                                        >
                                            {item.nama_paket}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"capitalize text-xs"}
                                        >
                                            {item.kategori_kursus +
                                                " / " +
                                                item.sub_kategori_kursus}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"capitalize text-xs"}
                                        >
                                            {item.jenis_kursus}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "capitalize text-xs text-center"
                                            }
                                        >
                                            {item.total_materi}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "capitalize text-xs text-center"
                                            }
                                        >
                                            {item.total_pertemuan}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={
                                                "capitalize text-xs text-center"
                                            }
                                        >
                                            {formatRupiah(
                                                item.harga - item.harga_promo
                                            )}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"capitalize text-xs"}
                                        >
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
