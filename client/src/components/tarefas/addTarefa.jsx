import React from "react";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import {Dialog} from "@headlessui/react";
import {BsChevronExpand} from "react-icons/bs";
import {BiImages} from "react-icons/bi";
import clsx from "clsx";
import SelectList from "../SelectList";
import Textbox from "../Textbox.jsx";
import Button from "../Buttons.jsx";

const LISTA = ["PENTENDE", "EM ANDAMENTO", "FINALIZADA"];
const PRIORIDADE = ["ALTA", "MÉDIA", "BAIXA"];

const AddTarefa = ({open, setOpen}) => {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTA[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIDADE[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  const handleSelect = (e) => {
    setAssets(e.target.files);
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
              name='title'
              label='Nome Tarefa'
              className='w-full rounded'
            />
            <div>
              <p className='text-gray-700'>Atribuir tarefa a: </p>
              <Listbox>
                <div className='relative mt-1'>
                  <Listbox.Button className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
                    <span className='block truncate'>Nome Usuario</span>

                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <BsChevronExpand
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Listbox.Options className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                      <div className={clsx("flex items-center gap-2 truncate")}>
                        <div className='w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600'>
                          <span className='text-center text-[10px]'>AF</span>
                        </div>
                        <span>ALGUEM FAZ</span>
                      </div>
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className='flex gap-4'>
              <SelectList
                label='Situaçao'
                lists={LISTA}
                selected={stage}
                setSelected={setStage}
              />
              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Data da Tarefa'
                  className='w-full rounded'
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <SelectList
                label='Prioridade'
                lists={PRIORIDADE}
                selected={priority}
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
