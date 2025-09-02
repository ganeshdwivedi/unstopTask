import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";

const platFormLogin =
    "flex items-center justify-center gap-2 w-full border border-[#E2E2E2] shadow-md py-3 rounded-xl hover:bg-gray-50 transition !font-medium !text-black";

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const localStorageData = localStorage.getItem("user") || "";
    const user = localStorageData && JSON.parse(localStorageData);
    const { accessToken } = user;


    const onSubmit = async (data) => {
        setIsPending(true);
        try {
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            });
            const result = await res.json();
            localStorage.setItem('user', JSON.stringify(result));


            if (res.ok) {
                alert("✅ Login Successful!");
            } else {
                alert(`❌ Login Failed: ${result.message}`);
            }
            navigate("/home", { replace: true });
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Something went wrong!");
        }
        setIsPending(false);
    };

    if (accessToken) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="flex ">
            {/* Left Side Illustration */}
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img
                    src="\images\Illustration.png"
                    alt="login illustration"
                    className="w-3/5"
                />
            </div>

            {/* Right Side Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center">
                <div className="bg-white shadow-lg rounded-2xl p-10 !w-full">
                    <h2 className="text-2xl font-semibold">
                        Welcome to <br />
                        <span className="text-primary font-black">Unstop</span>
                    </h2>

                    {/* Social Login */}
                    <div className="mt-6 space-y-4">
                        <button className={platFormLogin}>
                            <img
                                className="!w-[24px] !h-[24px] object-cover"
                                src="\icons\Frame 1116607310.svg"
                            />{" "}
                            Login with Google
                        </button>
                        <button className={platFormLogin}>
                            <img
                                src="\icons\Vector.svg"
                                className="!w-[13px] !h-[26px] object-cover"
                            />{" "}
                            Login with Facebook
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <hr className="flex-1 border-gray-300" />
                        <span className=" text-sm">OR</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex items-center gap-4 rounded-xl px-4 py-4 bg-main-bg">
                            <img src="\icons\account_circle.svg" />{" "}
                            <div className="flex flex-col items-start !w-full">
                                <label className="!text-sm">username</label>
                                <input
                                    {...register("username", {
                                        required: "Username is required",
                                        validate: (value) =>
                                            value === "emilys" || "Only 'emilys' is allowed",
                                    })}
                                    type="text"
                                    placeholder="Username"
                                    className="w-full bg-transparent outline-none font-semibold"
                                />
                            </div>
                        </div>
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                        <div className="flex items-center gap-4 rounded-xl px-4 py-4 bg-main-bg ">
                            <img src="\icons\mail.svg" />{" "}
                            <div className="flex flex-col items-start !w-full">
                                <label className="!text-sm">Email</label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email (e.g., example@gmail.com)",
                                        },
                                    })}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-transparent outline-none font-semibold "
                                />
                            </div>
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}

                        <div className="flex items-center gap-4  rounded-xl px-4 py-4 bg-main-bg">
                            <img src="\icons\key.svg" />{" "}
                            <div className="flex flex-col items-start !w-full">
                                <label className="!text-sm">Password</label>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
                                        },
                                    })}
                                    type={isPasswordVisible ? 'text' : "password"}
                                    placeholder="Password"
                                    className="w-full bg-transparent  outline-none font-semibold"
                                />
                            </div>
                            <button
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                type="button"
                                className=" hover:text-gray-600"
                            >
                                {!isPasswordVisible ? <IoEye /> : <IoMdEyeOff />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}


                        {/* Remember me & Forgot Password */}
                        <div className="flex items-center  mt-4 justify-between text-sm">
                            <label class="custom-checkbox flex gap-4 items-center">
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#" className="text-primary hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full cursor-pointer bg-primary hover:bg-primary text-white py-3 rounded-lg font-medium shadow-md transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Register */}
                    <p className="text-center text-sm mt-6">
                        Don’t have an account?{" "}
                        <a href="#" className="text-primary hover:underline font-medium">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
