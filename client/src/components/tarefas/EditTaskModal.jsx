// EditTarefa.jsx

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import SelectList from "../SelectList";
import Button from "../Buttons.jsx";
import { atualizaTarefa } from "../../services/tarefaService.js";
import { buscatimes } from "../../services/timeService.js";
import { useAuth } from "../../contexts/authContext/index.jsx";

const LISTA = ["PENDENTE", "EM ANDAMENTO", "FINALIZADA"];

const EditTarefa = ({ open, setOpen, tarefa }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);
  const [situacao, setStage] = useState(tarefa?.situacao || LISTA[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(tarefa?.id_time || "");
  const [taskId, setTaskId] = useState(tarefa?._id || ""); 
  useEffect(() => {
    if (user) {
      fetchTimes();
    }
  }, [user]);

  useEffect(() => {
    if (tarefa) {
      setStage(tarefa.situacao || LISTA[0]);
      setSelectedTeam(tarefa.id_time || "");
      setTaskId(tarefa.id || ""); 
    }
  }, [tarefa]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome_tarefa: tarefa?.nome_tarefa || "",
    },
  });

  const fetchTimes = async () => {
    try {
      const times = await buscatimes();
      setTeam(times);
      setSelectedTeam(tarefa?.id_time || times[0]?.id || "");
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (data) => {
    setIsSubmitting(true);

    
    const formData = {
      nome_tarefa: tarefa.nome_tarefa, 
      id_time: tarefa.id_time,  
      situacao,
    };



    try {
      if (!taskId) {
        throw new Error("ID da tarefa não está definido.");
      }
      await atualizaTarefa(taskId, formData);
      alert("Tarefa atualizada com sucesso!");
      resetForm();
      setOpen(false);
    } catch (error) {
      setErrorMessage(`Erro ao atualizar tarefa: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    reset({
      nome_tarefa: "",
    });
    setSelectedTeam("");
    setStage(LISTA[0]);
  };

  return loading ? (
    <>Loading...</>
  ) : (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          EDITAR TAREFA
        </Dialog.Title>
        <div className='mt-2 flex flex-col gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Nome Tarefa
            </label>
            <p className='w-full rounded bg-gray-200 px-3 py-2.5 border border-gray-300 text-gray-900'>
              {tarefa?.nome_tarefa || "Nome da tarefa não disponível"}
            </p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Time
            </label>
            <p className='w-full rounded bg-gray-200 px-3 py-2.5 border border-gray-300 text-gray-900'>
              {team.find((t) => t.id === selectedTeam)?.nome_time || "Time não disponível"}
            </p>
          </div>

          <SelectList
            label='Situação'
            lists={LISTA}
            selected={situacao}
            setSelected={setStage}
          />

          {errorMessage && <div className='text-red-500'>{errorMessage}</div>}

          <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              label='Atualizar Tarefa'
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700'
              disabled={isSubmitting} 
            />
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900'
              onClick={() => setOpen(false)}
              label='Cancelar'
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditTarefa;
