import InputText from "@/Components/InputText";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from "@inertiajs/react";
import { Facebook, Telegram, Web, X } from "@mui/icons-material";
import React from "react";

export default function About(props) {
    const { profile } = usePage().props;
    const visi = props.visi;
    const misi = props.misi;
    const sosmed = props.sosmed;
    return (
        <div>
            {/* Jumbotron */}
            <div className="bg-primary relative h-[400px] w-full flex flex-col justify-center items-center">
                <h1 className="font-bold text-white text-4xl">Tentang Kami</h1>
            </div>
            <div className="py-5 flex flex-col justify-center items-center">
                <img
                    src={"/storage/" + profile.thumbnail}
                    alt=""
                    className="w-full md:w-1/2 h-[300px] object-cover"
                />

                <div className="bg-white pz-4 flex justify-between flex-col md:flex-row usetransisi">
                    <div className="py-6 px-4 md:px-8 lg:px-16 w-full md:w-[50%] lg:w-[70%]">
                        <p
                            className="font-light font-nunito text-lg"
                            dangerouslySetInnerHTML={{
                                __html: profile.deskripsi,
                            }}
                        />
                    </div>
                    <div className="lw-full md:w-[50%] g:w-[30%] py-6 px-4">
                        <div className=" py-3 bg-white rounded-md drop-shadow-md px-4 mt-5 flex flex-col gap-3">
                            <div className="flex gap-x-2 items-center">
                                {sosmed.map((item, key) => (
                                    <div>
                                        <Link
                                            href={item.link}
                                            className="bg-primary capitalize flex gap-x-1 justify-center items-center px-3 py-2 rounded-full text-white leading-3"
                                        >
                                            {item.kategori == "facebook" ? (
                                                <Facebook />
                                            ) : item.kategori == "telegram" ? (
                                                <Telegram />
                                            ) : item.kategori == "x" ? (
                                                <X />
                                            ) : (
                                                <Web />
                                            )}
                                            <p>{item.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-x-3 items-center  ">
                                <div className="max-w-4xl mx-auto px-4">
                                    <h1 className="font-bold text-primary text-3xl text-center mb-6">
                                        Visi dan Misi Kami
                                    </h1>

                                    {/* Visi */}
                                    <div className="relative pl-6 border-l-4 border-primary mb-2">
                                        <div className="mb-2 ml-4">
                                            <h2 className="text-xl font-semibold text-primary">
                                                Visi
                                            </h2>
                                            <p className="mt-1 text-gray-700 text-lg">
                                                {visi.visi}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Misi Timeline */}
                                    <div className="relative pl-6 border-l-4 border-primary">
                                        {misi.map((item, key) => (
                                            <div
                                                key={key}
                                                className="mb-3 ml-4 relative"
                                            >
                                                <div className="w-4 h-4 bg-primary rounded-full absolute -left-[50px] top-1.5"></div>
                                                <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-opacity-90">
                                                    <p className="text-base tracking-tighter">
                                                        {item.misi}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-primary font-heebo">
                                Kontak Kami
                            </h1>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Ullam sequi quam enim placeat
                                harum magnam minus ab, quisquam atque
                                voluptatibus quis dolorem delectus minima
                            </p>
                            <div className="flex gap-x-3 items-center">
                                <InputText label="*Nama Lengkap" />
                                <InputText label="*Email" />
                            </div>
                            <InputText
                                rows={4}
                                multiline
                                className="px-2"
                                placeholder="isikan pesan anda disini"
                                label="Pesan"
                            />
                            <button className="w-[100px] bg-primary text-white font-bold py-3 rounded-md">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
About.layout = (page) => <GuestLayout children={page} />;
