import React, {useEffect, useState} from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import {LuClipboardEdit} from "react-icons/lu";
import {FaNewspaper, FaUsers} from "react-icons/fa";
import {FaArrowsToDot} from "react-icons/fa6";
import clsx from "clsx";
import {buscaTarefasUser} from "../services/tarefaService";
import {useAuth} from "../contexts/authContext";
import Loading from "../components/Loader";

const TaskTable = () => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };
};

const Dashboard = () => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  let tarefas = {
    total: 0,
    completas: 0,
    andamento: 0,
    pendente: 0,
  };
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      return;
    }
    const tarefas = async () => {
      const tarefaData = await buscaTarefasUser(user.id);
      console.log("tarefaaa", tarefaData.data.length);
      tarefas.total = tarefaData.data.length;
    };
    tarefas();
  }, [user]);
  const stats = [
    {
      _id: "1",
      label: "TOTAL DE TAREFAS",
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
      total: tarefas.total,
    },
    {
      _id: "2",
      label: "TAREFAS COMPLETADAS",
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
      total: tarefas.completas,
    },
    {
      _id: "3",
      label: "TAREFAS EM ANDAMENTO",
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
      total: tarefas.andamento,
    },
    {
      _id: "4",
      label: "PENDÊNCIAS",
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
      total: tarefas.pendente,
    },
  ];
  const Card = ({label, bg, icon, total}) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{total || 0}</span>
          <span className='text-sm text-gray-400'>{"50 no ultimo mes"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return loading ? (
    <Loading />
  ) : (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({icon, bg, label, total}, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}

        <TaskTable />

        {/* /right */}
      </div>
    </div>
  );
};

export default Dashboard;
