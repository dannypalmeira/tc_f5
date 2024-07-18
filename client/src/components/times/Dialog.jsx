import {Dialog} from "@headlessui/react";
import {FaQuestion} from "react-icons/fa";
import ModalWrapper from "../ModalWrapper";
import Button from "../Buttons";

export default function ConfirmatioDeletTime({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p className={"text-red-600 bg-red-200"}>
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-gray-500'>
            {msg ?? "Tem certeza de que deseja excluir o registro selecionado?"}
          </p>

          <div className='bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              className={"bg-red-600 hover:bg-red-500"}
              onClick={onClick}
              label={"Apagar"}
            />

            <Button
              type='button'
              className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
              onClick={() => closeDialog()}
              label='Cancelar'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
