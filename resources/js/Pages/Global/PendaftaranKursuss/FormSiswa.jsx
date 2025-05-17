import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import React from "react";

export default function FormSiswa() {
    return (
        <div>
            <div className="py-2 px-4 my-3 bg-white rounded-md drop-shadow-md border border-gray-300">
                <h3 className=" text-LG text-blue-600 tracking-tigh">
                    IDENTITAS PRIBADI CALON PESERTA
                </h3>
                <div className="flex gap-x-3 items-start">
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            NIK KTP{" "}
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Nama Lengkap
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Email
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-3 items-start">
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Telp / HP
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Tempat Lahir
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Tanggal Lahir
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                type="date"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-3 items-start">
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Jenis Kelamin
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <SelectOption>
                                <MenuItem className="capitalize" value="">
                                    Pilih Jenis Kelamin
                                </MenuItem>
                                <MenuItem
                                    className="capitalize"
                                    value="laki-laki"
                                >
                                    laki-laki
                                </MenuItem>
                                <MenuItem
                                    className="capitalize"
                                    value="perempuan"
                                >
                                    perempuan
                                </MenuItem>
                            </SelectOption>
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Agama
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <SelectOption>
                                <MenuItem className="capitalize" value="">
                                    Pilih Agama
                                </MenuItem>
                                <MenuItem className="capitalize" value="islam">
                                    islam
                                </MenuItem>
                                <MenuItem
                                    className="capitalize"
                                    value="kristen"
                                >
                                    kristen
                                </MenuItem>
                                <MenuItem className="capitalize" value="hindu">
                                    hindu
                                </MenuItem>
                            </SelectOption>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-3 items-start">
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Alamat
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <div className="w-full">
                                <InputText
                                    size="small"
                                    variant="filled"
                                    className="w-full"
                                    name="nik"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-3 items-start">
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Desa / Kelurahan
                        </label>
                        <div className="w-full">
                            <div className="w-full">
                                <InputText
                                    size="small"
                                    variant="filled"
                                    className="w-full"
                                    name="nik"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Kecamatan
                        </label>
                        <div className="w-full">
                            <div className="w-full">
                                <InputText
                                    size="small"
                                    variant="filled"
                                    className="w-full"
                                    name="nik"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Kabupaten / Kota
                        </label>
                        <div className="w-full">
                            <div className="w-full">
                                <InputText
                                    size="small"
                                    variant="filled"
                                    className="w-full"
                                    name="nik"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className=" text-LG text-blue-600 tracking-tigh my-3">
                    Nama Orang Tua
                </h3>
                <div className="flex gap-x-3 items-start">
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Nama Ayah
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                    <div className=" my-1 w-full">
                        <label
                            htmlFor=""
                            className="text-blue font-bold w-[250px]"
                        >
                            Nama Ibu
                            <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="w-full">
                            <InputText
                                size="small"
                                variant="filled"
                                className="w-full"
                                name="nik"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
