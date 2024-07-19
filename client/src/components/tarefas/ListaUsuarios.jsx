import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {BsChevronExpand} from "react-icons/bs";
import clsx from "clsx";
import {MdCheck} from "react-icons/md";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {app} from "../../firebase/firebase";

const UserList = ({setTeam, team}) => {
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (selectedItems) => {
    setSelectedUsers(selectedItems);
    setTeam(selectedItems?.map((u) => u.uid));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const usersCollection = collection(db, "usuarios");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Dados: ", usersData);
        setData(usersData);
        if (team?.length < 1 && usersData.length > 0) {
          setSelectedUsers([usersData[0]]);
          setTeam([usersData[0].uid]);
        } else {
          setSelectedUsers(usersData.filter((user) => team.includes(user.uid)));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [team]);

  return (
    <div>
      <p className='text-gray-700'>Atribuir tarefa a: </p>
      <Listbox
        value={selectedUsers}
        onChange={(selectedItems) => handleChange(selectedItems)}
        multiple
      >
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
            <span className='block truncate'>
              {selectedUsers
                ?.map((user) => `${user.nome} ${user.sobrenome}`)
                .join(", ")}
            </span>

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
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({active}) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4. ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    } `
                  }
                  value={user}
                >
                  {({selected}) => (
                    <>
                      <div
                        className={clsx(
                          "flex items-center gap-2 truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        <div className='w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600'>
                          <span className='text-center text-[10px]'>
                            {user.nome ? user.nome.charAt(0).toUpperCase() : ""}
                            {user.sobrenome
                              ? user.sobrenome.charAt(0).toUpperCase()
                              : ""}
                          </span>
                        </div>
                        <span>
                          {user.nome} {user.sobrenome}
                        </span>
                      </div>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                          <MdCheck className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;
