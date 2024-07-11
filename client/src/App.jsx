import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/home";
import Tarefas from "./components/paginas/Tarefas";
import Time from "./components/paginas/Time";
import Dashboard from "./components/paginas/dashboard";
import Andamento from "./components/paginas/Andamento";
import Todo from "./components/paginas/Todo";
import Finalizadas from "./components/paginas/Finalizadas";

import { AuthProvider } from "./contexts/authContext";
import { Navigate, Outlet, Route, Routes, useRoutes } from "react-router-dom";

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

function App() {

  return (

    <AuthProvider>
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tarefas' element={<Tarefas />} />
          <Route path='/finalizadas' element={<Finalizadas />} />
          <Route path='/em-andamento' element={<Andamento />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/time' element={<Time />} />
        </Route>

        <Route path='/login' element={<Login />} />

   
      </Routes>
    </main>
    </AuthProvider>
  );
}

export default App;