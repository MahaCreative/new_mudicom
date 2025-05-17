import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ModalPembayaranRecoil } from "../Recoil/ModalPembayaranRecoil";
import Dialogs from "@/Components/Dialogs";
import { FormDataRecoil } from "../Recoil/FormDataRecoil";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Print, Save } from "@mui/icons-material";
import InputText from "@/Components/InputText";
import { InputLabel } from "@mui/material";
import { router } from "@inertiajs/react";
import axios from "axios";
import { ResponsePesananRecoil } from "../Recoil/ResponsePesanan";

export default function ComponentPembayaran() {
    const [modal, setModal] = useRecoilState(ModalPembayaranRecoil);
    const [formData, setFormData] = useRecoilState(FormDataRecoil);
    const [responseData, setResponseData] = useRecoilState(
        ResponsePesananRecoil
    );
    const inputRef = useRef(null);
    const handleBayarChange = (e) => {
        const totalNetto = parseInt(formData.total_netto); // Mengambil total netto dan mengonversinya menjadi integer
        let value = e.target.value.replace(/[^0-9]/g, "");
        const bayar = parseInt(value); // Mengambil nilai bayar dan mengonversinya menjadi integer
        // Pastikan nilai bayar valid
        if (!isNaN(bayar)) {
            setFormData({
                ...formData,
                bayar: bayar,
                kembali: bayar - totalNetto, // Hitung kembalian, jika bayar kurang dari total netto, kembalian = 0
            });
        } else {
            // Jika input bukan angka, jangan lakukan apa-apa atau reset kembalian
            setFormData({
                ...formData,
                bayar: 0,
                kembali: 0,
            });
        }
    };

    const submitHandler = async (value) => {
        console.log(formData);
        try {
            const response = await axios.post(
                route("admin.store-pendaftaran-kursus"),
                { ...formData }
            );

            setResponseData(response.data);
            setModal(false);
            if (value === "cetak") {
                window.open(
                    route(
                        "admin.invoice-pendaftaran-kursus",
                        response.data.pesanan.kd_transaksi
                    ),
                    "_blank"
                );
            }
        } catch (err) {
            console.log(err);

            alert("Error + ", err);
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (
        <>
            <Dialogs
                title={"Proses Pembayaran Kursus"}
                open={modal}
                handleClose={() => {
                    setModal(false);
                }}
            >
                <div className="min-w-[800px] min-h-[300px] flex flex-col justify-center px-8 gap-y-3 py-6">
                    <div className="">
                        <h1 className="text-green-500 text-xl font-extrabold">
                            Informasi Pendaftaran Kursus
                        </h1>
                        <div className="grid grid-cols-3 items-start gap-3">
                            <div className="bg-white rounded-md py-4 drop-shadow-md border-gray-200 p-3 text-lg">
                                <h1 className="text-blue-500 ">
                                    {/* show data instruktur dan siswa */}
                                    <div>
                                        {formData.nama_siswa && (
                                            <div>
                                                <h3 className="text-blue-500">
                                                    Informasi Siswa
                                                </h3>
                                                <div className="flex gap-x-3 items-center">
                                                    <InputLabel
                                                        id="kd_siswa"
                                                        className="w-[140px] text-right"
                                                    >
                                                        Kode Siswa :
                                                    </InputLabel>
                                                    <InputText
                                                        disabled
                                                        id="kd_siswa"
                                                        name="kd_siswa"
                                                        value={
                                                            formData.kd_siswa
                                                        }
                                                    />
                                                </div>
                                                <div className="flex gap-x-3 items-center">
                                                    <InputLabel
                                                        id="nik_siswa"
                                                        className="w-[140px] text-right"
                                                    >
                                                        NIK Siswa :
                                                    </InputLabel>
                                                    <InputText
                                                        disabled
                                                        id="nik_siswa"
                                                        name="nik_siswa"
                                                        value={
                                                            formData.nik_siswa
                                                        }
                                                    />
                                                </div>
                                                <div className="flex gap-x-3 items-center">
                                                    <InputLabel
                                                        id="nama_siswa"
                                                        className="w-[140px] text-right"
                                                    >
                                                        Nama Siswa :
                                                    </InputLabel>
                                                    <InputText
                                                        disabled
                                                        id="nama_siswa"
                                                        name="nama_siswa"
                                                        value={
                                                            formData.nama_siswa
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="font-bold text-3xl w-[250px]">Total :</p>
                        <div className="h-[70px] text-right flex flex-col items-center justify-center text-5xl font-extrabold w-full bg-yellow-400">
                            <p className="w-full">
                                {formatRupiah(formData.total_netto)}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="font-bold text-3xl w-[250px]">
                            Total Bayar :
                        </p>
                        <div className="h-[70px] text-right flex flex-col items-center justify-center text-5xl font-extrabold w-full bg-yellow-400">
                            <input
                                ref={inputRef}
                                value={formatRupiah(formData.bayar)}
                                onChange={(e) => handleBayarChange(e)}
                                type="text"
                                className="h-full w-full text-4xl text-right font-bold bg-green-500 border-none outline-none  focus:outline-none focus:border-none active:outline-none active:border-none ring-0"
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="font-bold text-3xl w-[250px]">
                            Kembali :
                        </p>
                        <div className="h-[70px] text-right flex flex-col items-center justify-center text-5xl font-extrabold w-full bg-blue-400">
                            <p className="w-full">
                                {formatRupiah(formData.kembali)}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-3 items-center w-full justify-end">
                        <button
                            onClick={() => submitHandler("cetak")}
                            className="py-2 px-4 bg-purple-500 text-xl text-white font-extrabold flex leading-3 items-center gap-3 rounded-md"
                        >
                            <Print color="inherit" fontSize="large" />
                            <p>{"Simpan + Cetak"}</p>
                        </button>
                        <button
                            onClick={() => submitHandler()}
                            className="py-2 px-4 bg-green-500 text-xl text-white font-extrabold flex leading-3 items-center gap-3 rounded-md"
                        >
                            <Save color="inherit" fontSize="large" />
                            <p>{"Simpan "}</p>
                        </button>
                    </div>
                </div>
            </Dialogs>
        </>
    );
}
