import React from 'react'
import { Close, Search, Search2 } from './Icons';
import logo from '../assets/images/new.png'

const TailwindModal = ({ props }) => {
    const { showModal, setShowModal } = props;
    
    return (
        <div className={`fixed ${showModal ? "transition-all duration-300 block" : "hidden"} transition-all duration-300 inset-0 overflow-y-auto flex items-center justify-center  `} >
            <div className=" relative bg-white bg-opacity-40 backdrop-blur rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-4 lg:p8" >
                <div onClick={() => setShowModal(false)} className="absolute cursor-pointer -top-10 right-0 bg-red-500 hover:bg-red-600 bg-opacity-50 text-white p-1 rounded ">
                    <Close className="w-5 h-5 " />
                </div>
                {/* modal body */}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="border-b pb-2">
                        <h3 className="text-lg leading-6 font-medium text-gray-700 flex items-center gap-2 ">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={logo}
                                alt="logo"
                            />  Search for an Ayah
                        </h3>
                    </div>
                    <div className="mt-2">
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surah-number">
                                    Surah Number
                                </label>
                                <input className="shadow border border-gray-200 border-opacity-10 rounded appearance-none w-full p-3  text-gray-800 placeholder-gray-600 bg-white bg-opacity-10 leading-tight focus:outline-none focus:shadow-lg " id="surah-number" type="number" placeholder="surah-number" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ayah-number">
                                    Surah Number
                                </label>
                                <input className="shadow border border-gray-200 border-opacity-10 rounded appearance-none w-full p-3  text-gray-800 placeholder-gray-600 bg-white bg-opacity-10 leading-tight focus:outline-none focus:shadow-lg " id="ayah-number" type="number" placeholder="ayah-number" />
                            </div>
                            <div className="mb-4 w-full">
                                <button className='w-full rounded bg-indigo-500 hover:bg-indigo-600 text-white py-3 flex items-center justify-center gap-2'> <Search2 />  Search </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TailwindModal