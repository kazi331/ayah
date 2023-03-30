import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
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
import e from "../assets/images/pinkUs.jfif";
import g from "../assets/images/sunset.jfif";
import { useRandomArabicAyahQuery, useRandomAudioAyahQuery, useRandomEnglishAyahQuery } from "../redux/features/randomAyah/randomAyahSlice";
import Controls from "./Controls";
import SearchAyah from "./SearchAyah";
import SearchModal from "./SearchModal";

const IMAGES = [q, a, b, c, d, e, f, g, h, i, j, k, l, v];

const Ayah = () => {
  const getImage = () => {
    const number = Math.floor(Math.random() * 13) + 1;
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



  //audio fucntionality
  const [play, setPlay] = useState(false);
  // random ayah 
  const [ayahNumber, setAyahNumber] = useState(Math.floor(Math.random() * 6236) + 1)
  console.log(ayahNumber)

  //Search Modal

  const [smShow, setSmShow] = useState(false);
  // const handleClose = () => setSmShow(false);

  const [suraah, setSuraah] = useState("");
  const [aayah, setAayah] = useState("");
  const [showModal, setShowModal] = useState(false)


  // random ayah 
  // let ayahNumber = Math.floor(Math.random() * 6236) + 1;

  // const { data: arabic } = useRandomArabicAyahQuery();
  const { data: audio } = useRandomAudioAyahQuery(ayahNumber);
  const { data: english, isLoading, isError, } = useRandomEnglishAyahQuery(ayahNumber);

  const refresh = () => {
    setAyahNumber(Math.floor(Math.random() * 6236) + 1)
  }

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


  // decide what to print on the ui
  let content = null;
  if (isLoading) content = <div>loading...</div>
  if (!isLoading && isError) content = <div>error...</div>
  if (!isLoading && !isError && english && audio) content = (
    <div className="   text-1xl font-medium text-white text-center 	">
      <p className="mb-2"> {audio.data?.surah.name}</p>
      <div className="font-mono   text-xs font-small text-white text-center	">
        {audio.data?.surah.englishName} - {audio.data?.surah.englishNameTranslation}
      </div>
      <div className="pt-6"></div>
      <div className="flex flex-col items-center md:items-start">
        <div>
          <h2
            className="  font-medium text-xl text-white	 text-center	"
            style={{ alignSelf: "center", writingDirection: "rlt" }}
          >
            {audio.data?.text}
          </h2>

          <div className="pt-6"></div>

          <h5 className="   font-mono font-medium text-xs text-white	 text-center	">
            -{english?.data?.text ? english.data.text : "Click the refresh icon below to reveal an Ayah"}
          </h5>

          <div className="pt-8"></div>
          <h1 className="text-center  font-mono text-xs  text-white	">
            {english?.data?.surah.revelationType} Ayah
          </h1>
        </div>
      </div>
      <h5 className="text-right pb-2.5  font-mono  text-xs text-white text-opacity-50		">

        - {english?.data?.surah.number}:{english?.data?.numberInSurah} -
      </h5>

      {/* controls  */}
      <Controls props={{ setShowModal, refresh, play, setPlay, setSmShow, handleClick }} />

      <ReactPlayer
        url={audio?.data?.audio}
        playing={play}
        height={0}
        width={0}
        onEnded={() => setPlay(false)}
      />
      <p className="text-gray-400  ... font-mono text-sm text-centre ">Aayah.app</p>
    </div>
  )


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
            {content}
          </div>
        </div>
        <SearchModal props={{ smShow, setSmShow, suraah, aayah, setAayah, setSuraah }} />
        {/* {showModal ? <TailwindModal props={{ showModal, setShowModal }} /> : null} */}
        {/* <TailwindModal props={{ showModal, setShowModal }} />  */}
        <SearchAyah props={{ showModal, setShowModal }} />
      </motion.div>
    </div>
  );
};

export default Ayah;
