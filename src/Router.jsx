import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
    const localStorageData = localStorage.getItem("user") || "";
    const user = localStorageData && JSON.parse(localStorageData);
    const isLoggedIn = user?.accessToken; // or any flag you store in user


    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            {/* Home Page */}
            <Route path="/home" element={<Home />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

        </Routes>
    );
}
