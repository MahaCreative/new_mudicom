import Jumbotron from "@/Components/Jumbotron";
import { Link, usePage } from "@inertiajs/react";
import {
    Email,
    MarkEmailRead,
    MeetingRoom,
    Phone,
    School,
    Verified,
} from "@mui/icons-material";
import React from "react";
import Slider from "react-slick";

export default function GuestLayout({ children }) {
    const { sub_kategori, count, profile } = usePage().props;
    console.log(profile);

    return (
        <div>
            {" "}
            <div className="font-sans">
                <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
                    <div className="flex gap-x-3 items-center">
                        <div className="text-white flex leading-3 gap-x-3 items-center">
                            <Phone />
                            <p>{profile.telepon}</p>
                        </div>
                        <div className="text-white flex leading-3 gap-x-3 items-center">
                            <Email />
                            <p>{profile.email}</p>
                        </div>
                    </div>
                </nav>
                {/* Navbar */}
                <nav className=" bg-blue-800 h-1/2 text-white px-6 py-4 flex flex-col md:flex-row justify-between md:items-center">
                    <div className="flex items-center gap-2">
                        <img
                            src={"/storage/" + profile.logo}
                            alt="Mudicom Logo"
                            className="h-10 w-auto"
                        />
                        <span className="text-xl font-bold capitalize">
                            {profile.nama}
                        </span>
                    </div>
                    <ul className="flex gap-2 md:gap-3 lg:gap-6 items-center mt-3 md:mt-0">
                        <li>
                            <Link
                                href={route("home")}
                                className={`${
                                    route().current("home")
                                        ? "bg-white py-2 px-3 rounded-md text-primary"
                                        : "text-white"
                                } navItem text-xs md:text-base lg:text-lg  py-1.5 md:py-3 border-orange-500 font-medium  transition-all duration-300 ease-in-out  h-full `}
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("about")}
                                className={`${
                                    route().current("about")
                                        ? "bg-white py-2 px-3 rounded-md text-primary"
                                        : "text-white"
                                } navItem text-xs md:text-base lg:text-lg  py-1.5 md:py-3 border-orange-500 font-medium  transition-all duration-300 ease-in-out  h-full `}
                            >
                                Profile Lembaga
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                href={route("kategori-kursus")}
                                className={`${
                                    route().current("kategori-kursus")
                                        ? "bg-white py-2 px-3 rounded-md text-primary"
                                        : "text-white"
                                } navItem text-xs md:text-base lg:text-lg  py-1.5 md:py-3 border-orange-500 font-medium  transition-all duration-300 ease-in-out  h-full `}
                            >
                                Kategori Kursus
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                href={route("paket-kursus")}
                                className={`${
                                    route().current("paket-kursus")
                                        ? "bg-white py-2 px-3 rounded-md text-primary"
                                        : "text-white"
                                } navItem text-xs md:text-base lg:text-lg  py-1.5 md:py-3 border-orange-500 font-medium  transition-all duration-300 ease-in-out  h-full `}
                            >
                                Paket Kursus
                            </Link>
                        </li>
                        <li>
                            <Link className="navItem text-xs md:text-base lg:text-lg text-white py-1.5 md:py-3 border-orange-500 font-medium  transition-all duration-300 ease-in-out  h-full ">
                                Berita
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("login")}
                                as="button"
                                className="bg-orange-500  px-4  rounded-md text-xs md:text-base lg:text-lg text-white py-1.5 md:py-3 border-orange-500 font-medium  transition-all duration-300 ease-in-out  h-full "
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
                {children}
                <div className="bg-primary py-4 px-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.4615152658216!2d118.88331187383554!3d-2.677840238728065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d92d84ad55d9cad%3A0xd9e19750ac3fa00f!2sYpp%20Mudicom!5e0!3m2!1sid!2sid!4v1747318037718!5m2!1sid!2sid"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* Contact */}
                <section
                    id="contact"
                    className="bg-blue-800 text-white py-12 px-6 text-center flex flex-col md:flex-row justify-between items-start"
                >
                    <div className="w-full md:w-[50%] lg:w-[70%]">
                        <div className="flex gap-x-3 items-center">
                            <img
                                src={"/storage/" + profile.logo}
                                alt={profile.nama}
                                className="w-12"
                            />
                            <h1 className="font-bold text-white capitalize text-4xl">
                                {profile.nama}
                            </h1>
                        </div>
                        <p className="font-light text-lg text-left w-3/4 mt-6">
                            Berkarakter Mulia, Beriman dan Bertaqwa,
                            Berprestasi, Terampil, Selaras, Mandiri, Kompetitif
                        </p>
                    </div>
                    <div className="w-full md:w-[50%] lg:w-[30%] text-left">
                        <h1 className="font-bold text-white capitalize text-4xl">
                            Hubungi Kami
                        </h1>
                        <div className="flex gap-x-3 item-center mt-6">
                            <p>
                                <MarkEmailRead />
                            </p>
                            <p>
                                {profile.alamat} <span>{profile.provinsi}</span>
                            </p>
                        </div>
                        <div className="flex gap-x-3 item-center mt-1">
                            <p>
                                <Phone />
                            </p>
                            <p>{profile.telepon}</p>
                        </div>
                        <div className="flex gap-x-3 item-center mt-1">
                            <p>
                                <Email />
                            </p>
                            <p>{profile.email}</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-blue-900 text-center text-white py-4 text-sm">
                    &copy; {new Date().getFullYear()} Mudicom. All rights
                    reserved.
                </footer>
            </div>
        </div>
    );
}
