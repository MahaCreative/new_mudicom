import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import useRealtimeJam from "@/Hook/RealtimeJam";
import AuthLayout from "@/Layouts/AuthLayout";
import { router, useForm } from "@inertiajs/react";
import {
    Add,
    CreateNewFolder,
    Delete,
    Print,
    Refresh,
    Save,
    Search,
} from "@mui/icons-material";
import { Badge, InputLabel, MenuItem, Tooltip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import ComponentInstruktur from "./Modal/ComponentInstruktur";
import ComponentSiswa from "./Modal/ComponentSiswa";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import useSweetAlertFunction from "@/Hook/UseSweetAlertFunction";
import ComponentPaket from "./Modal/ComponentPaket";
import ComponentPembayaran from "./Modal/ComponentPembayaran";

export default function Show(props) {
    const kd_paket_ref = useRef([]);
    const pendaftaran = props.pendaftaran;
    const payment = props.payment;
    const siswa = props.siswa;
    const kategori = props.kategori;
    const detail = props.detail;
    const kd_transaksi = props.kd_transaksi;

    return (
        <div>
            <div className="py-2 px-8 w-full">
                <div className="py-2 px-4 my-3 bg-white rounded-md drop-shadow-md border border-gray-300">
                    <div className="flex gap-x-3 items-start justify-between">
                        <div className="flex gap-x-3 itesm-start">
                            <div className="">
                                <h3 className="text-blue-500">
                                    Informasi Transaksi
                                </h3>
                                <div className="flex flex-col gap-y-1 ]">
                                    <div className="flex gap-x-3 items-center">
                                        <InputLabel
                                            id="no_transkasi"
                                            className="w-[200px] text-right"
                                        >
                                            No Transaksi :
                                        </InputLabel>
                                        <InputText
                                            disabled
                                            id="no_transaksi"
                                            name="no_transaksi"
                                            value={kd_transaksi}
                                        />
                                    </div>

                                    <div className="flex gap-x-3 items-center">
                                        <InputLabel
                                            id="tanggal"
                                            className="w-[200px] text-right"
                                        >
                                            Status Pembayaran :
                                        </InputLabel>
                                        <InputText
                                            disabled
                                            value={
                                                pendaftaran.status_pembayaran
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1 ]">
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="no_transkasi"
                                                className="w-[200px] text-right"
                                            >
                                                Tanggal Transaksi :
                                            </InputLabel>
                                            <InputText
                                                disabled
                                                id="no_transaksi"
                                                name="no_transaksi"
                                                value={moment(
                                                    pendaftaran.created_at
                                                ).format("DD-MMMM-YYYY")}
                                            />
                                        </div>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="tanggal"
                                                className="w-[200px] text-right"
                                            >
                                                Petugas Menangani :
                                            </InputLabel>
                                            <InputText
                                                disabled
                                                value={pendaftaran.petugas.name}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* show data instruktur dan siswa */}
                            <div>
                                {siswa && (
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
                                                value={siswa.kd_siswa}
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
                                                value={siswa.nik_ktp}
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
                                                value={siswa.nama_lengkap}
                                            />
                                        </div>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="alamat_siswa"
                                                className="w-[140px] text-right"
                                            >
                                                Alamat :
                                            </InputLabel>
                                            <InputText
                                                id="alamat_siswa"
                                                name="alamat_siswa"
                                                value={siswa.alamat}
                                                disabled
                                            />
                                        </div>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="telp_siswa"
                                                className="w-[140px] text-right"
                                            >
                                                Telp / HP :
                                            </InputLabel>
                                            <InputText
                                                id="telp_siswa"
                                                name="telp_siswa"
                                                value={siswa.telp}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="my-3 min-h-[100px] max-h-[300px] overflow-y-auto py-4">
                        <h1 className="font-bold text-xl text-blue-500">
                            Rincian Pesanan Paket Kursus
                        </h1>
                        <Tables>
                            <thead>
                                <tr>
                                    <Tables.Th className={"text-xs"}>
                                        #
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Kd Paket
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Nama Paket
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Nama Peserta
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Instruktur
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        <p className="text-center">
                                            Materi / Pertemuan
                                        </p>
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Harga
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Discount %
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Total Harga
                                    </Tables.Th>
                                </tr>
                            </thead>
                            <Tables.Tbody>
                                {detail.map((item, key) => (
                                    <tr key={key}>
                                        <Tables.Td>{key + 1}</Tables.Td>
                                        <Tables.Td>
                                            {item.paket.kd_paket}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {item.paket.nama_paket}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {siswa.nama_lengkap}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {item.instruktur.nama_lengkap}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {item.paket.total_pertemuan +
                                                " / " +
                                                item.paket.total_materi}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {formatRupiah(item.harga)}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {item.diskont + "%"}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {formatRupiah(
                                                parseInt(item.harga) -
                                                    item.harga *
                                                        (item.diskont / 100)
                                            )}
                                        </Tables.Td>
                                    </tr>
                                ))}

                                <tr>
                                    <Tables.Td
                                        colspan={7}
                                        className={
                                            "text-right font-bold text-xl"
                                        }
                                    >
                                        Total Harga
                                    </Tables.Td>
                                    <Tables.Td
                                        colspan={2}
                                        className={
                                            "text-right font-bold text-xl"
                                        }
                                    >
                                        {formatRupiah(pendaftaran.total_harga)}
                                    </Tables.Td>
                                </tr>
                                <tr>
                                    <Tables.Td
                                        colspan={7}
                                        className={
                                            "text-right font-bold text-xl"
                                        }
                                    >
                                        Total Diskon
                                    </Tables.Td>
                                    <Tables.Td
                                        colspan={2}
                                        className={
                                            "text-right font-bold text-xl"
                                        }
                                    >
                                        {pendaftaran.total_discount + "%"}
                                    </Tables.Td>
                                </tr>
                                <tr>
                                    <Tables.Td
                                        colspan={7}
                                        className={
                                            "text-right font-bold text-xl"
                                        }
                                    >
                                        Total Netto
                                    </Tables.Td>
                                    <Tables.Td
                                        colspan={2}
                                        className={
                                            "text-right font-bold text-xl"
                                        }
                                    >
                                        {formatRupiah(pendaftaran.total_netto)}
                                    </Tables.Td>
                                </tr>
                            </Tables.Tbody>
                        </Tables>
                    </div>
                    <div className="my-3 min-h-[100px] max-h-[300px] overflow-y-auto py-4">
                        <h1 className="font-bold text-xl text-blue-500">
                            Rincian Pembayaran
                        </h1>
                        <Tables>
                            <thead>
                                <tr>
                                    <Tables.Th className={"text-xs"}>
                                        #
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Order Id
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Jumlah Pembayaran
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Sisa Pembayaran
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Tanggal Pembayaran
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Payment Type
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Payment Status
                                    </Tables.Th>

                                    <Tables.Th className={"text-xs"}>
                                        Pembayaran Ke
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Petugas Proses
                                    </Tables.Th>
                                </tr>
                            </thead>
                            <Tables.Tbody>
                                {payment.map((item, key) => (
                                    <tr key={key}>
                                        <Tables.Td className={"text-xs"}>
                                            {key + 1}
                                        </Tables.Td>
                                        <Tables.Td className={"text-xs"}>
                                            {item.order_id}
                                        </Tables.Td>
                                        <Tables.Td className={"text-xs"}>
                                            {formatRupiah(item.gross_amount)}
                                        </Tables.Td>
                                        <Tables.Td className={"text-xs"}>
                                            {formatRupiah(
                                                item.remaining_amount
                                            )}
                                        </Tables.Td>
                                        <Tables.Td className={"text-xs"}>
                                            {moment(item.succeded_at).format(
                                                "DD-MMMM-YYYY"
                                            )}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"text-xs capitalize"}
                                        >
                                            {item.payment_type}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"text-xs capitalize"}
                                        >
                                            {item.status}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"text-xs capitalize"}
                                        >
                                            {item.installment_number}
                                        </Tables.Td>
                                        <Tables.Td
                                            className={"text-xs capitalize"}
                                        >
                                            {item.petugas.name}
                                        </Tables.Td>
                                    </tr>
                                ))}
                            </Tables.Tbody>
                        </Tables>
                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <AuthLayout children={page} />;
