import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { saveAsJpeg } from 'save-html-as-image';
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
import { useRandomAudioAyahQuery, useRandomEnglishAyahQuery } from "../redux/features/randomAyah/randomAyahSlice";
import Controls from "./Controls";
import SearchAyah from "./SearchAyah";

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


  // screenshot download
  const imgRef = useRef();
  const downloadImg = () => {
    saveAsJpeg(imgRef.current, {
      fileName: "ayah",
      quality: 1
    });
  };


  //audio fucntionality
  const [play, setPlay] = useState(false);
  // random ayah 
  const [ayahNumber, setAyahNumber] = useState(Math.floor(Math.random() * 6236) + 1)


  const [showModal, setShowModal] = useState(false)


  // random ayah 
  // let ayahNumber = Math.floor(Math.random() * 6236) + 1;

  // const { data: arabic } = useRandomArabicAyahQuery();
  const { data: audio } = useRandomAudioAyahQuery(ayahNumber);
  const { data: english, isLoading, isError, } = useRandomEnglishAyahQuery(ayahNumber);

  const refresh = () => {
    setAyahNumber(Math.floor(Math.random() * 6236) + 1)
  }




  // decide what to print on the ui
  let content = null;
  if (isLoading) content = <div>loading...</div>
  if (!isLoading && isError) content = <div>error...</div>
  if (!isLoading && !isError && english && audio) content = (
    <div className="   text-1xl font-medium text-white text-center 	">
      <p > {audio.data?.surah.name}</p>
      <div className="font-mono   text-xs font-small text-white text-center	">
        {audio.data?.surah.englishName} - {audio.data?.surah.englishNameTranslation}
      </div>

      <div className=" flex  flex-col gap-3 font-mono font-medium  text-white	 text-center 	mt-4">
        <h2 style={{ writingDirection: "rlt" }} >{audio.data?.text}</h2>
        <p >-{english?.data?.text ? english.data.text : "Click the refresh icon below to reveal an Ayah"}</p>
        <h1 >{english?.data?.surah.revelationType} Ayah</h1>
        <h5 className="text-right pb-2.5  font-mono  text-xs text-white text-opacity-50		"> - {english?.data?.surah.number}:{english?.data?.numberInSurah} - </h5>
      </div>

      {/* controls  */}
      <Controls props={{ setShowModal, downloadImg, refresh, play, setPlay, handleClick }} />

      <ReactPlayer
        url={audio?.data?.audio}
        playing={play}
        height={0}
        width={0}
        onEnded={() => setPlay(false)}
      />
      <p className="text-gray-100 font-mono text-sm text-centre ">Aayah.app</p>
    </div>
  )


  return (
    <>

      <div
        ref={imgRef}
        className="flex items-center justify-center min-h-screen "
        style={{
          backgroundImage: `url('${activeImage}')`,
          backgroundSize: "cover",
        }}
      >
        <motion.div

          initial={{ scale: 0 }}
          animate={{ scale: [0.5, 1.2, 1.2, 1, 1] }}
          transition={{ duration: 2 }}
          className="max-w-5xl m-2 md:m-4 lg:m-6  rounded-3xl shadow-xl w-full  backdrop-filter  backdrop-blur-lg bg-opacity-10 bg-gray-900"
        // style={{ backgroundImage: `url('${activeImage}')` }}
        >
          <div className="bg-fixed" >
            <div className="flex flex-col space-y-4 h-full p-4 md:p-6 lg:p-8 justify-between text-center ">
              {content}
            </div>
          </div>
        </motion.div>
      </div>
      {showModal ? <SearchAyah props={{ showModal, setShowModal }} /> : null}

    </>
  );
};

export default Ayah;
