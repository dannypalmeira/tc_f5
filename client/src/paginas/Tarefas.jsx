import React, {useState, useEffect} from "react";
import clsx from "clsx";
import Button from "../components/Buttons";
import {IoMdAdd} from "react-icons/io";
import Loading from "../components/Loader";
import BoardView from "../components/BoardView";
import {readAllData} from "../funcoes/funcoes";
import {useAuth} from "../contexts/authContext";
import AddTarefa from "../components/tarefas/addTarefa";

const Tarefas = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [tasks, taskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
    const fetchTasks = async () => {
      try {
        const dadosTarefa = await readAllData("tarefas");
        taskData(dadosTarefa);
        //console.log('Tarefa:', dadosTarefa);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    //fetchTasks();
  }, [user]);
  return loading ? (
    <div className='py-10'>
      <Loading />
      carregando...
    </div>
  ) : (
    <>
      <div className='w-full'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className={clsx("text-2xl font-semibold capitalize")}>Tarefas</h2>
          {(user.tipo === "admin" || user.tipo === "adm") && (
            <Button
              onClick={() => setOpen(true)}
              label='Criar Tarefa'
              icon={<IoMdAdd className='text-lg' />}
              className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
            />
          )}

          <AddTarefa open={open} setOpen={setOpen} />
        </div>
        <BoardView tarefas={tasks} />
      </div>
    </>
  );
};

export default Tarefas;
