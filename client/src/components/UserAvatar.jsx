import {Menu, Transition} from "@headlessui/react";
import {Fragment, useState, useEffect} from "react";
import {FaUser, FaUserLock} from "react-icons/fa";
import {IoLogOutOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/authContext";
import {doSignOut} from "../funcoes/auth";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <>carregando...</>
      ) : (
        <div>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
                <span className='text-white font-semibold'>
                  {user?.nome[0]}
                  {user?.sobrenome[0]}
                </span>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
                <div className='p-4'>
                  <Menu.Item>
                    <button
                      onClick={() => setOpen(true)}
                      className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
                    >
                      <FaUser className='mr-2' aria-hidden='true' />
                      Profile
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`tetx-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUserLock className='mr-2' aria-hidden='true' />
                      Change Password
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => {
                        doSignOut().then(() => {
                          navigate("/login");
                        });
                      }}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Logout
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
