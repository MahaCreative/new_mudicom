import AuthLayout from "@/Layouts/AuthLayout";
import {
    ArrowDownward,
    AttachMoney,
    Face,
    TrendingDown,
    TrendingUp,
} from "@mui/icons-material";

import React, { useState } from "react";
import { formatRupiah } from "../Function/FormatRupiah";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);
export default function Index(props) {
    const count = props.count;
    const grafik_kas = props.grafik_kas;
    const [open, setOpen] = useState(false);
    const chartData = {
        labels: grafik_kas.map((item) => item.bulan), // ['Januari', 'Februari', ...]
        datasets: [
            {
                label: "Pemasukan",
                data: grafik_kas.map((item) => item.pemasukan),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            },
            {
                label: "Pengeluaran",
                data: grafik_kas.map((item) => item.pengeluaran),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || "";
                        const value = context.raw.toLocaleString("id-ID");
                        return `${label}: Rp ${value}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => "Rp " + value.toLocaleString("id-ID"),
                },
            },
        },
    };

    return (
        <div className="py-9 px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 my-3">
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-3xl md:text-3xl lg:text-6xl text-white">
                            <Face color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-xl md:text-3xl lg:text-6xl text-white">
                            {count.siswa}
                        </p>
                    </div>
                    <p className="text-white text-sm md:text-base my-2 py-1 border-t border-b-blue-800 w-full text-center">
                        Jumlah Siswa Terdaftar
                    </p>
                </div>
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-3xl md:text-3xl lg:text-6xl text-white">
                            <Face color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-xl md:text-3xl lg:text-6xl text-white">
                            {count.instruktur}
                        </p>
                    </div>
                    <p className="text-white text-sm md:text-base my-2 py-1 border-t border-b-blue-800 w-full text-center">
                        Jumlah Instruktur Terdaftar
                    </p>
                </div>
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-3xl md:text-3xl lg:text-6xl text-white">
                            <Face color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-xl md:text-3xl lg:text-6xl text-white">
                            {count.petugas}
                        </p>
                    </div>
                    <p className="text-white text-sm md:text-base my-2 py-1 border-t border-b-blue-800 w-full text-center">
                        Jumlah petugas Terdaftar
                    </p>
                </div>
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-3xl md:text-3xl lg:text-6xl text-white">
                            <Face color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-xl md:text-3xl lg:text-6xl text-white">
                            {count.pendaftaran}
                        </p>
                    </div>
                    <p className="text-white text-sm md:text-base my-2 py-1 border-t border-b-blue-800 w-full text-center">
                        Jumlah Pendaftaran Kursus Bulan Ini
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-3xl md:text-xl lg:text-6xl text-white">
                            <AttachMoney color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-xl md:text-3xl lg:text-4xl text-white">
                            {formatRupiah(count.total_kas)}
                        </p>
                    </div>
                    <p className="text-white text-sm md:text-base my-2 py-1 border-t border-b-blue-800 w-full text-center">
                        Total Kas Bulan Ini
                    </p>
                </div>
                <div className="bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-3xl md:text-3xl lg:text-6xl text-white">
                            <TrendingDown color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-xl md:text-3xl lg:text-4xl text-white">
                            {formatRupiah(count.pengeluaran)}
                        </p>
                    </div>
                    <p className="text-white text-sm md:text-base my-2 py-1 border-t border-b-blue-800 w-full text-center">
                        Jumlah Pengeluaran Kas Bulan Ini
                    </p>
                </div>
                <div className="col-span-3 md:col-span-1 bg-blue-500 py-2 drop-shadow-sm px-4 rounded-md flex flex-col justify-center items-center">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-3xl md:text-3xl lg:text-6xl text-white">
                            <TrendingUp color="inherit" fontSize="inherit" />
                        </p>
                        <p className="font-bold text-xl md:text-3xl lg:text-4xl text-white">
                            {formatRupiah(count.pemasukan)}
                        </p>
                    </div>
                    <p className="text-white text-sm md:text-base my-2 py-1 border-t border-b-blue-800 w-full text-center">
                        Jumlah Pemasukan Bulan Ini
                    </p>
                </div>
            </div>
            <div className="py-5 flex justify-between items-center gap-4">
                <div className=" w-full py-2 px-3 rounded-md bg-white border border-primary ">
                    <h2>Grafik Kas Bulanan</h2>
                    <Line data={chartData} options={options} />
                </div>
                <div className=" w-full py-2 px-3 rounded-md bg-white border border-primary ">
                    <h2>Grafik Pendaftaran Kursus Per Kategori</h2>
                    <Line data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
