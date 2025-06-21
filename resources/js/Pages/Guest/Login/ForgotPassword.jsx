// src/pages/ForgotPassword.jsx
import InputText from "@/Components/InputText";
import { Link, usePage } from "@inertiajs/react";
import { InsertEmoticon } from "@mui/icons-material";
import { useState } from "react";

export default function ForgotPassword() {
    const { profile } = usePage().props;
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 👉 TODO: panggil API untuk mengirim link reset password
        console.log("send reset link to:", email);

        // tampilkan konfirmasi
        setSent(true);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4">
            {/* logo */}
            <img
                src={"/storage/" + profile.logo}
                alt="Mudicom Logo"
                className="w-16 h-16 mb-8"
            />

            {/* card */}
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-blue-800">
                    Forgot Password
                </h1>
                <p className="text-center text-blue-800/70 mt-1 mb-6">
                    Enter your email and phone to reset your password
                </p>

                {sent ? (
                    <div className="text-center space-y-6">
                        <p className="text-green-700">
                            We’ve sent a password‑reset link to{" "}
                            <strong>{email}</strong>. Please check your inbox.
                        </p>
                        <Link
                            as="button"
                            href={route("login")}
                            className="inline-block px-6 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:opacity-90 transition"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <InputText
                                required
                                placeholder="example@gmail.com"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Phone Number (WhatsApp Only)
                            </label>
                            <InputText
                                required
                                type="number"
                                placeholder="+62"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold hover:opacity-90 transition"
                        >
                            Send Reset Link
                        </button>

                        <Link
                            as="button"
                            href={route("login")}
                            className="w-full text-sm text-blue-700 hover:underline mt-2"
                        >
                            Back to Login
                        </Link>
                    </form>
                )}
            </div>
        </div>
    );
}
