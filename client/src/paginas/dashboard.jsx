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
  const [tarefas, setTarefas] = useState({
    total: 0,
    completas: 0,
    andamento: 0,
    pendente: 0,
  });

  useEffect(() => {
    if (user) {
      buscaTarefas();
    } else {
      return;
    }
  }, [user]);

  const buscaTarefas = async () => {
    const tarefaData = await buscaTarefasUser(user.id);
    const newTarefas = {
      total: tarefaData.data.length,
      totalMinutos: 0,
      completas: 0,
      completasMinutos: 0,
      andamento: 0,
      andamentoMinutos: 0,
      pendente: 0,
      pendenteMinutos: 0,
    };
    tarefaData.data.forEach((tarefa) => {
      let minutos = 0;
      if (tarefa.prazo === "BAIXA") {
        minutos = 60;
      } else if (tarefa.prazo === "MEDIA") {
        minutos = 30;
      } else if (tarefa.prazo === "ALTA") {
        minutos = 10;
      }

      newTarefas.totalMinutos += minutos;
      switch (tarefa.situacao) {
        case "PENDENTE":
          newTarefas.pendente++;
          newTarefas.pendenteMinutos += minutos;
          break;
        case "EM ANDAMENTO":
          newTarefas.andamento++;
          newTarefas.andamentoMinutos += minutos;
          break;
        case "FINALIZADA":
          newTarefas.completas++;
          newTarefas.completasMinutos += minutos;
          break;
        default:
          break;
      }
    });
    setTarefas(newTarefas);
    setLoading(false);
  };
  // const stats = [
  //   {
  //     _id: "1",
  //     label: "TOTAL DE TAREFAS",
  //     icon: <FaNewspaper />,
  //     bg: "bg-[#1d4ed8]",
  //     total: tarefas.total,
  //   },
  //   {
  //     _id: "2",
  //     label: "TAREFAS COMPLETADAS",
  //     icon: <MdAdminPanelSettings />,
  //     bg: "bg-[#0f766e]",
  //     total: tarefas.completas,
  //   },
  //   {
  //     _id: "3",
  //     label: "TAREFAS EM ANDAMENTO",
  //     icon: <LuClipboardEdit />,
  //     bg: "bg-[#f59e0b]",
  //     total: tarefas.andamento,
  //   },
  //   {
  //     _id: "4",
  //     label: "PENDÊNCIAS",
  //     icon: <FaArrowsToDot />,
  //     bg: "bg-[#be185d]" || 0,
  //     total: tarefas.pendente,
  //   },
  // ];

  const Card = ({label, bg, icon, total, tempo}) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{total || 0}</span>
          <span className='text-sm text-gray-400'>{`${tempo} minutos para tarefas`}</span>
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
        <Card
          label='TOTAL DE TAREFAS'
          bg='bg-[#1d4ed8]'
          icon={<FaNewspaper />}
          total={tarefas.total}
          tempo={tarefas.totalMinutos}
        />
        <Card
          label='TAREFAS COMPLETAS'
          bg='bg-[#0f766e]'
          icon={<MdAdminPanelSettings />}
          total={tarefas.completas}
          tempo={tarefas.completasMinutos}
        />
        <Card
          label='TAREFAS EM ANDAMENTO'
          bg='bg-[#f59e0b]'
          icon={<LuClipboardEdit />}
          total={tarefas.andamento}
          tempo={tarefas.andamentoMinutos}
        />
        <Card
          label='PENDÊNCIAS'
          bg='bg-[#be185d]'
          icon={<FaArrowsToDot />}
          total={tarefas.pendente}
          tempo={tarefas.pendenteMinutos}
        />

        {/* {stats.map(({icon, bg, label, total}, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))} */}
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
