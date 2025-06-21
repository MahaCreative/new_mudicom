import InputText from "@/Components/InputText";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Index() {
    const { profile } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        phone: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onError: (err) => {
                console.log(err);
            },
        });
    };
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4">
                {/* logo */}
                <div className="flex items-center mb-8">
                    <img
                        src={"/storage/" + profile.logo}
                        alt={"Mudicom Logo"}
                        className="w-16 h-16 mr-2"
                    />
                </div>

                {/* card */}
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-center text-blue-800">
                        Register
                    </h1>
                    <p className="text-center text-blue-800/70 mt-1 mb-6">
                        Register to your account
                    </p>

                    <form onSubmit={submitHandler} className="space-y-4">
                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <InputText
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData({ ...data, email: e.target.value })
                                }
                                required
                                placeholder="you@example.com"
                            />
                            <p className="text-red-500 italic text-sm">
                                {errors.email}
                            </p>
                        </div>

                        {/* password */}
                        <div>
                            <label className="block text-sm font-medium">
                                Phone Number (WhatsApp Only)
                            </label>
                            <InputText
                                value={data.phone}
                                errors={errors.phone}
                                type="number"
                                placeholder="+6285334123"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        phone: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Password
                            </label>
                            <InputText
                                value={data.password}
                                errors={errors.password}
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        {/* forgot password */}
                        <div className="text-right">
                            <Link
                                href={route("forgot_password")}
                                className="text-sm text-blue-700 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* submit */}
                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold hover:opacity-90 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* sign‑up link */}
                    <p className="mt-6 text-center text-sm">
                        Login jika punya akun{" "}
                        <Link
                            as="button"
                            href={route("login")}
                            className="font-semibold text-blue-700 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
