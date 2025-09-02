import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserCard = () => {
    const localStorageData = localStorage.getItem("user") || "";
    const user = JSON.parse(localStorageData);
    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate("/login", { replace: true });

    }
    return (
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-2xl p-7  text-center">
            <img
                src={user?.image}
                alt={user?.username}
                className="w-28 h-28 mx-auto rounded-full object-cover bg-red-300"
            />
            <h2 className="mt-4 text-lg font-semibold text-primary capitalize">{`${user?.firstName} ${user?.lastName}`}</h2>
            <p className="text-sm text-[#383838]">{user?.email}</p>
            <p className="text-sm text-[#383838] capitalize">{user?.gender}</p>
            <button
                onClick={onLogout}
                className="mt-4 px-10 py-4 bg-primary text-white rounded-2xl hover:bg-primary transition cursor-pointer"
            >
                Logout
            </button>
        </div>
    )
}

export default UserCard