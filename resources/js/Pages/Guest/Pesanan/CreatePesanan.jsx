import InputText from "@/Components/InputText";
import ResponseAlert from "@/Hook/ResponseAlert";

import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function CreatePesanan(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const paket = props.paket;
    const profile = props.profile;
    const { auth } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        kd_paket: paket.kd_paket,
        payment_type: "",
        payment_value: "",
        bank: "",
        store: "",
        aggree: false,
    });
    const paymentMethods = [
        {
            label: "Bank Transfer Permata",
            payment_type: "bank_transfer",
            bank: "permata",
            value: "permata_va",
            icons: ["permata_va.png"],
        },
        {
            label: "GoPay (via QRIS)",
            payment_type: "gopay",
            value: "gopay",
            icons: ["qris.png", "gopay.png"],
        },
        {
            label: "Bank Transfer BCA-VA",
            payment_type: "bank_transfer",
            bank: "bca",
            value: "bca_va",
            icons: ["bca_va.png"],
        },
        {
            label: "Bank BNI VA",
            payment_type: "bank_transfer",
            bank: "bni",
            value: "bni_va",
            icons: ["bni_va.png"],
        },
        {
            label: "Bank BRI VA",
            payment_type: "bank_transfer",
            bank: "bri",
            value: "bri_va",
            icons: ["bri_va.png"],
        },
        {
            label: "Alfamart",
            payment_type: "cstore",
            store: "alfamart",
            value: "alfamart",
            icons: ["alfamart_1.png"],
        },
        {
            label: "Indomaret",
            payment_type: "cstore",
            store: "indomaret",
            value: "indomaret",
            icons: ["indomaret.png"],
        },
        {
            label: "Transfer Ke Rekening Mudicom",
            payment_type: "manual_transfer",
            value: "transfer_mudicom",
            icons: ["logo.png"],
        },
    ];
    const submitHandler = () => {
        if (data.payment_type == "") {
            showResponse(
                "warning",
                "Warning",
                "Silahkan memilih metode pembayaran terlebih dahulu untuk melanjutkan pemesanan kursus"
            );
            return null;
        }
        if (data.aggree == false) {
            showResponse(
                "warning",
                "Warning",
                "Untuk melakukan pemesanan paket kursus, silahkan setujui syarat dan ketentuan yang berlaku"
            );
            return null;
        }
        ResponseMethode(
            "warning",
            "Warning",
            "Apakah anda yakin ingin memesan paket kursus " +
                paket.nama_paket +
                " Dengan metode Pembayaran " +
                data.payment_value,
            () => {
                post(route("siswa.store-pesanan-kursus"));
            },
            () => {},
            "Ya Lanjutkan Pesanan"
        );
    };

    return (
        <div>
            {/* Jumbotron */}
            <div className="bg-primary relative min-h-[600px] md:min-h-[500px] lg:min-h-[400px] w-full flex flex-col justify-center items-start px-4 md:px-8 lg:px-16 py-16">
                <div className="flex flex-col-reverse md:flex-row w-full gap-3 justify-between">
                    <div className="w-full md:w-1/2">
                        <h1 className="font-bold text-white text-6xl">
                            {paket.nama_paket}
                        </h1>
                        <h1 className="font-bold text-white text-7xl">
                            {formatRupiah(paket.harga - paket.harga_promo)}
                        </h1>
                        <p
                            className="font-light font-nunito text-white tracking-tight mt-6 line-clamp-5"
                            dangerouslySetInnerHTML={{
                                __html: paket.deskripsi,
                            }}
                        />
                    </div>
                    <img
                        src={"/storage/" + profile.thumbnail}
                        alt=""
                        className="w-full md:w-1/2  object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start px-4 md:px-8 lg:px-16 py-9">
                <div className="w-full">
                    <h1 className="font-bold text-primary text-2xl">
                        Rincian Penagihan
                    </h1>
                    <div className="py-5">
                        <div className="flex gap-3">
                            <div className="w-full">
                                <label className="block text-sm font-medium">
                                    Nama Lengkap
                                </label>
                                <InputText
                                    disabled
                                    variant="outlined"
                                    value={profile.nama_lengkap}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium">
                                    Telp (Only WhatsApp)
                                </label>
                                <InputText
                                    disabled
                                    variant="outlined"
                                    value={profile.telp}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium">
                                Email
                            </label>
                            <InputText
                                disabled
                                variant="outlined"
                                value={auth.user.email}
                            />
                        </div>
                        <div className="flex gap-3">
                            <div className="w-full">
                                <label className="block text-sm font-medium">
                                    Jenis Kelamin
                                </label>
                                <InputText
                                    disabled
                                    variant="outlined"
                                    value={profile.jenis_kelamin}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium">
                                    Tanggal Lahir
                                </label>
                                <InputText
                                    disabled
                                    variant="outlined"
                                    value={profile.tanggal_lahir}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Alamat
                            </label>
                            <InputText
                                disabled
                                variant="outlined"
                                value={profile.alamat}
                            />
                        </div>
                    </div>
                    <p>
                        Data pribadi Anda akan digunakan untuk mendukung
                        pengalaman Anda di seluruh situs web ini, selengkapnya
                        dapat dilihat pada halaman
                    </p>
                </div>
                <div className="w-full md:w-1/2 border border-primary py-5 px-6 rounded-xl">
                    <h1 className="font-bold text-primary text-2xl mb-4">
                        Pesanan Anda
                    </h1>

                    {/* Detail Paket */}
                    <div className="space-y-3">
                        {[
                            { label: "Nama Paket", value: paket.nama_paket },
                            {
                                label: "Harga Paket",
                                value: formatRupiah(paket.harga),
                            },
                            {
                                label: "Harga Promo",
                                value: formatRupiah(paket.harga_promo),
                            },
                            {
                                label: "PPN 11%",
                                value: formatRupiah(
                                    Math.ceil(
                                        (paket.harga - paket.harga_promo) * 11
                                    ) / 100
                                ),
                            },
                            {
                                label: "Total Netto",
                                value: formatRupiah(
                                    paket.harga -
                                        paket.harga_promo +
                                        Math.ceil(
                                            (paket.harga - paket.harga_promo) *
                                                11
                                        ) /
                                            100
                                ),
                            },
                            {
                                label: "Jumlah Materi",
                                value: `${paket.total_materi} Materi`,
                            },
                            {
                                label: "Jumlah Pertemuan",
                                value: `${paket.total_pertemuan}X Pertemuan`,
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="py-2 px-4 flex items-center justify-between text-sm font-medium border-b border-gray-200"
                            >
                                <span>{item.label}:</span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Opsi Pembayaran */}
                    <div className="mt-6 space-y-4">
                        {paymentMethods.map((item, i) => (
                            <label
                                key={i}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="payment_type"
                                    value={item.value}
                                    checked={data.payment_value === item.value}
                                    onChange={() =>
                                        setData({
                                            ...data,
                                            payment_type: item.payment_type,
                                            payment_value: item.value,
                                            bank: item.bank || null,
                                            store: item.store || null,
                                        })
                                    }
                                    className="accent-primary"
                                />
                                <span>{item.label}</span>
                                <div className="flex items-center gap-1">
                                    {item.icons.map((icon, j) => (
                                        <img
                                            key={j}
                                            src={`/storage/payment/${icon}`}
                                            alt={item.label}
                                            className="w-8 h-auto"
                                        />
                                    ))}
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Persetujuan */}
                    <div className="flex items-start gap-2 mt-6">
                        <input
                            type="checkbox"
                            checked={data.aggree}
                            onChange={(e) =>
                                setData({ ...data, aggree: e.target.checked })
                            }
                            className="mt-1 accent-primary"
                        />
                        <p className="text-sm text-gray-700">
                            Saya setuju dengan{" "}
                            <span className="text-primary font-semibold">
                                syarat dan ketentuan
                            </span>{" "}
                            yang berlaku
                        </p>
                    </div>

                    {/* Catatan */}
                    <p className="mt-4 text-sm text-gray-500">
                        Setelah pembayaran berhasil dilakukan, kami akan
                        mengecek pembayaran Anda terlebih dahulu. Ketika
                        pembayaran telah berhasil diverifikasi, maka pesanan
                        Anda akan langsung diproses oleh admin, dan Anda akan
                        menerima pesan melalui WhatsApp.
                    </p>

                    {/* Tombol */}
                    <button
                        onClick={() => submitHandler()}
                        className="mt-6 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-full w-full transition"
                    >
                        Bayar Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}

CreatePesanan.layout = (page) => <GuestLayout children={page} />;
