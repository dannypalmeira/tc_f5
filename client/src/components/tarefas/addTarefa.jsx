import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
<<<<<<< HEAD
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import UserList from "./ListaUsuarios.jsx";
import SelectList from "../SelectList";
import Textbox from "../TextBox.jsx";
import Button from "../Buttons.jsx";
import { addTarefa } from "../../funcoes/funcoes.jsx";
=======
import SelectList from "../SelectList";
import Textbox from "../TextBox.jsx";
import Button from "../Buttons.jsx";
import {apiTimesUrl} from "../../../../server/src/funcoes/apiConfig.js";
import {mapFormDataToCollectionFields} from "../../funcoes/funcoes.jsx";
import {useAuth} from "../../contexts/authContext/index.jsx";
import {cadastraTarefa} from "../../services/tarefaService.js";
>>>>>>> f19ce9c66e7afa550663014f8900801c30502de0

const LISTA = ["PENDENTE", "EM ANDAMENTO", "FINALIZADA"];
const PRIORIDADE = ["ALTA", "MEDIA", "BAIXA"];

const AddTarefa = ({ open, setOpen }) => {
  const tarefa = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(tarefa?.team || []);
  const [situacao, setStage] = useState(tarefa?.situacao?.toUpperCase() || LISTA[0]);
  const [prioridades, setPrioridades] = useState(tarefa?.prazo?.toUpperCase() || PRIORIDADE[2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (data) => {
    setIsSubmitting(true);
  
    try {
<<<<<<< HEAD
      await addTarefa({
        nome_tarefa: data.nome_tarefa,
        team: team,
        situacao: situacao,
        data_ini: data.data_ini,
        descricao: data.descricao,
        prazo: prioridades,
      });
  
      setIsSubmitting(false);
      setOpen(false); 
       
      reset({});
    } catch (error) {
=======
      const tar = await cadastraTarefa(tarefaData);
      alert("Tarefa criada com sucesso!");
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 2600);
    } finally {
>>>>>>> f19ce9c66e7afa550663014f8900801c30502de0
      setIsSubmitting(false);
      setErrorMessage('Erro ao adicionar tarefa: ' + error.message);
    }
  };

  return (
    <>
        <ModalWrapper open={open} setOpen={setOpen}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Dialog.Title
              as='h2'
              className='text-base font-bold leading-6 text-gray-900 mb-4'
            >
              ADICIONAR TAREFA
            </Dialog.Title>
            <div className='mt-2 flex flex-col gap-6'>
              <Textbox
                placeholder='Nome Tarefa'
                type='text'
                name='nome_tarefa'
                label='Nome Tarefa'
                className='w-full rounded'
                register={register}
                required
                error={errors.nomeTarefa}
              />

<<<<<<< HEAD
              <UserList setTeam={setTeam} team={team} />
=======
              <div>
                <label
                  htmlFor='atribuir'
                  className='block text-sm font-medium text-gray-700'
                >
                  Atribuir tarefa a:
                </label>
                <select
                  className='w-full rounded bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full rounded'
                  id='atribuir'
                  value={time}
                  onChange={(e) => setTeam(e.target.value)}
                >
                  {times.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.data.nome_time}
                    </option>
                  ))}
                </select>
              </div>
>>>>>>> f19ce9c66e7afa550663014f8900801c30502de0

              <div className='flex gap-4'>
                <SelectList
                  label='Situação'
                  lists={LISTA}
                  selected={situacao}
                  setSelected={setStage}
                />
                <div className='w-full'>
                  <Textbox
                    placeholder='Data'
                    type='date'
                    name='data_ini'
                    label='Data da Tarefa'
                    className='w-full rounded'
                    register={register}
                    required
                    error={errors.data_ini}
                  />
                </div>
              </div>

              <Textbox
                placeholder='Descrição'
                type='text'
                name='descricao'
                label='Descrição'
                className='w-full rounded'
                register={register}
                required
                error={errors.descricao}
              />

              <div className='flex gap-4'>
                <SelectList
                  label='Prioridade'
                  lists={PRIORIDADE}
                  selected={prioridades}
                  setSelected={setPrioridades}
                />
              </div>

              {errorMessage && (
                <div className='text-red-500'>{errorMessage}</div>
              )}

              <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
                <Button
                  label='Criar Tarefa'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                  disabled={isSubmitting}
                />
                <Button
                  type='button'
                  className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                  onClick={() => setOpen(false)}
                  label='Cancelar'
                />
              </div>
            </div>
          </form>
        </ModalWrapper>
    </>
  );
};

export default AddTarefa;
