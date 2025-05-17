import DropdownLinks from "@/Components/DropdownLinks";
import { Link } from "@inertiajs/react";
import {
    AdminPanelSettings,
    ArrowForwardIos,
    Close,
    Dashboard,
    Face,
    ListAltOutlined,
    Menu,
    Payments,
    School,
    Settings,
    Shop,
} from "@mui/icons-material";
import React, { useState } from "react";
import { RecoilRoot } from "recoil";

export default function AuthLayout({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <RecoilRoot>
            <div className="w-full min-h-full bg-gray-50 relative">
                <div className="">
                    {/* navbar */}
                    <div className="sticky z-[10] top-0 left-0 w-full bg-blue-950 flex flex-row justify-between items-center ">
                        <div className="px-4 py-4 flex flex-row gap-x-3 items-center">
                            {openSidebar ? (
                                <button
                                    onClick={() => setOpenSidebar(false)}
                                    className=" p-2 rounded-md text-white usetransisi hover:bg-blue-700"
                                >
                                    <Close />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setOpenSidebar(true)}
                                    className=" p-2 rounded-md text-white usetransisi hover:bg-blue-700"
                                >
                                    <Menu />
                                </button>
                            )}
                            <h1 className="text-white font-bold">Dashboard</h1>
                        </div>
                        <div>asdfsadfa</div>
                    </div>
                    {/* end navbar */}

                    {/* container */}

                    <div
                        className={` ${
                            openSidebar
                                ? "w-[90%] md:w-[40%] lg:w-[30%]"
                                : "w-0 overflow-x-hidden"
                        } h-full bg-blue-950 usetransisi fixed z-10 top-18`}
                    >
                        {openSidebar && (
                            <div>
                                <Link className="flex flex-row gap-3 items-center px-4 py-2 border-b border-x-white text-white tracking-tighter leading-3 font-medium text-lg hover:bg-blue-900 usetransisi">
                                    <Dashboard />
                                    <p>Dashboard</p>
                                </Link>
                                <DropdownLinks
                                    title={"Managemen Master Data"}
                                    icon={<Settings />}
                                >
                                    <DropdownLinks.Item
                                        href={route(
                                            "admin.management-profile-perusahaan"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Management Kantor"}
                                    />
                                    <DropdownLinks.Item
                                        href={route("admin.management-slider")}
                                        icon={<ListAltOutlined />}
                                        title={"Management Slider"}
                                    />
                                    <DropdownLinks.Item
                                        href={route(
                                            "admin.management-profile-perusahaan"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Management Role Permission"}
                                    />
                                </DropdownLinks>
                                <DropdownLinks
                                    title={"Managemen Kursus"}
                                    icon={<School />}
                                >
                                    <DropdownLinks.Item
                                        href={route("admin.management-kursus")}
                                        icon={<ListAltOutlined />}
                                        title={"Kategori Kursus"}
                                    />
                                    <DropdownLinks.Item
                                        href={route(
                                            "admin.management-materi-ajar"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Management Materi Pelajaran"}
                                    />
                                    <DropdownLinks.Item
                                        href={route(
                                            "admin.management-paket-kursus"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Management Paket"}
                                    />
                                </DropdownLinks>
                                <DropdownLinks
                                    title={"Managemen Transaksi"}
                                    icon={<Shop />}
                                >
                                    <DropdownLinks.Item
                                        href={route(
                                            "management-pendaftaran-kursus"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Management Pendaftaran Kursus"}
                                    />
                                    <DropdownLinks.Item
                                        href={route(
                                            "admin.management-pembayaran-kursus"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Management Pembayaran Kursus"}
                                    />
                                    <DropdownLinks.Item
                                        href={route(
                                            "admin.daftar-pesanan-kursus"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Daftar Pesanan Paket Kursus"}
                                    />
                                    <DropdownLinks.Item
                                        href={route("admin.management-kas")}
                                        icon={<ListAltOutlined />}
                                        title={"Kas Perusahaan"}
                                    />
                                </DropdownLinks>
                                <DropdownLinks
                                    title={"Managemen User"}
                                    icon={<AdminPanelSettings />}
                                >
                                    <DropdownLinks.Item
                                        href={route("admin.management-petugas")}
                                        icon={<ListAltOutlined />}
                                        title={"Management Petugas"}
                                    />
                                    <DropdownLinks.Item
                                        href={route(
                                            "admin.management-instruktur"
                                        )}
                                        icon={<ListAltOutlined />}
                                        title={"Management Instruktur"}
                                    />
                                    <DropdownLinks.Item
                                        href={route("admin.management-siswa")}
                                        icon={<ListAltOutlined />}
                                        title={"Management siswa"}
                                    />
                                </DropdownLinks>
                            </div>
                        )}
                    </div>
                    <div className=" w-full  mt-4 min-[80%] h-[30%] overflow-y-auto">
                        {children}
                    </div>

                    {/* endcontainer */}
                </div>
            </div>
        </RecoilRoot>
    );
}
