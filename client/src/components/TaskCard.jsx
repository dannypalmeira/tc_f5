import clsx from "clsx";
import React, {useState} from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import {BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate} from "../utils";
import UserInfo from "./UserInfo";
import TaskDialog from "./tarefas/TaskDialog"

const ICONS = {
  ALTA: <MdKeyboardDoubleArrowUp />,
  MEDIA: <MdKeyboardArrowUp />,
  BAIXA: <MdKeyboardArrowDown />,
};

const TaskCard = ({tarefas}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[tarefas?.prazo]
            )}
          >
            <span className='text-lg'>{ICONS[tarefas?.prazo]}</span>
            <span className='uppercase'>{tarefas?.prazo} Prioridade</span>
          </div>
          <TaskDialog tarefas ={tarefas} />
        </div>

        <>
          <div className='flex items-center gap-2'>
            <div
              className={clsx(
                "w-4 h-4 rounded-full",
                TASK_TYPE[tarefas.situacao]
              )}
            />
            <h4 className='line-clamp-1 text-black'>{tarefas?.nome_tarefa}</h4>
          </div>
        </>

        <div className='w-full border-t border-gray-200 my-2' />
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm text-gray-600'>
            {formatDate(new Date(tarefas?.data_ini))}
          </span>
          <div className='flex flex-row-reverse'>
            {tarefas?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>
        <div className='py-4 border-t border-gray-200'>
          <h5 className='text-base line-clamp-1 text-black'>
            {tarefas?.descricao}
          </h5>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
