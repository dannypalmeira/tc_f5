import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../paginas/Login";
import CreateUser from "../paginas/CreateUser";

export default function NonUserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/*" element={<Login />} />
        </Routes>
    );
};
