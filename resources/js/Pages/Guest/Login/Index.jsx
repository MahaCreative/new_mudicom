import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Index() {
    const { profile } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
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
                        Login
                    </h1>
                    <p className="text-center text-blue-800/70 mt-1 mb-6">
                        Sign in to your account
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
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData({ ...data, email: e.target.value })
                                }
                                required
                                className="mt-1 w-full rounded-lg border-slate-300 focus:ring-blue-700 focus:border-blue-700"
                                placeholder="you@example.com"
                            />
                            <p className="text-red-500 italic text-sm">
                                {errors.email}
                            </p>
                        </div>

                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                required
                                className="mt-1 w-full rounded-lg border-slate-300 focus:ring-blue-700 focus:border-blue-700"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* forgot password */}
                        <div className="text-right">
                            <Link
                                href={route("forgot_password")}
                                as="button"
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
                            Log In
                        </button>
                    </form>

                    {/* sign‑up link */}
                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            className="font-semibold text-blue-700 hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
