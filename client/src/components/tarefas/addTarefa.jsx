import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import {useForm} from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import SelectList from "../SelectList";
import Textbox from "../TextBox.jsx";
import Button from "../Buttons.jsx";
import {cadastraTarefa} from "../../services/tarefaService.js";
import {buscatimes} from "../../services/timeService.js";
import {useAuth} from "../../contexts/authContext/index.jsx";
import {mapFormDataToCollectionFields} from "../../funcoes/funcoes.jsx";
const LISTA = ["PENDENTE", "EM ANDAMENTO", "FINALIZADA"];
const PRIORIDADE = ["ALTA", "MEDIA", "BAIXA"];

const AddTarefa = ({open, setOpen}) => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);
  const [situacao, setStage] = useState(LISTA[0]);
  const [prioridades, setPrioridades] = useState(PRIORIDADE[2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  let nomeTimes = [];

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
    buscatimesconst();
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const buscatimesconst = async () => {
    nomeTimes = [];
    const times = await buscatimes();
    setTeam(times);
  };
  const submitHandler = async (data) => {
    setIsSubmitting(true);

    const formData = {
      id_usu: user.id,
      nome_tarefa: data.nome_tarefa,
      data_ini: data.data_ini,
      descricao: data.descricao,
      id_time: selectedTeam,
      situacao,
      prazo: prioridades,
    };

    const tarefaData = mapFormDataToCollectionFields(formData);
    console.log("tarefa", tarefaData, formData, data, user);
    try {
      await cadastraTarefa(tarefaData);
      alert("Tarefa criada com sucesso!");
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 2600);
    } finally {
      setIsSubmitting(false);
      setErrorMessage("Erro ao adicionar tarefa ");
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
                value={selectedTeam} // Use o estado `selectedTeam` aqui
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {team &&
                  team.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.nome_time}
                    </option>
                  ))}
              </select>
            </div>

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

            {errorMessage && <div className='text-red-500'>{errorMessage}</div>}

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
