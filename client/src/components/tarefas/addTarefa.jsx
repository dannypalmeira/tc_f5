import React from "react";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import {Dialog} from "@headlessui/react";
import { addTarefa } from "../../funcoes/funcoes.jsx";
import {BsChevronExpand} from "react-icons/bs";
import clsx from "clsx";
import SelectList from "../SelectList";
import Textbox from "../TextBox.jsx";
import Button from "../Buttons.jsx";

const LISTA = ["PENTENDE", "EM ANDAMENTO", "FINALIZADA"];
const PRIORIDADE = ["ALTA", "MÉDIA", "BAIXA"];
const TIME = ["ROXO", "VERDE", "AZUL"];

const AddTarefa = ({open, setOpen}) => {
  const tarefa = "";

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [time, setTeam] = useState(TIME[0]);
  const [situacao, setStage] = useState(LISTA[0]);
  const [prioridade, setPriority] = useState(PRIORIDADE[2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    const tarefaData = {
      nomeTarefa: data.tarefa,
      time,
      situacao,
      dataTarefa: data.data_tarefa,
      prioridade
    };

    try {
      await addTarefa(tarefaData);
      alert("Tarefa adicionada com sucesso!");
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
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
              name='nomeTarefa'
              label='Nome Tarefa'
              className='w-full rounded'
              register={register("nomeTarefa")}
            />
            <div>
              <SelectList
                label='Atribuir tarefa a:'
                lists={TIME}
                selected={time}
                setSelected={setTeam}
              />
            </div>
            <div className='flex gap-4'>
              <SelectList
                label='Situaçao'
                lists={LISTA}
                selected={situacao}
                setSelected={setStage}
              />
              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='data_tarefa'
                  label='Data da Tarefa'
                  className='w-full rounded'
                  register={register("data_tarefa")}
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <SelectList
                label='Prioridade'
                lists={PRIORIDADE}
                selected={prioridade}
                setSelected={setPriority}
              />
            </div>
            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              <Button
                label='Submit'
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
              />
              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTarefa;