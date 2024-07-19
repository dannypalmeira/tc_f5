import React from "react";
import {MdDashboard, MdOutlinePendingActions, MdTaskAlt} from "react-icons/md";
import {FaTasks, FaTrashAlt, FaUsers} from "react-icons/fa";
import {Link} from "react-router-dom";
import clsx from "clsx";

const linkData = [
  {
    label: "Painel de Controle",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tarefas",
    link: "tarefas",
    icon: <FaTasks />,
  },
  {
    label: "Time",
    link: "time",
    icon: <FaUsers />,
  },
];

const Sidebar = () => {
  const path = location.pathname.split("/")[1];

  const sidebarLinks = linkData;

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({el}) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#2564ed]'>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <span className='text-2xl font-bold text-black'>Grupo O</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
