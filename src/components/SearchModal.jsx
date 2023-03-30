import { motion } from "framer-motion";
import React from 'react';
import { Modal } from 'react-bootstrap';
import logo from "../assets/images/new.png";
import { Search2 } from "./Icons";

const SearchModal = (props) => {
  const { smShow, setSmShow, suraah, aayah, setAayah, setSuraah } = props;
  console.log({ smShow, setSmShow, suraah, aayah, setAayah, setSuraah })
  return (
    <Modal
      className="opacity-80 rounded-3xl shadow-xl "
      size="sm"
      keyboard="true"
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <img
          className="h-10 w-10  rounded-full"
          src={logo}
          alt="logo"
        />

        <Modal.Title className="pl-3 pt-1	 text-center font-mono text-md text-center text-black	">
          Search for an Ayah
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <lable className="text-black text-opacity-55 ... font-mono text-sm text-centre ">
          Surah Number
        </lable>
        <input
          placeholder="e.g Surah Fatiha would be 1"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          type="text"
          value={suraah}
          onChange={(e) => {
            setSuraah(e.target.value);
          }}
        />

        <div className="pt-6 ..." />

        <lable className="text-black text-opacity-55 ... font-mono text-sm text-centre ">
          Ayah Number
        </lable>
        <input
          type="text"
          className=" appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="e.g Ayah 2 of Surah Fatiha would be 2"
          value={aayah}
          onChange={(e) => {
            setAayah(e.target.value);
          }}
        />
        <div className="pt-6 ..." />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={print}
          type="submit"
          className="py-9	group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Search2 />
        </motion.button>
      </Modal.Body>
    </Modal>
  )
}

export default SearchModal