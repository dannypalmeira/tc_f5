import React, { useState, useEffect } from "react";
import Button from "../components/Buttons";
import { IoMdAdd } from "react-icons/io";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import { readAllData, updateData, deleteData } from "../funcoes/funcoes";

const TimeLista = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const usersData = await readAllData('usuarios');
          setUsers(usersData);
        } catch (error) {
          console.error('Erro ao carregar usuários:', error);
        }
      };
  
      fetchUsers();
    }, []);

  const userActionHandler = async (user) => {
    try {
      await updateData('usuarios', user.id, { isActive: !user.isActive });
      console.log(`Usuário ${user.nome} ${user.sobrenome} atualizado com sucesso!`);
      const updatedUsers = await readAllData('usuarios');
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteData('usuarios', selected);
      console.log(`Usuário com ID ${selected} excluído com sucesso!`);
      const updatedUsers = await readAllData('usuarios'); 
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const deleteClick = (userId) => {
    setSelected(userId);
    setOpenDialog(true);
  };

  const editClick = (user) => {
    setSelected(user);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Nome Completo</th>
        <th className='py-2'>Email</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>             
            {user.nome ? user.nome.charAt(0).toUpperCase() : ''}
            {user.sobrenome ? user.sobrenome.charAt(0).toUpperCase() : ''}
            </span>
          </div>
          {user.nome}
        </div>
      </td>

      <td className='p-2'>{user.email || "user.emal.com"}</td>


      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?.uid)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
        <h2 className={clsx("text-2xl font-semibold capitalize")}>Membros do Time</h2>
          <Button
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default TimeLista;
