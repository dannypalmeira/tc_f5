import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { BiImages } from "react-icons/bi";
import Button from "../Buttons";

const LISTA = ["PENTENDE", "EM ANDAMENTO", "FINALIZADA"];
const PRIORIDADE = ["ALTA", "MÉDIA", "BAIXA"];

const AddTarefa = ({ open, setOpen }) => {
    return (
        <>
          <ModalWrapper open={open} setOpen={setOpen}>
            <form>
              <Dialog.Title
                as='h2'
                className='text-base font-bold leading-6 text-gray-900 mb-4'
              >
              </Dialog.Title>

             
    
            </form>
          </ModalWrapper>
        </>
      );
    };    

export default AddTarefa;