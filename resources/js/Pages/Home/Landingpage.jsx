import SliderPaket from "@/Components/Guest/SliderPaket";
import SliderTestimoni from "@/Components/Guest/SliderTestimoni";
import Jumbotron from "@/Components/Jumbotron";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from "@inertiajs/react";
import {
    Email,
    MeetingRoom,
    Phone,
    School,
    Verified,
} from "@mui/icons-material";
import React, { useState } from "react";
import Slider from "react-slick";
import { formatRupiah } from "../Function/FormatRupiah";

export default function Landingpage(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const { sub_kategori, count, profile } = usePage().props;
    const paket = props.paket;
    return (
        <>
            <section className="relative bg-primary ">
                <Jumbotron />
                <div className="h-full w-full absolute left-0 top-0 bg-primary/50 "></div>
                <div className="text-white px-6 py-16 flex flex-col-reverse lg:flex-row items-center  justify-between h-[600px] absolute top-0 left-0">
                    <div className="max-w-2xl ">
                        <h1 className="text-6xl font-bold mb-4">
                            Upgrade Your Skills with{" "}
                            <span className="capitalize">{profile.nama}</span>
                        </h1>
                        <p className="mb-6 text-lg">
                            Join our courses and enhance your abilities.
                        </p>
                        <button className="bg-white text-primary font-semibold px-6 py-3 rounded shadow">
                            Get Started
                        </button>
                    </div>
                    <div className="max-w-xl hidden lg:block">
                        <img
                            src={"/storage/" + profile.thumbnail}
                            alt="Hero"
                            className="w-[600px]  rounded-lg mb-10 lg:mb-0 object-cover"
                        />
                    </div>
                </div>
            </section>
            {/* About Us */}
            <section className="px-6 py-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">About Us</h2>
                    <p
                        className="text-gray-700 text-lg line-clamp-5"
                        dangerouslySetInnerHTML={{ __html: profile.deskripsi }}
                    />
                    <Link
                        as="button"
                        href={route("about")}
                        className="bg-primary text-white font-semibold px-6 py-3 rounded shadow"
                    >
                        Read More
                    </Link>
                </div>
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    <div className="bg-primary hover:bg-blue-500 usetransisi hover:-translate-y-10  text-white p-4 rounded-lg text-center ">
                        <div className="text-5xl">
                            <Verified color="inherit" fontSize="inherit" />
                        </div>
                        <p className="mt-2 font-semibold">Terakreditasi</p>
                        <p>
                            Mudicom menjadi satu-satunya lembaga kursus di
                            Sulawesi Barat yang Terakreditasi oleh kementrian
                        </p>
                    </div>
                    <div className="bg-primary  hover:bg-blue-500 usetransisi hover:-translate-y-10  text-white p-4 rounded-lg text-center ">
                        <div className="text-5xl">
                            <MeetingRoom color="inherit" fontSize="inherit" />
                        </div>
                        <p className="mt-2 font-semibold">
                            Fasilitas Yang Lengkap
                        </p>
                        <p className="text-xs">
                            Fasilitas lengkap, ruang kelas yang nyaman,
                            dilengkapi dengan AC dan WIFI, modul pembelajaran
                            disusun berdasarkan TNA.
                        </p>
                    </div>
                    <div className="2 lg:col-span-1 bg-primary hover:bg-blue-500 usetransisi hover:-translate-y-10  text-white p-4 rounded-lg text-center ">
                        <div className="text-5xl">
                            <School color="inherit" fontSize="inherit" />
                        </div>
                        <p className="mt-2 font-semibold">
                            Instruktur yang Terampil
                        </p>
                        <p>
                            Tenaga pengajar kami diisi oleh tenaga yang sudah
                            ahli dibidangnya
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-100 py-12 px-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-[#001B44]">
                    Our Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded shadow">
                        <div className="text-4xl font-bold text-[#004AAD]">
                            {count.count_instruktur}
                        </div>
                        <p className="mt-2 text-lg">Instructors</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <div className="text-4xl font-bold text-[#004AAD]">
                            {count.count_siswa}
                        </div>
                        <p className="mt-2 text-lg">Students</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <div className="text-4xl font-bold text-[#004AAD]">
                            {count.count_materi}
                        </div>
                        <p className="mt-2 text-lg">Course Materials</p>
                    </div>
                </div>
            </section>
            {/* Available Courses & Testimonial */}
            <section className="px-6 py-12 flex flex-col-reverse lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">
                        Available Courses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                        {sub_kategori.map((item, key) => (
                            <>
                                <div
                                    className={`bg-blue-500 h-[300px]  bg-cover relative`}
                                >
                                    <img
                                        src={"/storage/" + item.thumbnail}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className={`group ${
                                            key == 0
                                                ? "bg-orange-800"
                                                : key == 1
                                                ? "bg-gray-500"
                                                : key == 2
                                                ? "bg-green-500"
                                                : "bg-gray-800"
                                        } absolute top-0 left-0 h-full w-full flex flex-col justify-end p-8 bg-opacity-85 hover:bg-opacity-100 usetransisi`}
                                    >
                                        <h1 className="capitalize text-white text-xl font-bold">
                                            {item.nama_sub_kategori}
                                        </h1>
                                        <p className="font-sans leading-6 tracking-tight text-sm text-white">
                                            {item.deskripsi}
                                        </p>
                                        <button className="border border-white py-2 px-3 rounded-md text-white font-light inline">
                                            Selengkapnya
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                        {sub_kategori.length <= 3 && (
                            <div className="bg-blue-500 h-[300px] bg-[url('/Image/thumbnail_mobil.png')] bg-cover relative">
                                <div
                                    className={`group bg-orange-500 absolute top-0 left-0 h-full w-full flex flex-col justify-end p-8`}
                                >
                                    <h1 className="capitalize text-white text-xl font-bold"></h1>
                                    <p className="font-sans leading-6 tracking-tight text-sm text-white">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Aspernatur magnam
                                        ipsam illum dolores tempora! Ducimus
                                        sunt doloribus repellendus
                                    </p>
                                    <button className="border border-white py-2 px-3 rounded-md text-white font-light inline">
                                        Selengkapnya
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <h1 className="text-lg font-medium mb-4 text-primary">
                        Paket Belajar Yang Tersedia
                    </h1>
                    <h6 className="font-bold mb-4 text-primary text-4xl">
                        Mengembangkan Bakat, Kreativitas, dan Karakter!
                    </h6>
                    <p className="font-light tracking-tight text-xl">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Illum ducimus temporibus tempora natus? Quia,
                        maxime rerum. Eveniet eum quaerat eius cumque, in
                        voluptatibus? Aut enim vel dolores architecto tempora
                        nesciunt?
                    </p>
                    <div className="py-3">
                        <h1 className="text-primary font-extrabold text-xl">
                            Paket Kursus Yang Tersedia
                        </h1>
                        <div className="my-6 px-4">
                            <SliderPaket setActiveIndex={setActiveIndex}>
                                {paket.map((item, key) => (
                                    <Link
                                        href={route(
                                            "detail-paket-kursus",
                                            item.slug
                                        )}
                                        as="div"
                                        className="mx-5 hover:cursor-pointer"
                                    >
                                        <div
                                            className={` py-3 rounded-md drop-shadow-md px-4  border border-primary/20 flex justify-between flex-row gap-x-3 items-start  transition-all duration-500 ease-in-out group hover:bg-primary`}
                                        >
                                            <div className="w-[200px] ">
                                                <img
                                                    src={
                                                        "/storage/" +
                                                        item.thumbnail
                                                    }
                                                    alt=""
                                                    className="w-[400px] h-[200px] object-cover"
                                                />
                                            </div>
                                            <div className="w-full font-heebo">
                                                <h1
                                                    className={`font-bold text-lg md:text-lg  transition-all duration-500 ease-in-out group-hover:text-white`}
                                                >
                                                    {item.nama_paket}
                                                </h1>
                                                <p
                                                    className="line-clamp-3 my-3 text-sm md:text-sm group-hover:text-white"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.deskripsi,
                                                    }}
                                                />

                                                <div className="flex flex-col  gap-x-3  ">
                                                    <p
                                                        className={`inline my-3 group-hover:bg-white group-hover:text-primary bg-primary  text-white    font-extrabold text-4xl md:text-sm py-3 px-4 transition-all duration-500 ease-in-out`}
                                                    >
                                                        {formatRupiah(
                                                            item.harga
                                                        )}
                                                    </p>
                                                    <span className="text-xs md:text-sm group-hover:text-white">
                                                        {item.total_materi +
                                                            " Materi " +
                                                            item.total_pertemuan +
                                                            " / Pertemuan"}
                                                    </span>
                                                </div>
                                                <button className="text-primary border py-2 px-3 border-primary rounded-md group-hover:text-white group-hover:border-white">
                                                    Selengkapnya
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </SliderPaket>
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="border border-primary py-2 px-4 text-xl font-extrabold text-primary rounded-md usetransisi hover:bg-primary hover:text-white">
                                Lihat Paket Lainnya
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    What Our Students Say
                </h2>
                <SliderTestimoni></SliderTestimoni>
            </section>
        </>
    );
}

Landingpage.layout = (page) => <GuestLayout children={page} />;
