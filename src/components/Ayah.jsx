import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import { createFileName, useScreenshot } from "use-react-screenshot";
import ReactPlayer from "react-player";

import v from "../assets/images/image00.jpg";
import { default as a, default as q } from "../assets/images/image2.jpg";
import b from "../assets/images/image3.jpg";
import c from "../assets/images/image4.jpg";
import d from "../assets/images/image5.jpg";
import i from "../assets/images/image55.jpg";
import j from "../assets/images/image66.jpg";
import k from "../assets/images/image77.jpg";
import l from "../assets/images/image88.jpg";
import f from "../assets/images/image9.jfif";
import h from "../assets/images/image99.jpg";
import logo from "../assets/images/new.png";
import e from "../assets/images/pinkUs.jfif";
import g from "../assets/images/sunset.jfif";
import { Download, Pause, Play, Refresh, Screenshot, Search, Search2 } from "./Icons";

const IMAGES = [q, a, b, c, d, e, f, g, h, i, j, k, l, v];

const Ayah = () => {
  const getImage = () => {
    const number = Math.floor(Math.random() * 13) + 1;
    console.log(number);
    return IMAGES[number];
  };

  const [activeImage, setActiveImage] = useState(IMAGES[0]);

  const handleClick = () => {
    const image = getImage();
    setActiveImage(image);
  };

  // const ref = createRef(null);
  // const [image, takeScreenShot] = useScreenshot({
  //   type: "image/jpeg",
  //   quality: 10.0,
  // });

  // const download = (image, { name = "img", extension = "jpg" } = {}) => {
  //   const a = document.createElement("a");
  //   a.href = image;
  //   a.download = createFileName(extension, name);
  //   a.click();
  // };

  // const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  const [ayah, setAyah] = useState([""]);
  const [surah, setSurah] = useState([""]);
  const [eng, setEng] = useState([""]);
  const [audio, setAudio] = useState("");

  //audio fucntionality
  const [play, setPlay] = useState(false);

  //Search Modal

  const [smShow, setSmShow] = useState(false);
  // const handleClose = () => setSmShow(false);

  const [suraah, setSuraah] = useState("");
  const [aayah, setAayah] = useState("");

  //Random Ayah Gen
  let ayahNumb = Math.floor(Math.random() * 6236) + 1;

  // random ayah gen
  const urlEnglish = `https://api.alquran.cloud/ayah/${ayahNumb}/en.sahih`;
  const urlArabic = `https://api.alquran.cloud/ayah/${ayahNumb}`;
  const ayahAudio = `https://api.alquran.cloud/v1/ayah/${ayahNumb}/ar.hudhaify`;

  //Ayah Search

  const searchedAyah = `${suraah}:${aayah}`;
  const searchedEnglish = `https://api.alquran.cloud/ayah/${searchedAyah}/en.sahih`;
  const searchedArabic = `https://api.alquran.cloud/ayah/${searchedAyah}`;
  const searchedAudio = `https://api.alquran.cloud/v1/ayah/${searchedAyah}/ar.hudhaify`;

  const refreshPage = () => {
    axios
      .all([axios.get(urlArabic), axios.get(urlEnglish), axios.get(ayahAudio)])
      .then(
        axios.spread((urlArabic, urlEnglish, ayahAudio) => {
          setSurah(urlArabic.data.data.surah);
          setEng(urlEnglish.data.data);
          setAyah(urlArabic.data.data);
          setAudio(ayahAudio.data.data.audio);
        }, [])
      );
  };

  useEffect(() => {
    axios
      .all([axios.get(urlArabic), axios.get(urlEnglish), axios.get(ayahAudio)])
      .then(
        axios.spread((urlArabic, urlEnglish, ayahAudio) => {
          setAudio(ayahAudio.data.data.audio);
          setAyah(urlArabic.data.data);
          setSurah(urlArabic.data.data.surah);
          setEng(urlEnglish.data.data);
        })
      );
  }, []);

  //search useEffect

  const print = () => {
    axios
      .all([
        axios.get(searchedArabic),
        axios.get(searchedEnglish),
        axios.get(searchedAudio),
      ])

      .then(
        axios.spread((searchedArabic, searchedEnglish, searchedAudio) => {
          setSurah(searchedArabic.data.data.surah);
          setEng(searchedEnglish.data.data);
          setAyah(searchedArabic.data.data);
          setAudio(searchedAudio.data.data.audio);
        }, [])
      );

    setSmShow(false);
    setSuraah("");
    setAayah("");
  };

  return (
    <div
      // ref={ref}
      className="flex items-center justify-center min-h-screen  "
      style={{
        backgroundImage: `url('${activeImage}')`,
        backgroundSize: "cover",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0.5, 1.2, 1.2, 1, 1] }}
        transition={{ duration: 2 }}
        className="max-w-5xl  p-4 m-6  rounded-3xl shadow-xl  	"
        style={{ backgroundImage: `url('${activeImage}')` }}
      >
        <div className="bg-fixed">
          <div className="flex flex-col space-y-4 h-full justify-between">
            <div className="text-base text-1xl font-medium text-white text-center 	">

              {surah.name}
              <div className="font-mono text-base text-xs font-small text-white text-center	">
                {surah.englishName} - {surah.englishNameTranslation}
              </div>
              <div className="pt-6"></div>
              <div className="flex flex-col items-center md:items-start">
                <div>
                  <h2
                    className="text-base font-medium text-xl text-white	 text-center	"
                    style={{ alignSelf: "center", writingDirection: "rlt" }}
                  >
                    {ayah.text}
                  </h2>

                  <div className="pt-6"></div>

                  <h5 className="text-base  font-mono font-medium text-xs text-white	 text-center	">
                    -{eng.text
                      ? eng.text
                      : "Click the refresh icon below to reveal an Ayah"}
                  </h5>

                  <div className="pt-8"></div>
                  <h1 className="text-center  font-mono text-xs text-center text-white	">
                    {surah.revelationType} Ayah
                  </h1>
                </div>
              </div>
              <h5 className="text-right pb-2.5  font-mono  text-xs text-white text-opacity-50	 text-center	">

                - {surah.number}:{eng.numberInSurah} -
              </h5>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="pr-4"
                onClick={refreshPage}
              >

                <Refresh />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="pr-4"
              // onClick={downloadScreenshot}
              >

                <Download />

              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="pr-4"
                onClick={() => setSmShow(true)}
              >
                <Search />

              </motion.button>
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
              {play === false && (
                <motion.button
                  className="pr-4"
                  onClick={() => setPlay(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play />

                </motion.button>
              )}
              {play === true && (
                <motion.button
                  className="pr-4"
                  onClick={() => setPlay(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Pause />
                </motion.button>
              )}
              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Screenshot />

              </motion.button>
              <ReactPlayer
                url={audio}
                playing={play}
                height={0}
                width={0}
                onEnded={() => setPlay(false)}
              />
              <p className="text-gray-400  ... font-mono text-sm text-centre ">
                Aayah.app
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Ayah;
