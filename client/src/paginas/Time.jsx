import React, {useState, useEffect} from "react";
import Button from "../components/Buttons";
import {IoMdAdd} from "react-icons/io";
import clsx from "clsx";
import {UserAction} from "../components/Dialogs";
import {readAllData, updateData, deleteData} from "../funcoes/funcoes";
import {useAuth} from "../contexts/authContext";
import {deleteTime, buscatimes} from "../services/timeService";
import ConfirmatioDeletTime from "../components/times/Dialog.jsx";
import AddTime from "../components/times/addTime.jsx";
import {useNavigate} from "react-router-dom";

const TimeLista = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [times, setTimes] = useState([]);
  const [loadng, setLoading] = useState(true);
  const {user} = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      return;
    }
    const fetchtimes = async () => {
      try {
        const times = await buscatimes();
        setTimes(times);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };
    fetchtimes();
  }, [user, open, openDialog]);

  const deleteHandler = async () => {
    try {
      const deleted = await deleteTime(selected);
      setOpenDialog(false);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const deleteClick = (userId) => {
    setSelected(userId);
    setOpenDialog(true);
  };

  const editClick = (user) => {
    setSelected(user);
    setOpenEdit(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Nome Time</th>
      </tr>
    </thead>
  );

  const TableRow = ({time}) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>
              {time ? time.nome_time.charAt(0).toUpperCase() : ""}
            </span>
          </div>
          {time.nome_time}
        </div>
      </td>
      {(user.tipo === "adm" || user.tipo === "admin") && (
        <td className='p-2 flex gap-4 justify-end'>
          <Button
            className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
            label='Edit'
            type='button'
            onClick={() => editClick(time)}
          />

          <Button
            className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
            label='Delete'
            type='button'
            onClick={() => deleteClick(time?.id)}
          />
        </td>
      )}
    </tr>
  );

  return loadng ? (
    <>carregando</>
  ) : (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className={clsx("text-2xl font-semibold capitalize")}>
            Membros do Time
          </h2>
          {(user.tipo === "adm" || user.tipo === "admin") && (
            <Button
              label=' Criar Time'
              icon={<IoMdAdd className='text-lg' />}
              className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
              onClick={() => setOpen(true)}
            />
          )}
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {times?.map((time, index) => (
                  <TableRow key={index} time={time} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddTime open={open} setOpen={setOpen} />
      <ConfirmatioDeletTime
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TimeLista;
