import React, {useState} from "react";
import {useAuth} from "../contexts/authContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Tarefas from "../paginas/Tarefas";
import Time from "../paginas/Time";
import Dashboard from "../paginas/dashboard";
import Andamento from "../paginas/Andamento";
import Todo from "../paginas/Todo";
import Finalizadas from "../paginas/Finalizadas";
import Profile from "../paginas/Profile";
import {Outlet, Route, Routes} from "react-router-dom";

function Layout() {
  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <Navbar />
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const {user} = useAuth();

  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tarefas' element={<Tarefas />} />
          <Route path='/finalizadas' element={<Finalizadas />} />
          <Route path='/em-andamento' element={<Andamento />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/time' element={<Time />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
}
