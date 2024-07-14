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
import { apiTarefasUrl, apiTimesUrl } from "../../../../server/src/funcoes/apiConfig.js";

const LISTA = ["PENDENTE", "EM ANDAMENTO", "FINALIZADA"];
const PRIORIDADE = ["ALTA", "MÉDIA", "BAIXA"];


const AddTarefa = ({open, setOpen}) => { 
  const {register,handleSubmit,formState: {errors}} = useForm();
  const [times, setTimes] = useState([]);
  const [time, setTeam] = useState("");
  const [situacao, setStage] = useState(LISTA[0]);
  const [prioridade, setPriority] = useState(PRIORIDADE[2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const carregarTimesDisponiveis = async () => {
      try {
        const response = await fetch(apiTimesUrl);
        if (!response.ok) {
          throw new Error('Erro ao buscar times disponíveis');
        }

        const timesData = await response.json();
        setTimes(timesData);
        setTeam(timesData.length > 0 ? timesData[0].id : "");
      } catch (error) {
        console.error('Erro ao carregar nomes de times disponíveis:', error);
        alert('Erro ao carregar nomes de times disponíveis. Por favor, tente novamente.');
      }
    };

    carregarTimesDisponiveis();
  }, []);

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    const tarefaData = {
      nome_tarefa: data.nomeTarefa,
      id_usu: "12345", // precisa verificar melhor vinculo para atribuir a tarefa a um usuario do time ou mais, acredito que o melhor é colocar em outra função de inicio apenas cria a tarefa
      id_time: time,
      situacao,
      data_ini: data.data_tarefa,
      descricao: data.descricao,
      prazo: prioridade
    };

    try {
      const response = await fetch(apiTarefasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefaData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar tarefa');
      }

      alert("Tarefa criada com sucesso!");
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
              register={register}
              required
              error={errors.nomeTarefa}
            />
            
            <div>
            <label htmlFor="atribuir" className="block text-sm font-medium text-gray-700">Atribuir tarefa a:</label>
              
              <select  className='w-full rounded'
                id ="atibuir"
                label='Atribuir tarefa a:' class="bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full rounded"// depois da uma olhada aqui Danny, não sabia como fazer só copiei para ficar igual dos demais
                value={time}
                onChange={(e) => setTeam(e.target.value)}>
                  <option value="">Selecione um time</option>
                  {times.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.data.nome_time}
                    </option>
                  ))}
                </select>
                
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
                  placeholder='Data'
                  type='date'
                  name='data_tarefa'
                  label='Data da Tarefa'
                  className='w-full rounded'
                  register={register}
                  required
                  error={errors.data_tarefa}
                />
              </div>
            </div>
            
            <Textbox //faltou colocar a descrição. qualquer coisa ajusta isso aqui pls kkkkkk
            placeholder="Descrição"
            type="text"
            name="descricao"
            label="Descrição"
            className="w-full rounded"
            register={register}
            required
            error={errors.descricao}
          />
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
                label='Criar'
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
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