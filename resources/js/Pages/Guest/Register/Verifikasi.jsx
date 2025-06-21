import React, { useRef, useState, useEffect } from "react";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import moment from "moment";

export default function Verifikasi(props) {
    const { profile } = usePage().props;
    const { expires_at } = props;

    const { data, setData, post, errors } = useForm({
        otp: ["", "", "", "", "", ""],
    });

    const inputRefs = Array(6)
        .fill(0)
        .map(() => useRef());

    const [timeLeft, setTimeLeft] = useState(null);
    const [expired, setExpired] = useState(false);

    // Inisialisasi countdown saat komponen dimount
    useEffect(() => {
        const expiry = new Date(expires_at).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = expiry - now;

            if (distance <= 0) {
                setExpired(true);
                setTimeLeft("00:00");
                return;
            }

            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft(
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                    2,
                    "0"
                )}`
            );
        };

        updateCountdown(); // ✅ Langsung hitung sekali dulu di awal render

        const interval = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => clearInterval(interval);
    }, [expires_at]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...data.otp];
        newOtp[index] = value;
        setData("otp", newOtp);
        if (value && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !data.otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expired) return;
        post(route("otp.verify"), {
            onError: (err) => console.log(err),
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4">
            <div className="flex items-center mb-8">
                <img
                    src={`/storage/${profile.logo}`}
                    alt="Logo"
                    className="w-16 h-16 mr-2"
                />
            </div>

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-blue-800">
                    Verifikasi OTP
                </h1>
                <p className="text-center text-blue-800/70 mt-1 mb-4">
                    Masukkan 6 digit kode OTP
                </p>

                {timeLeft && (
                    <p className="text-center text-sm text-red-500 mb-4">
                        Kode OTP berlaku sampai: <strong>{timeLeft}</strong>
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between space-x-2">
                        {data.otp.map((value, i) => (
                            <input
                                key={i}
                                ref={inputRefs[i]}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                className="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-blue-500"
                                value={value}
                                onChange={(e) =>
                                    handleChange(i, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                disabled={expired}
                            />
                        ))}
                    </div>
                    {errors.otp && (
                        <p className="text-sm text-red-600">{errors.otp}</p>
                    )}

                    {!expired ? (
                        <Link
                            href={route("store_verifikasi")}
                            as="button"
                            method="post"
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold hover:opacity-90 transition"
                        >
                            Verifikasi OTP
                        </Link>
                    ) : (
                        <Link
                            as="button"
                            href={route("resent-otp")}
                            className="w-full py-2.5 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
                        >
                            Kirim Ulang OTP {moment(new Date()).format("H:m")}
                        </Link>
                    )}
                </form>
            </div>
        </div>
    );
}
