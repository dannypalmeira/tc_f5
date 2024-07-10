import React from "react";
import { useAuth } from "../../contexts/authContext";

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div className='text-2xl font-bold pt-14'>Olá {currentUser.displayName ? currentUser.displayName : currentUser.email}, você está logado.</div>
    )
};

export default Home;