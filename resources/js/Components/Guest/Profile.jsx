import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Profile({ children }) {
    const { auth } = usePage().props;
    return (
        <>
            <div className="bg-primary relative  w-full flex flex-col justify-center items-center">
                <div className="py-6 flex flex-col justify-center items-center">
                    <img
                        src={"/storage/" + auth.user.avatar}
                        alt=""
                        className="w-[300px]"
                    />
                    <p className="text-white font-bold text-xl">
                        {auth.user.name
                            ? auth.user.name
                            : "Nama Pengguna Belum Dibuat"}
                    </p>
                    <p className="text-white"> {auth.user.email}</p>
                </div>
            </div>
            <div>
                <div className="px-4 py-8 flex flex-col md:flex-row gap-3">
                    {/* Sidebar */}
                    <div className="flex flex-row md:flex-col gap-1">
                        <Link
                            href={route("siswa.dashboard")}
                            as="button"
                            className={`py-2 px-3 rounded-md text-white text-xs md:text-sm lg:text-base  ${
                                route().current() === "siswa.dashboard"
                                    ? "bg-blue-700"
                                    : "bg-primary"
                            }`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("siswa.profile-saya")}
                            as="button"
                            className={`py-2 px-3 rounded-md text-white text-xs md:text-sm lg:text-base ${
                                route().current() == "siswa.profile-saya"
                                    ? "bg-blue-700"
                                    : "bg-primary"
                            }`}
                        >
                            Profile Saya
                        </Link>
                        <Link
                            href={route("siswa.history-pesanan-kursus")}
                            as="button"
                            className={`py-2 px-3 rounded-md text-white text-xs md:text-sm lg:text-base ${
                                route().current() ==
                                    "siswa.history-pesanan-kursus" ||
                                route().current() ==
                                    "siswa.show-history-pesanan-kursus"
                                    ? "bg-blue-700"
                                    : "bg-primary"
                            }`}
                        >
                            Pesanan Saya
                        </Link>
                        <Link
                            as="button"
                            className={`py-2 px-3 rounded-md text-white text-xs md:text-sm lg:text-base ${
                                route().current() ? "bg-primary" : "bg-primary"
                            }`}
                        >
                            Daftar Kursus Saya
                        </Link>
                        <Link
                            as="button"
                            className={`py-2 px-3 rounded-md text-white text-xs md:text-sm lg:text-base ${
                                route().current() ? "bg-primary" : "bg-primary"
                            }`}
                        >
                            Logout
                        </Link>
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </>
    );
}
