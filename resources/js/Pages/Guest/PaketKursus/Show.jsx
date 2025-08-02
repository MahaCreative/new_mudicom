import InputText from "@/Components/InputText";
import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Facebook,
    InsertEmoticon,
    Telegram,
    Web,
    X,
} from "@mui/icons-material";
import moment from "moment";
import React from "react";

export default function Show(props) {
    const { profile } = usePage().props;
    const paket = props.paket;
    const benefit = props.benefit;
    const jenis = props.jenis;

    return (
        <div>
            <Head title={paket.nama_paket + " " + paket.jenis_kursus} />
            {/* Jumbotron */}
            <div className="bg-primary relative min-h-[600px] md:min-h-[500px] lg:min-h-[400px] w-full flex flex-col justify-center items-start px-4 md:px-8 lg:px-16 py-16">
                <div className="flex flex-col-reverse md:flex-row w-full gap-3 justify-between">
                    <div className="w-full md:w-1/2">
                        <h1 className="font-bold text-white text-3xl md:text-6xl">
                            {paket.nama_paket}
                        </h1>
                        <h1 className="font-bold text-white text-3xl md:text-5xl lg:text-7xl">
                            {formatRupiah(paket.harga - paket.harga_promo)}
                        </h1>
                        <p
                            className="font-light font-nunito text-white tracking-tight mt-6 line-clamp-5"
                            dangerouslySetInnerHTML={{
                                __html: paket.deskripsi,
                            }}
                        />
                        <Link
                            href={route(
                                "siswa.create-pesanan-kursus",
                                paket.kd_paket
                            )}
                            as="button"
                            className="my-16 text-white font-bold text-xl leading-3 border py-5 px-3 border-white rounded-md hover:bg-white hover:text-primary hover:border-primary"
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                    <img
                        src={"/storage/" + paket.thumbnail}
                        alt=""
                        className="w-full md:w-1/2  object-cover"
                    />
                </div>
            </div>
            <div className=" px-4 md:px-8 lg:px-16 flex flex-col  justify-center items-center gap-3 py-16">
                <h1 className="font-bold text-2xl w-full text-center md:w-1/2 text-primary">
                    {paket.judul_alasan}
                </h1>
                <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paket.reason.map((item, key) => (
                        <div
                            key={key}
                            className="bg-primary py-4 px-6 text-white"
                        >
                            <img
                                className="w-[54px]"
                                src={"/storage/" + item.icon}
                                alt={item.reason}
                            />
                            <p className="font-light text-sm my-5 text-center md:text-left">
                                {item.reason}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* end reason */}
            {/* trouble */}
            <div className=" px-4 md:px-8 lg:px-16 flex flex-col  justify-center items-center gap-3 py-24">
                <h1 className="font-bold text-2xl w-full text-center md:w-1/2 text-primary">
                    {" " + paket.nama_paket + " " + paket.jenis_kursus} ini
                    cocok untuk Anda yang memiliki salah satu masalah ini
                </h1>
                <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-20">
                    {paket.trouble.map((item, key) => (
                        <div className="bg-primary py-4 px-6 text-white relative w-full min-w-full min-h-[200px] group hover:bg-blue-900">
                            <div
                                key={key}
                                className="absolute rounded-md -top-12 left-0 w-full flex justify-center items-center "
                            >
                                <div className="w-[100px] h-[100px] rounded-full overflow-hidden group-hover:scale-75">
                                    <img
                                        src={"/storage/image/Group-1802.jpg"}
                                        alt={paket.nama_paket}
                                        className="w-[100px] h-[100px] bg-white"
                                    />
                                </div>
                            </div>
                            <p className="font-light text-sm mt-12 text-center md:text-left">
                                {item.deskripsi_trouble}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* end trouble */}
            {/* solusi */}
            <div className=" px-4 md:px-8 lg:px-16 flex flex-col md:flex-row  justify-center items-center gap-9 py-6">
                <div className="my-4  gap-4 w-full md:w-1/2">
                    <div className="flex justify-center items-center">
                        <img
                            src={"/storage/" + paket.solusi.image_solusi}
                            alt={paket.nama_paket}
                            className=" w-[400px]"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="font-medium text-xl w-full md:w-1/2 text-primary">
                        Solusi Terbaik Buat Kamu
                    </h1>
                    <p className=" my-6 font-bold text-4xl">
                        Saatnya Kamu Temukan Solusi Susahnya Belajar{" "}
                        {paket.nama_paket}
                    </p>
                    <p
                        className="font-light  my-6"
                        dangerouslySetInnerHTML={{
                            __html: paket.solusi.deskripsi_solusi,
                        }}
                    />
                </div>
            </div>
            {/* end solusi */}
            {/* kriteria */}
            <div className=" px-4 md:px-8 lg:px-16 flex flex-col md:flex-row-reverse  justify-center items-center gap-9 py-6">
                <div className="my-4  gap-4 w-full md:w-1/2">
                    <div className="flex justify-center items-center">
                        <img
                            src={"/storage/" + paket.kriteria.image_criteria}
                            alt=""
                            className=" w-[400px]"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="font-medium text-xl w-full md:w-1/2 text-primary">
                        <span className="capitalize">{paket.nama_paket}</span>{" "}
                        Kriteria
                    </h1>

                    <p
                        className=" my-6"
                        dangerouslySetInnerHTML={{
                            __html: paket.kriteria.deskripsi_criteria,
                        }}
                    />

                    <button
                        type="button"
                        className="text-primary font-bold text-xl leading-3 border py-5 px-3 border-primary rounded-md hover:bg-primary hover:text-white hover:border-white"
                    >
                        Daftar Sekarang
                    </button>
                </div>
            </div>
            {/* Fundfact */}
            <div className=" px-4 md:px-8 lg:px-16 flex flex-col md:flex-row  justify-center items-center gap-9 py-6">
                <div className="my-4  gap-4 w-full md:w-1/2">
                    <div className="flex justify-center items-center">
                        <img
                            src={"/storage/" + paket.funfact.image_funfact}
                            alt=""
                            className=" w-[400px]"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="font-medium text-xl w-full md:w-1/2 text-primary">
                        Fun Fact
                    </h1>

                    <p
                        className=" my-6"
                        dangerouslySetInnerHTML={{
                            __html: paket.funfact.deskripsi_funfact,
                        }}
                    />
                </div>
            </div>
            <div className="py-16 px-4 md:px-8 lg:px-16">
                <h1 className="text-center font-medium text-primary text-2xl">
                    Get In Touch
                </h1>
                <p className="text-center font-medium  text-5xl my-9">
                    Biaya untuk Skill Masa Depanmu
                </p>
                <div className="flex flex-col md:flex-row gap-3 justify-center items-start gap-6">
                    <div className="w-full">
                        <div className="bg-primary">
                            <div className="py-6 flex justify-center bg-blue-800">
                                <h1 className="capitalize text-4xl font-extrabold text-center text-white">
                                    {/* {paket.nama_paket} Apli */} Aplikasi
                                    Perkantoran
                                </h1>
                            </div>
                            <div className="py-16 w-full">
                                {paket.harga_promo !== 0 &&
                                    paket.harga_promo !== null && (
                                        <div className="w-full flex flex-col justify-center items-center pb-9">
                                            <p className="relative capitalize text-4xl font-extrabold text-center text-white inline-block   leading-3">
                                                {formatRupiah(paket.harga)}
                                                <span className="absolute h-full w-full top-0 left-0 flex flex-col justify-center items-center ">
                                                    <span className="h-1 bg-white w-[106%]"></span>
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                <p className="capitalize text-4xl font-extrabold text-center text-white">
                                    Hanya
                                </p>
                                <p className=" capitalize text-5xl lg:text-7xl font-extrabold text-center text-white py-16   leading-3">
                                    {formatRupiah(
                                        paket.harga_promo == 0
                                            ? paket.harga
                                            : paket.harga - paket.harga_promo
                                    )}
                                </p>
                                <p className="capitalize text-2xl font-extrabold text-center text-white">
                                    Spesial Promo Hemat{" "}
                                    {(paket.harga_promo / paket.harga) * 100}%
                                </p>
                                <p className="text-center px-4 text-white font-light my-5">
                                    daftarkan diri anda segera untuk mendapatkan
                                    mentor terbaik anda
                                </p>
                                <div className="w-full flex flex-col justify-center items-center">
                                    <Link
                                        href={route(
                                            "siswa.create-pesanan-kursus",
                                            paket.kd_paket
                                        )}
                                        as="button"
                                        className="my-9 text-white font-bold text-xl leading-3 border py-5 px-3 border-white rounded-md hover:bg-white hover:text-primary hover:border-primary"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-gradient-to-br from-blue-800 to-blue-700 text-white rounded-2xl shadow-xl p-6 relative overflow-hidden min-w-[300px] w-full">
                            <h3 className="text-2xl font-bold mb-4 capitalize">
                                Jenis Paket Kursus {jenis.jenis_kursus}
                            </h3>
                            <p>{jenis.deskripsi}</p>
                            <div className="space-y-6 relative ml-2">
                                <div className="absolute left-3 top-2 bottom-2 w-1 bg-white rounded"></div>
                                {benefit.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-4"
                                    >
                                        <div className="w-7 h-7 rounded-full border-4 border-white bg-blue-600 z-10"></div>
                                        <div>
                                            <p>{item.benefit}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Show.layout = (page) => <GuestLayout children={page} />;
