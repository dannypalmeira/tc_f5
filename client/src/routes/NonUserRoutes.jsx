import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/paginas/Login";
import CreateUser from "../components/paginas/CreateUser";

export default function NonUserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/*" element={<Login />} />
        </Routes>
    );
};
