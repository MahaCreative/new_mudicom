import Dialogs from "@/Components/Dialogs";
import InputText from "@/Components/InputText";
import Tables from "@/Components/Tables";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { PembayaranRecoil } from "./PembayaranRecoil";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import moment from "moment";
import { router } from "@inertiajs/react";

export default function FormCreate() {
    const [dataPesanan, setDataPesanan] = useRecoilState(PembayaranRecoil);
    const [modalSearch, setModalSeacrh] = useState(true);
    const [searchTransaksi, setSearchTransaksi] = useState("");
    const [data, setData] = useState({
        kd_transaksi: "",
        total_netto: "",
        jumlah_bayar: "",
        sisa_bayar: "",
        tanggal_pembayaran_terakhir: "",
        status_pembayaran: "",
        payment: [
            {
                order_id: "",
                gross_amount: "",
                remaining_amount: "",
                payment_type: "",
                created_at: "",
                installment_number: "",
                petugas_id: "",
                petugas_name: "",
            },
        ],
    });
    const searchTransaksiHandler = async () => {
        try {
            const resposen = await axios.get(
                route("api.get-data-pendaftaran-kursus"),
                {
                    params: {
                        kd_transaksi: searchTransaksi,
                    },
                }
            );

            if (resposen.data.length == 1) {
                let dataPayment = [];
                resposen.data[0].payment.map(
                    (item, index) =>
                        (dataPayment[index] = {
                            id: item.id,
                            order_id: item.order_id,
                            gross_amount: item.gross_amount,
                            remaining_amount: item.remaining_amount,
                            payment_type: item.payment_type,
                            created_at: item.created_at,
                            installment_number: item.installment_number,
                            petugas_id: item.petugas_id,
                            petugas_name: item.petugas.name,
                        })
                );
                setData((prev) => ({
                    ...prev,
                    payment: [...dataPayment],
                    kd_transaksi: resposen.data[0].kd_transaksi,
                    total_netto: resposen.data[0].total_netto,
                    jumlah_bayar: resposen.data[0].jumlah_bayar,
                    sisa_bayar: resposen.data[0].sisa_bayar,
                    tanggal_pembayaran_terakhir:
                        resposen.data[0].tanggal_pembayaran_terakhir,
                    status_pembayaran: resposen.data[0].status_pembayaran,
                }));
                setDataPesanan(resposen.data[0]);
            }
            console.log(resposen.data);
        } catch (err) {
            alert("error" + err);
        }
    };
    const transaksiHandler = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            searchTransaksiHandler();
        }
    };
    const parseRupiah = (str) => {
        if (str === null || str === undefined) return 0;

        // Paksa jadi string, lalu bersihkan karakter selain angka
        return parseInt(String(str).replace(/[^0-9]/g, ""), 10) || 0;
    };
    const addHandler = () => {
        const updatedData = [...data.payment]; // Gunakan data.payment langsung agar konsisten
        const nextInstallment = updatedData.length + 1;

        const emptyPayment = {
            id: null,
            order_id:
                "PA-" +
                moment().format("MMYY") +
                "-" +
                String(dataPesanan.siswa_id) +
                String(dataPesanan.id) +
                String(nextInstallment),
            gross_amount: "",
            remaining_amount: "",
            payment_type: "tunai",
            created_at: moment().format("YYYY-MM-DD"), // Format tanggal lebih umum
            installment_number: nextInstallment,
            petugas_id: "",
            petugas_name: "Guntur Madjid",
        };
        const hasInvalidPayment = data.payment.some(
            (p) => parseRupiah(p.gross_amount) === 0
        );

        if (hasInvalidPayment) {
            alert(
                "Tidak boleh ada payment dengan gross_amount Rp. 0 atau kosong."
            );
        } else {
            setData({
                ...data,
                payment: [emptyPayment, ...updatedData],
            });
        }
    };
    const handleGrossAmountChange = (value, index) => {
        // Menghilangkan format Rupiah jika ada (hanya angka yang akan diambil)
        const numericValue = value.replace(/[^\d]/g, "");

        if (isNaN(numericValue) || numericValue <= 0) {
            // Jika nilai tidak valid (bukan angka atau <= 0), batalkan perubahan
            alert("Gross amount harus lebih besar dari 0.");
            return;
        }

        // Salin data payment untuk diubah
        const updatedData = [...data.payment];

        // Memastikan bahwa index yang diberikan valid
        if (index < 0 || index >= updatedData.length) {
            alert("Indeks pembayaran tidak valid.");
            return;
        }

        // Perhitungan remaining_amount berdasarkan gross_amount
        updatedData[index].gross_amount = numericValue;

        // Jika hanya satu pembayaran, remaining_amount dihitung berdasarkan total netto
        if (data.payment.length === 1) {
            updatedData[index].remaining_amount =
                dataPesanan.total_netto - parseInt(numericValue);
        } else {
            // Untuk pembayaran lainnya, remaining_amount dihitung berdasarkan pembayaran berikutnya
            if (index + 1 < updatedData.length) {
                updatedData[index].remaining_amount =
                    updatedData[index + 1].remaining_amount -
                    parseInt(numericValue);
            } else {
                updatedData[index].remaining_amount =
                    dataPesanan.total_netto - parseInt(numericValue);
            }
        }

        // Pastikan remaining_amount tidak bernilai negatif
        if (updatedData[index].remaining_amount < 0) {
            alert("Remaining amount tidak boleh kurang dari 0.");
            return; // Batalkan perubahan jika remaining_amount negatif
        }

        // Update state dengan data pembayaran yang sudah diperbarui jika valid
        setData({
            ...data,
            payment: updatedData,
        });

        console.log(`Updated gross_amount for item ${index}:`, numericValue);
    };

    const simpanHandler = () => {
        router.post(route("admin.store-pembayaran-kursus"), { ...data });
    };

    return (
        <div className="w-[1200px] py-6">
            <div className="flex flex-row gap-x-3 items-center">
                <p className="font-bold tracking-tighter">
                    Cari Kode Transaksi
                </p>
                <InputText
                    value={searchTransaksi}
                    onChange={(e) => setSearchTransaksi(e.target.value)}
                    onKeyDown={transaksiHandler}
                />
            </div>
            <div className="flex justify-between items-start gap-x-3">
                <div className="py-2 w-full">
                    <h1 className="text-blue-600 font-bold">
                        Informasi Transaksi Pendaftaran Kursus
                    </h1>
                    <div className="drop-shadow-md bg-white rounded-md border border-gray-500 py-2 px-3 my-3">
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[230px] text-right">
                                Kode Transaksi :
                            </p>
                            <p>{data.kd_transaksi}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[230px] text-right">
                                Total Harga :
                            </p>
                            <p>{formatRupiah(data.total_netto)}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[230px] text-right">
                                Jumlah Pembayaran Masuk :
                            </p>
                            <p>{formatRupiah(data.jumlah_bayar)}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[230px] text-right">
                                Sisa Pembayaran :
                            </p>
                            <p>{formatRupiah(data.sisa_bayar)}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[230px] text-right">
                                Tanggal Pembayaran Terakhir :
                            </p>
                            {dataPesanan && (
                                <p>
                                    {moment(
                                        data.tanggal_pembayaran_terakhir
                                    ).format("DD-MMMM-YYYY")}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[230px] text-right">
                                Status Pembayaran :
                            </p>
                            <p>{data.status_pembayaran}</p>
                        </div>
                    </div>
                </div>
                <div className="py-2 w-full">
                    <h1 className="text-blue-600 font-bold">
                        Informasi Pemesan Pendaftaran Kursus
                    </h1>
                    <div className="drop-shadow-md bg-white rounded-md border border-gray-500 py-2 px-3 my-3">
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[170px] text-right">Kode Siswa:</p>
                            <p>{dataPesanan?.siswa.kd_siswa}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[170px] text-right">
                                Nama Lengkap :
                            </p>
                            <p>{dataPesanan?.siswa.nama_lengkap}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[170px] text-right line-clamp-1">
                                Alamat :
                            </p>
                            <p>{dataPesanan?.siswa.alamat}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[170px] text-right">Telp:</p>
                            <p>{dataPesanan?.siswa.telp}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-1 w-full min-h-[200px]  max-h-[300px] overflow-x-auto overflow-y-auto">
                {data.payment[0].remaining_amount !== 0 && (
                    <button
                        onClick={() => addHandler()}
                        className="py-2 px-3 rounded-md bg-blue-500 font-bold text-white my-1"
                    >
                        Tambah Pembayaran
                    </button>
                )}
                <button
                    onClick={() => simpanHandler()}
                    className="py-2 px-3 rounded-md bg-green-500 font-bold text-white my-1"
                >
                    Simpan Pembayaran
                </button>
                <Tables>
                    <thead className="w-full">
                        <Tables.Th className={"text-xs"}>
                            Kode Transaksi
                        </Tables.Th>
                        <Tables.Th className={"text-xs"}>
                            Jumlah Pembayaran
                        </Tables.Th>
                        <Tables.Th className={"text-xs"}>
                            Sisa Pembayaran
                        </Tables.Th>
                        <Tables.Th className={"text-xs"}>
                            Payment Type
                        </Tables.Th>

                        <Tables.Th className={"text-xs"}>
                            Tanggal Pembayaran
                        </Tables.Th>

                        <Tables.Th className={"text-xs"}>
                            Pembayaran Ke
                        </Tables.Th>
                        <Tables.Th className={"text-xs"}>Proses By</Tables.Th>

                        <Tables.Th className={"text-xs"}>Aksi</Tables.Th>
                    </thead>
                    <Tables.Tbody>
                        {data &&
                            data.payment.map((item, key) => (
                                <tr key={key}>
                                    <Tables.Td className={"text-xs"}>
                                        {item.order_id}
                                    </Tables.Td>
                                    <Tables.Td className={"text-xs"}>
                                        <InputText
                                            value={formatRupiah(
                                                item.gross_amount
                                            )}
                                            onChange={(e) =>
                                                handleGrossAmountChange(
                                                    e.target.value,
                                                    key
                                                )
                                            }
                                        />
                                    </Tables.Td>
                                    <Tables.Td className={"text-xs"}>
                                        <InputText
                                            disabled
                                            value={formatRupiah(
                                                item.remaining_amount
                                            )}
                                        />
                                    </Tables.Td>
                                    <Tables.Td className={"text-xs"}>
                                        {item.payment_type}
                                    </Tables.Td>
                                    <Tables.Td className={"text-xs"}>
                                        <InputText
                                            type="date"
                                            value={moment(
                                                item.created_at
                                            ).format("YYYY-MM-DD")}
                                        />
                                    </Tables.Td>
                                    <Tables.Td className={"text-xs"}>
                                        {item.installment_number}
                                    </Tables.Td>
                                    <Tables.Td className={"text-xs"}>
                                        {item.petugas_name}
                                    </Tables.Td>
                                </tr>
                            ))}
                    </Tables.Tbody>
                </Tables>
            </div>
        </div>
    );
}
