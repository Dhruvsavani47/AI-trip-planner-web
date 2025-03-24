import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineDownloading } from "react-icons/md";

const CustomDialog = ({ open, onClose, onClick }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-[#88BDF2]/70 bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <Dialog.Description className="mt-2 text-sm text-gray-500">
              <h2 className='text-3xl text-black font-medium'>JetSet<span className='text-[#88BDF2]'>GO</span></h2>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securly</p>


              <button className='text-[#384959] text-[15px] font-bold py-2 px-24 rounded-xl bg-[#BDDDFC] hover:bg-[#88BDF2] cursor-pointer w-full mt-7 flex' onClick={onClick}>
                <FcGoogle className="text-[20px] mr-3 " />
                Sign In With Google
              </button>
            </Dialog.Description>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomDialog;
