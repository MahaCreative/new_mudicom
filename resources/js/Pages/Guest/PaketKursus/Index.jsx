import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import { Link } from "@inertiajs/react";
import React, { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const [params, setParamas] = useState({ kategori: "" });
    const kategori = props.kategori;
    const paket = props.paket;

    // const reload = useCallback(() => {})
    useEffect(() => {}, []);
    return (
        <div>
            <div className="bg-primary relative h-[400px] w-full flex flex-col justify-center items-center">
                <h1 className="font-bold text-white text-4xl">Paket Kursus</h1>
                <p className="text-white w-full md:w-[80%] lg:w-1/2 text-center my-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus ipsa repudiandae nobis rem, blanditiis odio saepe
                    natus laborum in vel voluptas possimus porro cumque fugiat
                    odit nam, eaque ullam magnam iure error libero beatae
                </p>
                <div className="my-3 w-full flex flex-row gap-x-3 justify-center items-center">
                    <input
                        placeholder="Cari paket kursus anda"
                        className="py-2 px-4 rounded-md w-[60%] md:w-[55%] lg:w-[40%]"
                    />
                    <button className="py-2 px-4 text-lg font-bold text-primary bg-white rounded-md">
                        Cari Kursus
                    </button>
                </div>
            </div>
            <div className="py-6 px-4 md:px-8 lg:px-16">
                <div className="flex justify-start gap-x-3">
                    <div
                        onClick={() =>
                            setParamas({
                                ...params,
                                kategori: "all",
                            })
                        }
                        className={`${
                            params.kategori == "all"
                                ? "bg-primary text-white "
                                : "bg-white text-primary  hover:bg-primary hover:text-white"
                        } py-2 px-3  usetransisi hover:cursor-pointer capitalize  rounded-md drop-shadow-sm text-xl font-bold`}
                    >
                        Semua Kategori
                    </div>
                    {kategori.map((item, key) => (
                        <div
                            onClick={() =>
                                setParamas({
                                    ...params,
                                    kategori: item.nama_kategori,
                                })
                            }
                            className={`${
                                params.kategori == item.nama_kategori
                                    ? "bg-primary text-white "
                                    : "bg-white text-primary  hover:bg-primary hover:text-white"
                            } py-2 px-3  usetransisi hover:cursor-pointer capitalize  rounded-md drop-shadow-sm text-xl font-bold`}
                        >
                            {item.nama_kategori}
                        </div>
                    ))}
                </div>
                <div className="my-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {paket.map((item, key) => (
                        <Link
                            href={route("detail-paket-kursus", item.slug)}
                            as="div"
                            className="mx-1 hover:cursor-pointer"
                        >
                            <div
                                className={` py-3 rounded-md drop-shadow-md px-4  border border-primary/20 flex justify-between flex-row gap-x-3 items-start  transition-all duration-500 ease-in-out group hover:bg-primary`}
                            >
                                <div className="w-[200px] ">
                                    <img
                                        src={"/storage/" + item.thumbnail}
                                        alt=""
                                        className="w-[200px] h-[100px] object-cover"
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
                                            className={`inline my-3 group-hover:bg-white group-hover:text-primary bg-primary  text-white    font-extrabold text-2xl md:text-sm py-3 px-4 transition-all duration-500 ease-in-out`}
                                        >
                                            {formatRupiah(
                                                item.harga - item.harga_promo
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
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
