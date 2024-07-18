import React, {useEffect, useState} from "react";
import ModalWrapper from "../ModalWrapper";
import {useAuth} from "../../contexts/authContext/index.jsx";
import Textbox from "../TextBox.jsx";
import {useForm} from "react-hook-form";
import Button from "../Buttons.jsx";
import {Dialog} from "@headlessui/react";
import {criaTime} from "../../services/timeService.js";
import {useNavigate} from "react-router-dom";

const AddTime = ({open, setOpen}) => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      return;
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    try {
      const time = {
        nome_time: data.nome_time,
        usuarios: [user.id],
      };
      const timecriado = await criaTime(time);

      reset();
      nav("/time");
      // Fechar o modal
      setOpen(false);
    } catch {
      setErrorMessage("Erro ao adicionar time.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2600);
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return loading ? (
    <>carregando...</>
  ) : (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            ADICIONAR TIME
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Nome Tarefa'
              type='text'
              name='nome_time'
              label='Nome Time'
              className='w-full rounded'
              register={register}
              required
              error={errors.nome_time}
            />

            {errorMessage && <div className='text-red-500'>{errorMessage}</div>}

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              <Button
                label='Criar Tme'
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

export default AddTime;
