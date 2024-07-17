import { Popover, Transition } from "@headlessui/react";
import React, { useState, useEffect, Fragment } from "react";
import { useAuth } from "../contexts/authContext";
import { readAllData, updateData, deleteData } from "../funcoes/funcoes";

const UserInfo = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const snapshot = await readAllData('tarefas');
        if (snapshot.exists()) {
          const data = snapshot.val();
          const members = Object.values(data).map(team => ({
            id: team.id,
            nome: team.nome,
            sobrenome: team.sobrenome
          }));
          setTeamMembers(members);
        }
      } catch (error) {
        console.error('Erro ao buscar membros do time:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className='px-4'>
      <Popover className='relative'>
        {/* {({ open }) => ( */}
        <>
          <Popover.Button className='group inline-flex items-center outline-none'>
            <span>{user?.nome[0]}{user?.sobrenome[0]}</span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 '>
              <div className='flex items-center gap-4 rounded-lg shadow-lg bg-white p-8'>
                <div className='w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl '>
                  <span className='text-center font-bold'>
                  {user?.nome[0]}{user?.sobrenome[0]}
                  </span>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <p className='text-black text-xl font-bold'>{user?.nome}</p>
                  <span className='text-blue-500'>
                    {user?.email ?? "email@example.com"}
                  </span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
        {/* )} */}
      </Popover>
    </div>
  );
};

export default UserInfo;
