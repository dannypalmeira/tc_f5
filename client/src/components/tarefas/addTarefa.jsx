import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import SelectList from "../SelectList";
import Textbox from "../TextBox.jsx";
import Button from "../Buttons.jsx";
import { cadastraTarefa } from "../../services/tarefaService.js";
import { buscatimes } from "../../services/timeService.js";
import { buscaUsuariosDoTime } from "../../services/usuarioService.js";
import { useAuth } from "../../contexts/authContext/index.jsx";
import { mapFormDataToCollectionFields } from "../../funcoes/funcoes.jsx";

const LISTA = ["PENDENTE", "EM ANDAMENTO", "FINALIZADA"];
const PRIORIDADE = ["ALTA", "MEDIA", "BAIXA"];

const AddTarefa = ({ open, setOpen }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [situacao, setStage] = useState(LISTA[0]);
  const [prioridades, setPrioridades] = useState(PRIORIDADE[2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    if (user) {
      fetchTimes();
    }
  }, [user]);

  useEffect(() => {
    if (selectedTeam) {
      fetchUsers(selectedTeam);
    }else {
      setUsuarios([]);
      setSelectedUser(""); //apaga usuario
    }
  }, [selectedTeam]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchTimes = async () => {
    try {
      const times = await buscatimes();
      setTeam(times);
      setSelectedTeam(times[0]?.id || "");
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (teamId) => {
    try {
      const usuarios = await buscaUsuariosDoTime(teamId);
      setUsuarios(usuarios);
      if (usuarios.length > 0) {
        setSelectedUser(usuarios[0].id);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários do time:", error);
    }
  };

  const submitHandler = async (data) => {
    if (!selectedUser) {
      setErrorMessage("Por favor, selecione um usuário.");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      id_usu: selectedUser, 
      nome_tarefa: data.nome_tarefa,
      data_ini: data.data_ini,
      descricao: data.descricao,
      id_time: selectedTeam,
      situacao,
      prazo: prioridades,
    };

    const tarefaData = mapFormDataToCollectionFields(formData);

    try {
      await cadastraTarefa(tarefaData);
      alert("Tarefa criada com sucesso!");
      resetForm();
      setOpen(false);
    } catch (error) {
      setErrorMessage(`Erro ao criar tarefa: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    reset({
      nome_tarefa: "",
      data_ini: "",
      descricao: "",
    });
    setSelectedTeam("");
    setSelectedUser("");
    setStage(LISTA[0]);
    setPrioridades(PRIORIDADE[2]);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
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
            error={errors.nome_tarefa}
          />

          <div>
            <label
              htmlFor='atribuir'
              className='block text-sm font-medium text-gray-700'
            >
              Selecionar Time:
            </label>
            <select
              className='w-full rounded bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300'
              id='atribuir'
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              {team.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.nome_time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor='usuarios'
              className='block text-sm font-medium text-gray-700'
            >
              Selecionar Usuário:
            </label>
            <select
              className='w-full rounded bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300'
              id='usuarios'
              value={selectedUser}
              onChange={handleUserChange}
            >
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
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

export default AddTarefa;
