import React, {useEffect, useState} from "react";
import ModalWrapper from "../ModalWrapper";
import {useAuth} from "../../contexts/authContext/index.jsx";
import Textbox from "../TextBox.jsx";
import {useForm} from "react-hook-form";
import Button from "../Buttons.jsx";
import {Dialog} from "@headlessui/react";
import {criaTime} from "../../services/timeService.js";
import {usuarioPertenceATime} from "../../services/usuarioService.js";
import {useNavigate} from "react-router-dom";

const AddTime = ({open, setOpen}) => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usuarios, setUsuarios] = useState([""]);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      return;
    }
  }, [user]);

// adiciona e remove usuarios
  const addUsuarioField = () => {
    if (usuarios.length < 4) {
      setUsuarios([...usuarios, ""]);
    }
  };
  
  const removeUsuarioField = (index) => {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  };
  
   const handleUsuarioChange = (index, value) => {
    const newUsuarios = [...usuarios];
    newUsuarios[index] = value;
    setUsuarios(newUsuarios);
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    try {

      // Verifica se algum usuário já pertence a outro time
      for (let i = 0; i < usuarios.length; i++) {
        const usuario = data[`usuario_${i}`];
        if (await usuarioPertenceATime(usuario)) {
          throw new Error(`O usuário ${usuario} já pertence a um time.`);
        }
      }


      const time = {
        nome_time: data.nome_time,
        usuarios: usuarios.map((usuario, index) => data[`usuario_${index}`]), 
      };
      //não estava sendo usado const timecriado =
       await criaTime(time);

      reset();
      setUsuarios([""]); // usuario
      nav("/time");
      // Fechar o modal
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.message || "Erro ao adicionar time.");
    } finally {
      setIsSubmitting(false);
      
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
              placeholder='Nome Time'
              type='text'
              name='nome_time'
              label='Nome Time'
              className='w-full rounded'
              register={register}
              required
              error={errors.nome_time}
            />

            {usuarios.map((usuario, index) => ( 
            <div key={index} className='flex items-center gap-2'>
              <Textbox
                placeholder='Usuário'
                type='text'
                name={`usuario_${index}`}
                label={`Usuário ${index + 1}`}
                className='w-full rounded'
                register={register}
                required
                error={errors[`usuario_${index}`]}
              />
              <Button
                type='button'
                className='bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700'
                onClick={() => removeUsuarioField(index)}
                label='Remover'
              />
              </div>
          ))}
              {usuarios.length < 4 && (
            <Button
              type='button'
              className='bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700'
              onClick={addUsuarioField}
              label='Adicionar Usuário'
            />
          )}
            

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
