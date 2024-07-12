import React, { useState } from "react";
import clsx from "clsx";
import Button from "../Buttons";
import { IoMdAdd } from "react-icons/io";
import AddTarefa from "../tarefas/addTarefa";

const Tarefas = () => {
    
  const [open, setOpen] = useState(false);

    return (
        <>
        <h2 className={clsx("text-2xl font-semibold capitalize")}>
            Tarefas
        </h2>
        <Button
        onClick={() => setOpen(true)}
        label='Criar Tarefa'
        icon={<IoMdAdd className='text-lg' />}
        className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
      />
      <AddTarefa open={open} setOpen={setOpen} />
      </>
      );
};

export default Tarefas; 