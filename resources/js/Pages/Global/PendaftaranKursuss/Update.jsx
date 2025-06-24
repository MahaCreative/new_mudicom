import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Tables from "@/Components/Tables";
import useRealtimeJam from "@/Hook/RealtimeJam";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, router, useForm } from "@inertiajs/react";
import {
    Add,
    CreateNewFolder,
    Delete,
    Print,
    Refresh,
    Save,
    Search,
} from "@mui/icons-material";
import { Badge, InputLabel, MenuItem, Tooltip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { InstrukturRecoil } from "./Recoil/DataInstrukturRecoil";
import { DataSiswaRecoil } from "./Recoil/DataSiswaRecoil";
import { ModalInstrukturRecoil } from "./Recoil/ModalInstrukturRecoil";
import ComponentInstruktur from "./Modal/ComponentInstruktur";
import { FormDataRecoil } from "./Recoil/FormDataRecoil";
import { ModalSiswaRecoil } from "./Recoil/ModalSiswaRecoil";
import ComponentSiswa from "./Modal/ComponentSiswa";
import { DataPaketRecoil } from "./Recoil/DataPaketRecoil";
import { formatRupiah } from "@/Pages/Function/FormatRupiah";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import useSweetAlertFunction from "@/Hook/UseSweetAlertFunction";
import { ModalPaketRecoil } from "./Recoil/ModalPaketRecoil";
import ComponentPaket from "./Modal/ComponentPaket";
import { ModalPembayaranRecoil } from "./Recoil/ModalPembayaranRecoil";
import ComponentPembayaran from "./Modal/ComponentPembayaran";
import { ResponsePesananRecoil } from "./Recoil/ResponsePesanan";

export default function Update(props) {
    const pendaftaran = props.pendaftaran;
    const kantor_cabang = props.kantor_cabang;
    const payment = props.payment;
    const detail = props.detail;
    const siswa = props.siswa;
    const kategori = props.kategori;
    const kd_transaksi = props.kd_transaksi;
    const showNotif = useSweetAlertNotification();
    const showNotiFunction = useSweetAlertFunction();
    const kd_paket_ref = useRef([]);

    const { formattedTime, formattedDate } = useRealtimeJam();
    const [data, setData] = useRecoilState(FormDataRecoil);
    const [errors, setErrors] = useState([]);
    const [dataResponse, setDataResponse] = useRecoilState(
        ResponsePesananRecoil
    );
    const [dataSiswa, setDataSiswa] = useRecoilState(DataSiswaRecoil);
    const [dataInstruktur, setDataInstruktur] =
        useRecoilState(InstrukturRecoil);
    const [dataPaket, setDataPaket] = useRecoilState(DataPaketRecoil);
    const resetDataSiswa = useResetRecoilState(DataSiswaRecoil);
    const resetDataInstruktur = useResetRecoilState(InstrukturRecoil);
    const resetData = useResetRecoilState(FormDataRecoil);
    const resetResponse = useResetRecoilState(ResponsePesananRecoil);
    const [showModalPembayaran, setShowModalPembayaran] = useRecoilState(
        ModalPembayaranRecoil
    );
    const [showModalInstruktur, setShowModalInstruktur] = useRecoilState(
        ModalInstrukturRecoil
    );
    const [showModalSiswa, setShowModalSiswa] =
        useRecoilState(ModalSiswaRecoil);
    const [showModalPaket, setShowModalPaket] =
        useRecoilState(ModalPaketRecoil);
    const searchInstruktur = async (index) => {
        try {
            const response = await axios.get(route("api.data-instruktur"), {
                params: {
                    search: data.paket[index].nama_instruktur,
                    kd_paket: data.paket[index].kd_paket,
                },
            });

            const updateData = [...data.paket];
            if (response.data.length == 1) {
                setDataInstruktur(response.data[0]);
                const newData = {
                    nama_instruktur: response.data[0].nama_lengkap,
                    kd_instruktur: response.data[0].kd_instruktur,
                };
                updateData[index] = {
                    ...updateData[index],
                    ...newData,
                };
                setData((prev) => ({
                    ...prev,

                    paket: updateData,
                }));
            } else {
                setDataInstruktur(response.data);
                setShowModalInstruktur(true);
            }
        } catch (err) {
            setShowModalInstruktur(false);
            alert(
                "Ups terjadi kesalahan saat melakukan pencarian data instruktur, silahkan lakukan kembali"
            );
        }
    };
    const searchSiswa = async () => {
        try {
            const response = await axios.get(route("api.get-data-siswa"), {
                params: {
                    search: data.siswa,
                },
            });

            if (response.data.length == 1) {
                setDataSiswa(response.data[0]);
                setData((prev) => ({
                    ...prev,
                    nama_siswa: response.data[0].nama_lengkap,
                    kd_siswa: response.data[0].kd_siswa,
                    nik_siswa: response.data[0].nik_ktp,
                    telp_siswa: response.data[0].telp,
                    alamat_siswa: response.data[0].alamat,
                }));
            } else {
                setDataSiswa(response.data);
                setData((prev) => ({
                    ...prev,
                    nama_siswa: "",
                    kd_siswa: "",
                    nik_siswa: "",
                    telp_siswa: "",
                    alamat_siswa: "",
                }));
                setShowModalSiswa(true);
            }
        } catch (err) {
            console.log(err);

            setShowModalSiswa(false);
            alert(
                "Ups terjadi kesalahan saat melakukan pencarian data siswa, silahkan lakukan kembali" +
                    err
            );
        }
    };
    const enterInstrukturHandler = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchInstruktur(index);
            setData((prev) => ({ ...prev, index_form: index }));
        }
    };
    const enterSiswaHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchSiswa();
        }
    };
    const handlePaketChange = (index, field, value) => {
        // Clone array dan item di dalamnya agar tidak modify reference ke recoil langsung
        const updated = [...data.paket];

        if (!updated[index]) {
            updated[index] = {};
        }

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setData({ ...data, paket: updated });
    };
    const addData = (index) => {
        if (
            data.paket[index].kd_paket == "" ||
            data.paket[index].nama_paket == "" ||
            data.paket[index].kd_instruktur == "" ||
            data.paket[index].nama_instruktur == ""
        ) {
            alert("isikan paket terlebih dahulu");
        } else {
            const emptyRow = {
                kd_paket: "",
                nama_paket: "",
                kd_instruktur: "",
                nama_instruktur: "",
                jumlah_pertemuan: "",
                jumlah_materi: "",
                harga: "",
                diskont: "",
                total_harga: "",
            };
            const newPaketList = [emptyRow, ...data.paket];
            setData({ ...data, paket: newPaketList });
        }
    };

    const handleChangeHarga = (index, value) => {
        const updatedPaket = [...data.paket];
        const newHarga = parseInt(value) || 0;
        const diskon = parseInt(data.paket[index].diskont) || 0;
        const new_total_harga = newHarga - newHarga * (diskon / 100);
        updatedPaket[index] = {
            ...updatedPaket[index],
            harga: newHarga,
            total_harga: new_total_harga,
        };
        // Hitung grand total dari total_harga semua paket
        const grand_total = updatedPaket.reduce((sum, item) => {
            return sum + (parseFloat(item.total_harga) || 0);
        }, 0);

        // Simpan kembali ke state
        setData({
            ...data,
            paket: updatedPaket,
            total_harga: grand_total,
        });
        setData({
            ...data,
            paket: updatedPaket,
            total_harga: grand_total,
            total_netto: grand_total,
        });
    };
    const handleDiscountChange = (index, value) => {
        const updatedPaket = [...data.paket];
        const diskonPersen = parseFloat(value) || 0;

        const harga = parseInt(updatedPaket[index].harga) || 0;
        const diskonRupiah = Math.round((harga * diskonPersen) / 100);
        const netto = harga - diskonRupiah;

        updatedPaket[index] = {
            ...updatedPaket[index],
            diskont: diskonPersen,
            total_harga: netto,
        };
        const grad_diskont = updatedPaket.reduce((sum, p) => {
            return sum + (parseFloat(p.diskont) || 0);
        }, 0);

        const total_netto = updatedPaket.reduce((sum, p) => {
            return sum + (parseInt(p.total_harga) || 0);
        }, 0);

        setData({
            ...data,
            paket: updatedPaket,
            total_discount: grad_diskont,
            total_netto,
        });
    };

    const searchPaket = async (value, index) => {
        try {
            const response = await axios.get(route("api.get-data-paket"), {
                params: {
                    search: value,
                    kategori: data.kategori_kursus,
                },
            });
            if (response.data.length == 1) {
                const existingId = data.paket[index]?.id || null;
                const newPaket = {
                    id: existingId, // pertahankan id jika ada
                    kd_paket: response.data[0].kd_paket,
                    nama_paket: response.data[0].nama_paket,
                    jumlah_pertemuan: response.data[0].total_pertemuan,
                    jumlah_materi: response.data[0].total_materi,
                    harga: response.data[0].harga,
                    diskont: 0,
                    total_harga: response.data[0].harga,
                };

                const newPaketList = [...data.paket];
                newPaketList[index] = newPaket; // karena kita menambahkan 1 row di depan

                const updatedData = {
                    ...data,
                    paket: newPaketList,
                    total_pertemuan:
                        data.paket.length === 1
                            ? parseInt(response.data[0].total_pertemuan)
                            : parseInt(data.total_pertemuan) +
                              response.data[0].total_pertemuan,
                    total_materi:
                        data.paket.length === 1
                            ? parseInt(response.data[0].total_materi)
                            : parseInt(data.total_materi) +
                              response.data[0].total_materi,
                    total_harga:
                        data.paket.length === 1
                            ? parseInt(response.data[0].harga)
                            : parseInt(data.total_harga) +
                              response.data[0].harga,
                    total_netto:
                        data.paket.length === 1
                            ? parseInt(response.data[0].harga)
                            : parseInt(data.total_netto) +
                              response.data[0].harga,
                    total_discount:
                        data.paket.length === 1
                            ? 0
                            : parseInt(data.total_discount) + 0,
                };

                setData(updatedData);

                setTimeout(() => {
                    kd_paket_ref.current[0]?.focus(); // Fokus ke baris paling awal
                }, 0);
            } else {
                setShowModalPaket(true);
                setDataPaket(response.data);
            }
        } catch (err) {}
    };

    const enterPaketHandler = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();

            searchPaket(data.paket[index].kd_paket, index);
        }
    };

    useEffect(() => {
        if (!detail || !pendaftaran || !siswa) return; // guard clause

        const paket = detail.map((item) => ({
            id: item.id,
            nama_instruktur: item.instruktur?.nama_lengkap || "",
            kd_instruktur: item.instruktur?.kd_instruktur || "",
            kd_paket: item.paket.kd_paket,
            nama_paket: item.paket.nama_paket,
            jumlah_pertemuan: item.paket.total_pertemuan,
            jumlah_materi: item.paket.total_materi,
            harga: item.harga,
            diskont: item.diskont,
            total_harga: item.harga - (item.harga * item.diskont) / 100,
        }));

        setData((prev) => ({
            ...(prev ?? {}), // jika prev null/undefined, jadi {}
            no_transaksi: kd_transaksi,
            tanggal: moment(new Date()).format("D-M-Y"),
            siswa: siswa.nama_lengkap,
            kd_siswa: siswa.kd_siswa,
            nik_siswa: siswa.nik_ktp,
            nama_siswa: siswa.nama_lengkap,
            alamat_siswa: siswa.alamat,
            telp_siswa: siswa.telp,
            paket: paket,
            kantor_cabang_id: pendaftaran.kantor_cabang_id,
            status_konfirmasi: pendaftaran.status_konfirmasi,
            total_pertemuan: pendaftaran.total_pertemuan,
            total_harga: pendaftaran.total_harga,
            total_materi: pendaftaran.total_materi,
            total_netto: pendaftaran.total_netto,
            total_discount: pendaftaran.total_discount,
        }));
    }, []);
    const simpanHandler = () => {
        router.post(route("admin.update-pendaftaran-kursus"), { ...data });
    };
    const removeData = async (index) => {};
    const deleteData = (index) => {
        router.delete(
            route("admin.delete-detail-pendaftaran-kursus", {
                id: data.paket[index].id,
            })
        );
    };
    console.log(data);

    return (
        <div>
            <ComponentPembayaran />
            <ComponentInstruktur kategori={kategori} />
            <ComponentPaket kategori={kategori} paket_ref={kd_paket_ref} />
            <ComponentSiswa />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    simpanHandler();
                }}
                className="py-2 px-8 w-full"
            >
                {/* <h1 className="text-blue-950 font-semibold text-3xl tracking-tight">
                    Formulir Pendaftaran
                </h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium libero vel eaque facilis laboriosam eum saepe,
                    ea voluptate non, sapiente cupiditate eveniet nihil facere
                    dolore molestias veritatis rem atque perferendis.
                </p> */}
                <div className="py-2 px-4 my-3 bg-white rounded-md drop-shadow-md border border-gray-300">
                    {/* <h3 className="text-center text-3xl font-medium text-blue-600 tracking-tighter my-4">
                        Formulir Pendaftaran Kursus
                    </h3> */}
                    <div className="flex gap-x-3 items-start justify-between">
                        <div className="flex gap-x-3 itesm-start">
                            <div className="">
                                <h3 className="text-blue-500">
                                    Informasi Transaksi
                                </h3>
                                <div className="flex flex-col gap-y-1 ]">
                                    <div className="flex gap-x-3 items-center">
                                        <InputLabel
                                            id="no_transkasi"
                                            className="w-[140px] text-right"
                                        >
                                            No Transaksi :
                                        </InputLabel>
                                        <InputText
                                            disabled
                                            id="no_transaksi"
                                            name="no_transaksi"
                                            value={data.no_transaksi}
                                        />
                                    </div>
                                    <div className="flex gap-x-3 items-center">
                                        <InputLabel
                                            id="tanggal"
                                            className="w-[140px] text-right"
                                        >
                                            Tanggal :
                                        </InputLabel>
                                        <InputText
                                            disabled
                                            value={data.tanggal}
                                        />
                                    </div>

                                    {/* siswa */}
                                    <div className="flex gap-x-3 items-center">
                                        <InputLabel
                                            id="siswa"
                                            name="siswa"
                                            className="w-[140px] text-right"
                                        >
                                            Nama Siswa :
                                        </InputLabel>
                                        <InputText
                                            disabled={
                                                dataResponse == null
                                                    ? false
                                                    : true
                                            }
                                            name="siswa"
                                            id="siswa"
                                            value={data.siswa}
                                            errors={errors?.siswa}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    [e.target.name]:
                                                        e.target.value,
                                                }))
                                            }
                                            onKeyDown={enterSiswaHandler}
                                        />
                                        <div className="flex gap-x-2">
                                            <Tooltip title="Cari Siswa">
                                                <button
                                                    type="button"
                                                    disabled={
                                                        dataResponse == null
                                                            ? false
                                                            : true
                                                    }
                                                    onClick={() =>
                                                        searchSiswa()
                                                    }
                                                    className="py-2 px-2 text-xl leading-3 rounded-md bg-gradient-to-tl from-gray-200 via-gray-300 to-gray-300 hover:bg-gray-300 usetransisi text-blue-900"
                                                >
                                                    <Search
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* show data instruktur dan siswa */}
                            <div>
                                {data.nama_siswa && (
                                    <div>
                                        <h3 className="text-blue-500">
                                            Informasi Siswa
                                        </h3>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="kd_siswa"
                                                className="w-[140px] text-right"
                                            >
                                                Kode Siswa :
                                            </InputLabel>
                                            <InputText
                                                disabled
                                                id="kd_siswa"
                                                name="kd_siswa"
                                                value={data.kd_siswa}
                                            />
                                        </div>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="nik_siswa"
                                                className="w-[140px] text-right"
                                            >
                                                NIK Siswa :
                                            </InputLabel>
                                            <InputText
                                                disabled
                                                id="nik_siswa"
                                                name="nik_siswa"
                                                value={data.nik_siswa}
                                            />
                                        </div>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="nama_siswa"
                                                className="w-[140px] text-right"
                                            >
                                                Nama Siswa :
                                            </InputLabel>
                                            <InputText
                                                disabled
                                                id="nama_siswa"
                                                name="nama_siswa"
                                                value={data.nama_siswa}
                                            />
                                        </div>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="alamat_siswa"
                                                className="w-[140px] text-right"
                                            >
                                                Alamat :
                                            </InputLabel>
                                            <InputText
                                                id="alamat_siswa"
                                                name="alamat_siswa"
                                                value={data.alamat_siswa}
                                                disabled
                                            />
                                        </div>
                                        <div className="flex gap-x-3 items-center">
                                            <InputLabel
                                                id="telp_siswa"
                                                className="w-[140px] text-right"
                                            >
                                                Telp / HP :
                                            </InputLabel>
                                            <InputText
                                                id="telp_siswa"
                                                name="telp_siswa"
                                                value={data.telp_siswa}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col gap-y-1 ]">
                                <div className="flex gap-x-3 items-center">
                                    <InputLabel
                                        id="no_transkasi"
                                        className="w-[140px] text-right"
                                    >
                                        Jam :
                                    </InputLabel>
                                    <InputText
                                        disabled
                                        id="no_transaksi"
                                        name="no_transaksi"
                                        value={formattedTime}
                                    />
                                </div>
                                <div className="flex gap-x-3 items-center">
                                    <InputLabel
                                        id="tanggal"
                                        className="w-[140px] text-right"
                                    >
                                        User :
                                    </InputLabel>
                                    <InputText disabled value={data.user} />
                                </div>
                                <div className="flex gap-x-3 items-center my-3">
                                    <InputLabel
                                        id="kantor_cabang_id"
                                        className="w-[290px] text-right"
                                    >
                                        Kantor Cabang :
                                    </InputLabel>
                                    <div className="w-full">
                                        <SelectOption
                                            required
                                            className={"w-[80%]"}
                                            label="Kantor"
                                            name="kantor_cabang_id"
                                            value={data.kantor_cabang_id}
                                            errors={errors.kantor_cabang_id}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    [e.target.name]:
                                                        e.target.value,
                                                }))
                                            }
                                        >
                                            <MenuItem value="">
                                                Pilih Kantor
                                            </MenuItem>
                                            {kantor_cabang.map((item, key) => (
                                                <MenuItem
                                                    key={key}
                                                    value={item.id}
                                                    className="capitalize"
                                                >
                                                    {item.nama +
                                                        " | " +
                                                        item.status}
                                                </MenuItem>
                                            ))}
                                        </SelectOption>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 items-center my-3">
                                    <InputLabel
                                        id="status_konfirmasi"
                                        className="w-[290px] text-right"
                                    >
                                        Status Konfirmasi :
                                    </InputLabel>
                                    <div className="w-full">
                                        <SelectOption
                                            className={"w-[80%]"}
                                            label="Status Konfirmasi"
                                            name="status_konfirmasi"
                                            value={data.status_konfirmasi}
                                            errors={errors.status_konfirmasi}
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    [e.target.name]:
                                                        e.target.value,
                                                }))
                                            }
                                        >
                                            <MenuItem value="">
                                                Pilih Status Konfirmasi
                                            </MenuItem>
                                            <MenuItem value="menunggu konfirmasi">
                                                menunggu konfirmasi
                                            </MenuItem>
                                            <MenuItem value="terima">
                                                terima
                                            </MenuItem>
                                            <MenuItem value="tolak">
                                                tolak
                                            </MenuItem>
                                        </SelectOption>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-3 min-h-[100px] max-h-[300px] overflow-y-auto">
                        <Tables>
                            <thead>
                                <tr>
                                    <Tables.Th className={"text-xs"}>
                                        #
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Kd Paket
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Nama Paket
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Nama Peserta
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Instruktur
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        <p className="text-center">
                                            Materi / Pertemuan
                                        </p>
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Harga
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Discount %
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Total Harga
                                    </Tables.Th>
                                    <Tables.Th className={"text-xs"}>
                                        Aksi
                                    </Tables.Th>
                                </tr>
                            </thead>
                            <Tables.Tbody>
                                {data?.paket?.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index == 0
                                                ? ""
                                                : "bg-blue-100 hover:bg-blue-200"
                                        } `}
                                    >
                                        <Tables.Td>{index + 1}</Tables.Td>
                                        <Tables.Td>
                                            <div className="w-[70px]">
                                                <InputText
                                                    required
                                                    disabled={
                                                        pendaftaran.type_pesanan ==
                                                        "online"
                                                            ? true
                                                            : false
                                                    }
                                                    inputRef={(el) =>
                                                        (kd_paket_ref.current[
                                                            index
                                                        ] = el)
                                                    }
                                                    size="small"
                                                    value={item.kd_paket}
                                                    onChange={(e) =>
                                                        handlePaketChange(
                                                            index,
                                                            "kd_paket",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) =>
                                                        enterPaketHandler(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <div className="w-[150px] text-xs capitalize">
                                                {item.nama_paket}
                                            </div>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <div className="w-[150px] text-xs capitalize">
                                                {data.nama_siswa}
                                            </div>
                                        </Tables.Td>
                                        <Tables.Td className={"text-center"}>
                                            <InputText
                                                required
                                                disabled={
                                                    dataResponse == null
                                                        ? false
                                                        : true
                                                }
                                                value={
                                                    data?.paket[index]
                                                        .nama_instruktur
                                                }
                                                onChange={(e) => {
                                                    const updatePaket = [
                                                        ...data.paket,
                                                    ];
                                                    updatePaket[index] = {
                                                        ...updatePaket[index],
                                                        nama_instruktur:
                                                            e.target.value, // atau instruktur jika memang itu yang Anda maksud
                                                    };
                                                    setData((prev) => ({
                                                        ...prev,
                                                        paket: updatePaket,
                                                    }));
                                                }}
                                                onKeyDown={(e) =>
                                                    enterInstrukturHandler(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                        </Tables.Td>
                                        <Tables.Td className={"text-center"}>
                                            <p className="w-[10px] text-center text-xs">
                                                {item.jumlah_pertemuan +
                                                    "X Pertemuan"}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <div className="w-[130px]">
                                                <InputText
                                                    required
                                                    disabled={
                                                        dataResponse == null &&
                                                        pendaftaran.type_pesanan !==
                                                            "online"
                                                            ? false
                                                            : true
                                                    }
                                                    size="small"
                                                    value={item.harga}
                                                    onChange={(e) =>
                                                        handleChangeHarga(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <div className="w-[50px]">
                                                <InputText
                                                    required
                                                    disabled={
                                                        dataResponse == null &&
                                                        pendaftaran.type_pesanan !==
                                                            "online"
                                                            ? false
                                                            : true
                                                    }
                                                    inputProps={{
                                                        min: 0,
                                                        max: 100,
                                                    }}
                                                    type="number"
                                                    size="small"
                                                    value={item.diskont}
                                                    onChange={(e) =>
                                                        handleDiscountChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Tables.Td>
                                        <Tables.Td className={"text-xs"}>
                                            {formatRupiah(item.total_harga)}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {index == 0 && (
                                                <>
                                                    {pendaftaran.type_pesanan !==
                                                        "online" && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                addData(index)
                                                            }
                                                            className="py-1 px-2 rounded-md leading-3 bg-green-500 text-white text-xs"
                                                        >
                                                            <Add
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </button>
                                                    )}
                                                </>
                                            )}

                                            {item.id == null ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeData(index)
                                                        }
                                                        className="py-1 px-2 rounded-md leading-3 bg-orange-500 text-white text-xs"
                                                    >
                                                        <Delete
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {pendaftaran.type_pesanan !==
                                                        "online" && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteData(
                                                                    index
                                                                )
                                                            }
                                                            className="py-1 px-2 rounded-md leading-3 bg-red-500 text-white text-xs"
                                                        >
                                                            <Delete
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </Tables.Td>
                                        {/* Tambah field lain sesuai kebutuhan */}
                                    </tr>
                                ))}
                            </Tables.Tbody>
                        </Tables>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-x-3 flex-col justify-end">
                            <div className="flex flex-row gap-x-3 items-center">
                                <Link className="bg-blue-500 py-2 px-3 rounded-md text-white flex items-center gap-x-3 leading-3">
                                    <Add />
                                    <p>Tambah</p>
                                </Link>

                                <button
                                    type="submit"
                                    className="bg-green-500 py-2 px-3 rounded-md text-white flex items-center gap-x-3 leading-3 disabled:bg-gray-500"
                                >
                                    <Save />
                                    <p>Simpan [END]</p>
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex gap-x-3 items-center">
                                <InputLabel
                                    id="tanggal"
                                    className="w-[140px] text-right"
                                >
                                    Jumlah Pertemuan :
                                </InputLabel>
                                <InputText
                                    className="text-right"
                                    disabled
                                    value={data.total_pertemuan}
                                />
                            </div>
                            <div className="flex gap-x-3 items-center">
                                <InputLabel
                                    id="jumlah_materi"
                                    className="w-[140px] text-right"
                                >
                                    Jumlah Materi :
                                </InputLabel>
                                <InputText
                                    className="text-right"
                                    disabled
                                    value={data.total_materi}
                                />
                            </div>
                            <div className="flex gap-x-3 items-center">
                                <InputLabel
                                    id="tanggal"
                                    className="w-[140px] text-right"
                                >
                                    Total Harga :
                                </InputLabel>
                                <InputText
                                    className="text-right"
                                    disabled
                                    value={formatRupiah(data.total_harga)}
                                />
                            </div>
                            <div className="flex gap-x-3 items-center">
                                <InputLabel
                                    id="tanggal"
                                    className="w-[140px] text-right"
                                >
                                    Total Diskon :
                                </InputLabel>
                                <InputText
                                    className="text-right"
                                    value={data.total_discount + "%"}
                                    disabled
                                />
                            </div>

                            <div className="flex gap-x-3 items-center">
                                <InputLabel
                                    id="tanggal"
                                    className="w-[140px] text-right"
                                >
                                    PPN 11% :
                                </InputLabel>
                                <InputText
                                    className="text-right"
                                    value={data?.total_netto * (11 / 100)}
                                    disabled
                                />
                            </div>

                            <div className="flex gap-x-3 items-center">
                                <InputLabel
                                    id="tanggal"
                                    className="w-[140px] text-right"
                                >
                                    Total Netto :
                                </InputLabel>
                                <InputText
                                    className="text-right"
                                    disabled
                                    value={formatRupiah(
                                        data?.total_netto +
                                            data?.total_netto * (11 / 100)
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

Update.layout = (page) => <AuthLayout children={page} />;
