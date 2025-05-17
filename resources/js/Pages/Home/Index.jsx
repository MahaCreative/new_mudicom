import Jumbotron from "@/Components/Jumbotron";
import { Link } from "@inertiajs/react";
import {
    Facebook,
    Instagram,
    Phone,
    School,
    Telegram,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import React from "react";

export default function Index() {
    return (
        <div>
            <div className="px-4 md:px-8 lg:px-16 flex py-1 bg-blue-950 justify-between items-center border-b border-blue-900 ">
                <div className="flex gap-3 items-center leading-3">
                    <p className="text-orange-500 text-base">
                        <Phone color="inherit" fontSize="inherit" />
                    </p>
                    <p className="font-light text-sm text-white tracking-tighter">
                        085xxxxx
                    </p>
                </div>
                <div className="flex gap-3 items-center">
                    <Link
                        as="div"
                        className="text-white text-lg w-8 h-8 rounded-full bg-blue-900 text-center hover:cursor-pointer"
                    >
                        <Facebook fontSize="inherit" color="inherit" />
                    </Link>
                    <Link
                        as="div"
                        className="text-white text-lg w-8 h-8 rounded-full bg-blue-900 text-center hover:cursor-pointer"
                    >
                        <Instagram fontSize="inherit" color="inherit" />
                    </Link>
                </div>
            </div>
            {/* navbar */}
            <div className="px-4 md:px-8 lg:px-16 flex bg-blue-900 justify-between items-center relative">
                <div className="flex gap-x-3 items-center">
                    <img
                        src={"/Image/logo.png"}
                        alt=""
                        className="w-12 bg-red-500"
                    />
                </div>
                <div className="flex gap-x-5 items-center h-full">
                    <Link className="navItem text-sm md:text-lg lg:text-xl text-white  py-3 border-orange-500 font-bold  transition-all duration-300 ease-in-out  h-full ">
                        Beranda
                    </Link>
                </div>
            </div>
            {/* navbar */}
            {/* jumbotron */}

            <Jumbotron />

            {/* jumbotron */}
            <div className="pt-2 pb-6 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 usetransisi">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 items-center">
                    <div className="group hover:bg-blue-950  w-full  flex flex-col justify-center px-8 py-8 items-center transition-all duration-700 ease-out  hover:-translate-y-10 bg-slate-100">
                        <div className="text-7xl group-hover:text-white transition-all duration-700 ease-out text-blue-950">
                            <School color="inherit" fontSize="inherit" />
                        </div>
                        <p className="font-nunito font-bold text-xl group-hover:text-white transition-all duration-700 ease-out text-blue-950 ">
                            Instruktur Terampil
                        </p>
                        <p className="text-center tracking-tighter font-nunito font-medium group-hover:text-white usetransisi">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Ratione id nulla itaque, perspiciatis
                        </p>
                    </div>
                    <div className="group hover:bg-blue-950  w-full  flex flex-col justify-center px-8 py-8 items-center transition-all duration-700 ease-out  hover:-translate-y-10 bg-slate-100">
                        <div className="text-7xl group-hover:text-white transition-all duration-700 ease-out text-blue-950">
                            <School color="inherit" fontSize="inherit" />
                        </div>
                        <p className="font-nunito font-bold text-xl group-hover:text-white transition-all duration-700 ease-out text-blue-950 ">
                            Instruktur Terampil
                        </p>
                        <p className="text-center tracking-tighter font-nunito font-medium group-hover:text-white usetransisi">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Ratione id nulla itaque, perspiciatis
                        </p>
                    </div>
                    <div className="group hover:bg-blue-950  w-full  flex flex-col justify-center px-8 py-8 items-center transition-all duration-700 ease-out  hover:-translate-y-10 bg-slate-100">
                        <div className="text-7xl group-hover:text-white transition-all duration-700 ease-out text-blue-950">
                            <School color="inherit" fontSize="inherit" />
                        </div>
                        <p className="font-nunito font-bold text-xl group-hover:text-white transition-all duration-700 ease-out text-blue-950 ">
                            Instruktur Terampil
                        </p>
                        <p className="text-center tracking-tighter font-nunito font-medium group-hover:text-white usetransisi">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Ratione id nulla itaque, perspiciatis
                        </p>
                    </div>
                    <div className="group hover:bg-blue-950  w-full  flex flex-col justify-center px-8 py-8 items-center transition-all duration-700 ease-out  hover:-translate-y-10 bg-slate-100">
                        <div className="text-7xl group-hover:text-white transition-all duration-700 ease-out text-blue-950">
                            <School color="inherit" fontSize="inherit" />
                        </div>
                        <p className="font-nunito font-bold text-xl group-hover:text-white transition-all duration-700 ease-out text-blue-950 ">
                            Instruktur Terampil
                        </p>
                        <p className="text-center tracking-tighter font-nunito font-medium group-hover:text-white usetransisi">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Ratione id nulla itaque, perspiciatis
                        </p>
                    </div>
                </div>
            </div>

            {/* about us */}
            <div className=" py-6 px-4 md:px-8 lg:px-16 usetransisi">
                <div className="flex flex-col md:flex-row gap-x-6 gapy-3 items-start">
                    <img
                        src="/storage/image/default_thumnbnail.jpg"
                        alt=""
                        className="w-[80%] md:w-[50%] h-full object-cover"
                    />
                    <div>
                        <h6 className="font-nunito text-xl section-title">
                            About Us
                        </h6>
                        <h1 className="font-nunito mb-4 font-bold text-3xl mt-4 tracking-tighter">
                            Selamat Datang di LPP Mudicom
                        </h1>
                        <p className="font-heebo font-normal left-2 line-clamp-[10]">
                            Dengan mengucapkan rasa syukur atas semua anugerah
                            yang telah diberikan oleh Allah S.W.T, kami hadir di
                            tengah-tengah masyarakat dengan membawa suatu tujuan
                            Positif dan sangat mulia, yakni turut serta membantu
                            mencerdaskan anak bangsa menuju Indonesia Emas.
                            Mengingat Pentingnya akan keterampilan untuk kita
                            semua, Mudicom berusaha menjembatani para anak
                            bangsa Indonesia yang membutuhkan keterampilan untuk
                            meningkatkan/menambah keterampilan. Mudicom lahir
                            dan dibentuk pada 20 Maret 1998 sesuai Akta Notaris
                            Dwi Astriyana Utina, S.H.,M.Kn Nomor S.K Menteri
                            Kehakiman No. C 556 HT.03.01. Th. 2007 Tanggal 28
                            Desember 2007 dengan Salinan / Grosse Nomor 10
                            Tanggal 16 Juni 2009, dengan modal semangat dan
                            sedikit pengalaman dalam bidang pelatihan,
                            Alhamdulillah Mudicom disambut baik oleh masyarakat
                            dan seiring perkembangan dan kebutuhan
                            Industri/perusahaan, Mudicom yang statusnya dari
                            Lembaga Kursus dan pelatihan Mudicom menjadi Yayasan
                            Pendidikan dan Pelatihan Mudicom, Yayasan Pendidikan
                            dan Pelatihan Mudicom dibentuk pada tanggal 29
                            Desember 2021 dengan Akta Notaris Andi Haeril
                            Sumange, SH.,M.Kn, Nomor SK Menteri Hukum dan HAM
                            R.I Nomor : C-722.HT.03.01. Th 2004 dengan akta
                            Nomor Pendirian, Nomor 15. Yayasan Pendidikan dan
                            Pelatihan Mudicom, yang nantinya diharapkan dapat
                            mengembangkan segala potensi yang ada sehingga
                            pencapaian kemampuan diri anak bangsa Indonesia
                            dapat tercapai sesuai yang di harapkannya.
                        </p>
                        <button className="bg-blue-950 py-3 text-white font-nunito font-bold text-2xl px-5 mt-6">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
