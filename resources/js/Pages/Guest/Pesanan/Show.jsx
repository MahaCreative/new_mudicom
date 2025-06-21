import Profile from "@/Components/Guest/Profile";
import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Link } from "@inertiajs/react";
import { Print } from "@mui/icons-material";
import { InputLabel } from "@mui/material";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";

export default function Show(props) {
    const pendaftaran = props.pesanan;
    const siswa = props.siswa;
    const detail = props.detail;
    const payment = props.payment;
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");

    const info = payment.payment_info || {};

    // Timer countdown
    useEffect(() => {
        if (!info.expiry_time) return;

        const expire = moment
            .tz(info.expiry_time, "Asia/Jakarta")
            .toDate()
            .getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = expire - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft("00:00");
            } else {
                const m = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                const s = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(
                    `${String(m).padStart(2, "0")}:${String(s).padStart(
                        2,
                        "0"
                    )}`
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [info.expiry_time]);

    console.log(payment);

    return (
        <Profile>
            <div className="py-6 px-4 md:px-8 w-full max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* LEFT: Payment Info */}
                    {payment.status !== "cancell" &&
                        payment.status !== "settlement" && (
                            <div className="md:w-1/2 bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-blue-800 mb-2">
                                    Pembayaran
                                </h2>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Selesaikan pembayaran sebelum waktu habis.
                                </p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between font-medium">
                                        <span>Total Bayar:</span>
                                        <span className="text-green-600 font-bold text-lg">
                                            {formatRupiah(payment.gross_amount)}
                                        </span>
                                    </div>

                                    {info.expiry_time && (
                                        <>
                                            <div className="flex justify-between">
                                                <span>Batas Waktu:</span>
                                                <span className="text-red-500 font-medium">
                                                    {moment(
                                                        info.expiry_time
                                                    ).format(
                                                        "DD MMM YYYY HH:mm"
                                                    )}
                                                </span>
                                            </div>
                                            <div className="text-center text-sm text-orange-600 font-medium">
                                                Sisa waktu: {timeLeft}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Bank Transfer */}
                                {info.bank && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                                            Metode: Bank Transfer (
                                            {info.bank.bank.toUpperCase()})
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Gunakan nomor virtual account
                                            berikut untuk menyelesaikan
                                            pembayaran:
                                        </p>
                                        <div className="bg-gray-100 px-4 py-3 rounded-md font-mono text-lg tracking-widest text-center text-blue-600 mt-2">
                                            {info.bank.va_number}
                                        </div>
                                    </div>
                                )}

                                {/* Convenience Store */}
                                {info.cstore && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                                            Metode: Convenience Store (
                                            {info.cstore.store.toUpperCase()})
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Tunjukkan kode berikut ke kasir:
                                        </p>
                                        <div className="bg-gray-100 px-4 py-3 rounded-md font-mono text-lg tracking-widest text-center text-blue-600 mt-2">
                                            {info.cstore.payment_code}
                                        </div>
                                    </div>
                                )}

                                {/* QRIS / GoPay */}
                                {info.qr_code && (
                                    <div className="mt-6 text-center">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                                            Metode: QR Code (QRIS / GoPay /
                                            e-Wallet)
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Scan kode QR berikut menggunakan
                                            aplikasi pembayaran seperti GoPay
                                            atau ShopeePay:
                                        </p>
                                        <img
                                            src={info.qr_code}
                                            alt="QR Code Pembayaran"
                                            className="w-44 h-44 mx-auto border rounded-md shadow mt-2"
                                        />
                                    </div>
                                )}

                                {/* Manual Transfer */}
                                {payment.payment_type === "manual_transfer" && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                                            Metode: Transfer Manual
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Silakan transfer ke rekening
                                            berikut:
                                        </p>
                                        <div className="bg-gray-100 rounded-md p-3 space-y-1 mt-2">
                                            <div>
                                                <strong>Bank:</strong>{" "}
                                                {info.rekening}
                                            </div>
                                            <div>
                                                <strong>Atas Nama:</strong>{" "}
                                                {info.nama}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-x-3">
                                    <Link
                                        as="button"
                                        href={route(
                                            "siswa.cancell-pesanan-kursus",
                                            payment.order_id
                                        )}
                                        method="delete"
                                        className="w-full text-white bg-red-500 font-bold  my-4 py-2 px-4 rounded-full"
                                    >
                                        Batalkan Pesanan
                                    </Link>
                                    <button className="w-full text-white bg-primary font-bold  my-4 py-2 px-4 rounded-full">
                                        Check Status Pembayaran
                                    </button>
                                </div>
                            </div>
                        )}

                    {/* RIGHT: Transaction Details */}
                    <div className=" w-full bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-blue-800 mb-4">
                            Detail Transaksi
                        </h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    No Transaksi
                                </span>
                                <span className="font-medium">
                                    {pendaftaran.kd_transaksi}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal</span>
                                <span className="font-medium">
                                    {moment(pendaftaran.created_at).format(
                                        "DD MMMM YYYY"
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Status Pesanan
                                </span>
                                <span className="text-green-600 font-semibold">
                                    {pendaftaran.status_pesanan}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Status Pembayaran
                                </span>
                                <span className="text-green-600 font-semibold">
                                    {pendaftaran.status_pembayaran}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-blue-600 font-bold mb-2">
                                Rincian Pesanan
                            </h3>
                            <div className="max-h-[250px] overflow-y-auto">
                                <table className="w-full text-sm border">
                                    <thead className="bg-gray-100 text-gray-600">
                                        <tr>
                                            <th className="p-2">Paket</th>
                                            <th className="p-2">Pertemuan</th>
                                            <th className="p-2">Harga</th>
                                            <th className="p-2">Diskon</th>
                                            <th className="p-2">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detail.map((item, i) => (
                                            <tr
                                                key={i}
                                                className="text-center border-t"
                                            >
                                                <td className="p-2">
                                                    {item.paket.nama_paket}
                                                </td>
                                                <td className="p-2">
                                                    {item.paket.total_pertemuan}
                                                    x /{" "}
                                                    {item.paket.total_materi}{" "}
                                                    materi
                                                </td>
                                                <td className="p-2">
                                                    {formatRupiah(item.harga)}
                                                </td>
                                                <td className="p-2">
                                                    {item.diskont}%
                                                </td>
                                                <td className="p-2">
                                                    {formatRupiah(
                                                        item.harga -
                                                            (item.harga *
                                                                item.diskont) /
                                                                100
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="font-bold text-right bg-gray-50">
                                            <td colSpan={4} className="p-2">
                                                Total Harga
                                            </td>
                                            <td className="p-2">
                                                {formatRupiah(
                                                    pendaftaran.total_harga
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="font-bold text-right">
                                            <td colSpan={4} className="p-2">
                                                PPN (11%)
                                            </td>
                                            <td className="p-2">
                                                {formatRupiah(pendaftaran.ppn)}
                                            </td>
                                        </tr>
                                        <tr className="font-bold text-right bg-gray-100 text-blue-800">
                                            <td colSpan={4} className="p-2">
                                                Total Bayar
                                            </td>
                                            <td className="p-2">
                                                {formatRupiah(
                                                    pendaftaran.total_netto
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Profile>
    );
}

Show.layout = (page) => <GuestLayout children={page} />;
