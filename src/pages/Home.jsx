import React from 'react'
import UserCard from '../components/UserCard'
import { Navigate } from 'react-router-dom';

const Home = () => {
    const localStorageData = localStorage.getItem("user") || "";
    const user = localStorageData && JSON.parse(localStorageData);
    const { accessToken } = user;


    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className='flex items-center  justify-center bg-main-bg !h-full '>
            <div className='flex flex-col gap-y-16'>
                <h2 className="text-2xl text-center font-semibold">
                    Welcome to <br />
                    <span className="text-primary font-black">Unstop</span>
                </h2>
                <UserCard />
            </div>
        </div>
    )
}

export default Home