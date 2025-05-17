import Tables from "@/Components/Tables";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import moment from "moment";
import React, { useEffect } from "react";

export default function Invoice({ payment, siswa, detail, pendaftaran }) {
    function terbilangRupiah(angka) {
        const angkaStr = angka.toString().replace(/[^0-9]/g, "");
        const satuan = [
            "",
            "satu",
            "dua",
            "tiga",
            "empat",
            "lima",
            "enam",
            "tujuh",
            "delapan",
            "sembilan",
            "sepuluh",
            "sebelas",
        ];

        function konversi(nilai) {
            nilai = parseInt(nilai);
            if (nilai < 12) return satuan[nilai];
            if (nilai < 20) return konversi(nilai - 10) + " belas";
            if (nilai < 100)
                return (
                    konversi(Math.floor(nilai / 10)) +
                    " puluh " +
                    konversi(nilai % 10)
                );
            if (nilai < 200) return "seratus " + konversi(nilai - 100);
            if (nilai < 1000)
                return (
                    konversi(Math.floor(nilai / 100)) +
                    " ratus " +
                    konversi(nilai % 100)
                );
            if (nilai < 2000) return "seribu " + konversi(nilai - 1000);
            if (nilai < 1000000)
                return (
                    konversi(Math.floor(nilai / 1000)) +
                    " ribu " +
                    konversi(nilai % 1000)
                );
            if (nilai < 1000000000)
                return (
                    konversi(Math.floor(nilai / 1000000)) +
                    " juta " +
                    konversi(nilai % 1000000)
                );
            if (nilai < 1000000000000)
                return (
                    konversi(Math.floor(nilai / 1000000000)) +
                    " miliar " +
                    konversi(nilai % 1000000000)
                );
            if (nilai < 1000000000000000)
                return (
                    konversi(Math.floor(nilai / 1000000000000)) +
                    " triliun " +
                    konversi(nilai % 1000000000000)
                );
            return "Angka terlalu besar";
        }

        return angka === 0
            ? "nol rupiah"
            : konversi(angka).replace(/\s+/g, " ").trim() + " rupiah";
    }
    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 1000); // beri jeda untuk memastikan halaman sudah siap
    }, []);

    return (
        <div className="w-full min-h-screen bg-white py-10 px-4 flex justify-center items-start">
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-md p-3 border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
                    <img
                        src="/Image/logo.png"
                        alt="Logo"
                        className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="text-center flex-1">
                        <h1 className="text-3xl font-extrabold text-blue-900 tracking-wide">
                            MUDICOM
                        </h1>
                        <p className="text-sm italic text-gray-600 max-w-lg mx-auto mt-2">
                            Pusat Kursus Komputer dan Teknologi Masa Kini
                        </p>
                    </div>
                </div>

                {/* Invoice Title & Date */}
                <div className="text-right mb-8">
                    <h2 className="text-2xl font-bold text-blue-900 uppercase">
                        Invoice Pembayaran
                    </h2>
                    <p className="text-gray-700 mt-2">
                        Nomor Invoice:{" "}
                        <span className="font-medium">{payment.order_id}</span>
                    </p>
                    <p className="text-gray-700">
                        Tanggal:{" "}
                        <span className="font-medium">
                            {moment().format("DD MMMM YYYY")}
                        </span>
                    </p>
                </div>

                {/* Customer and Order Info */}
                <div className="grid grid-cols-2 gap-6 mb-5 text-sm">
                    <div>
                        <h3 className="font-bold text-blue-800 mb-2">
                            Diterbitkan Untuk
                        </h3>
                        <ul className="space-y-1">
                            <li>
                                <strong>Nama:</strong> {siswa.nama_lengkap}
                            </li>
                            <li>
                                <strong>Alamat:</strong> {siswa.alamat}
                            </li>
                            <li>
                                <strong>No. Telepon:</strong> {siswa.telp}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-blue-800 mb-2">
                            Rincian Pemesanan
                        </h3>
                        <ul className="space-y-1">
                            <li>
                                <strong>Tanggal:</strong>{" "}
                                {moment(pendaftaran.created_at).format(
                                    "DD MMMM YYYY"
                                )}
                            </li>
                            <li>
                                <strong>Jumlah Paket:</strong> {detail.length}{" "}
                                Paket
                            </li>
                            <li>
                                <strong>Total Pembayaran:</strong>{" "}
                                {formatRupiah(pendaftaran.total_netto)}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Table of Packages */}
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                    Rincian Paket Kursus
                </h3>
                <div className="overflow-x-auto border border-gray-300 rounded-md">
                    <Tables>
                        <thead className="bg-blue-100 text-blue-800">
                            <tr>
                                <Tables.Th className="text-xs">#</Tables.Th>
                                <Tables.Th className="text-xs">Kode</Tables.Th>
                                <Tables.Th className="text-xs">Nama</Tables.Th>
                                <Tables.Th className="text-xs">
                                    Pertemuan
                                </Tables.Th>
                                <Tables.Th className="text-xs">Harga</Tables.Th>
                                <Tables.Th className="text-xs">
                                    Diskon
                                </Tables.Th>
                                <Tables.Th className="text-xs">Total</Tables.Th>
                            </tr>
                        </thead>
                        <Tables.Tbody>
                            {detail.map((item, index) => {
                                const hargaSetelahDiskon =
                                    item.harga -
                                    (item.harga * item.diskont) / 100;
                                return (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50"
                                    >
                                        <Tables.Td className="text-sm">
                                            {index + 1}
                                        </Tables.Td>
                                        <Tables.Td className="text-sm capitalize">
                                            {item.paket.kd_paket}
                                        </Tables.Td>
                                        <Tables.Td className="text-sm capitalize">
                                            {item.paket.nama_paket}
                                        </Tables.Td>
                                        <Tables.Td className="text-sm">
                                            {item.paket.total_pertemuan}x /{" "}
                                            {item.paket.total_materi} Materi
                                        </Tables.Td>
                                        <Tables.Td className="text-sm">
                                            {formatRupiah(item.harga)}
                                        </Tables.Td>
                                        <Tables.Td className="text-sm">
                                            {item.diskont}%
                                        </Tables.Td>
                                        <Tables.Td className="text-sm">
                                            {formatRupiah(hargaSetelahDiskon)}
                                        </Tables.Td>
                                    </tr>
                                );
                            })}

                            <tr className="bg-gray-100 font-semibold text-sm">
                                <Tables.Td colspan={4} className="text-right">
                                    Grand Total
                                </Tables.Td>
                                <Tables.Td colspan={3}>
                                    {formatRupiah(pendaftaran.total_netto)}
                                </Tables.Td>
                            </tr>
                            <tr className="bg-gray-100 font-semibold text-sm">
                                <Tables.Td colspan={4} className="text-right">
                                    Jumlah Dibayar
                                </Tables.Td>
                                <Tables.Td colspan={3}>
                                    {formatRupiah(payment.gross_amount)}
                                </Tables.Td>
                            </tr>
                            <tr className="bg-gray-100 font-semibold text-sm">
                                <Tables.Td colspan={4} className="text-right">
                                    Terbilang
                                </Tables.Td>
                                <Tables.Td colspan={3} className="capitalize">
                                    {terbilangRupiah(payment.gross_amount)}
                                </Tables.Td>
                            </tr>
                            <tr className="bg-gray-100 font-semibold text-sm">
                                <Tables.Td colspan={4} className="text-right">
                                    Sisa Pembayaran
                                </Tables.Td>
                                <Tables.Td colspan={3}>
                                    {formatRupiah(payment.remaining_amount)}
                                </Tables.Td>
                            </tr>
                        </Tables.Tbody>
                    </Tables>
                </div>

                {/* Footer */}
                <div className="mt-2 text-center text-xs text-gray-500 italic">
                    Terima kasih atas pembayaran Anda. Jika ada pertanyaan,
                    silakan hubungi kami.
                </div>
            </div>
        </div>
    );
}
