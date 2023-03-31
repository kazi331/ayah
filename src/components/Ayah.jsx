import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

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
  //audio fucntionality
  const [play, setPlay] = useState(false);
  // random ayah 
  const [ayahNumber, setAyahNumber] = useState(Math.floor(Math.random() * 6236) + 1)
  const [showModal, setShowModal] = useState(false)

  const { english, audio } = useSelector(state => state.surah)

  const getImage = () => {
    const number = Math.floor(Math.random() * 13) + 1;
    return IMAGES[number];
  };

  const [activeImage, setActiveImage] = useState(IMAGES[0]);

  const randomizeBg = () => {
    const image = getImage();
    setActiveImage(image);
  };


  // screenshot download
  const imgRef = useRef();
  const canvasRef = useRef();



  // random ayah 
  // let ayahNumber = Math.floor(Math.random() * 6236) + 1;

  const { data: randomAyah } = useRandomAudioAyahQuery(ayahNumber);
  const { data: randomEnglish, isLoading } = useRandomEnglishAyahQuery(ayahNumber);

  const refresh = () => {
    setAyahNumber(Math.floor(Math.random() * 6236) + 1);
    randomizeBg();
  }

  // console.log('rendering')

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div
        ref={imgRef}
        className="p-4 flex items-center justify-center min-h-screen bg-gray-900"
        style={{
          backgroundImage: `url('${activeImage}')`,
          backgroundSize: "cover",
        }}
      >
        <div className={`${isLoading ? "w-96 h-96 overflow-hidden rounded" : "w-full h-full"}  transition-all duration-1000`}>
          <div
            // initial={{ scale: 0 }}
            // animate={{ scale: [0.5, 1.2, 1.2, 1, 1] }}
            // transition={{ duration: 2 }}
            className="max-w-5xl mx-auto  rounded-3xl shadow-xl w-full  backdrop-filter  backdrop-blur-lg bg-opacity-10 bg-gray-900"
          // style={{ backgroundImage: `url('${activeImage}')` }}
          >
            <div className="bg-fixed" >
              <div className="flex flex-col space-y-4 h-full p-4 md:p-6 lg:p-8 justify-between text-center ">
                {/* main content  */}

                <div className=" text-1xl font-medium text-white text-center 	">
                  <p > {audio?.surah?.name}</p>
                  <div className="  text-xs font-small text-white text-center">
                    {audio?.surah?.englishName} - {audio?.surah?.englishNameTranslation}
                  </div>

                  <div className=" flex  flex-col gap-3   text-white	 text-center 	mt-4">
                    <h2 className="main-text text-xl mb-4" style={{ writingDirection: "rlt" }} >{audio?.text}</h2>
                    <p >-{english?.text ? english.text : "Click the refresh icon below to reveal an Ayah"}</p>
                    <hr className="w-2/12 md:w-1/12 mx-auto mt-10" />
                    <h1 >{english?.surah?.revelationType} Ayah</h1>
                    <h5 className="text-center pb-2.5    text-xs text-white text-opacity-50		"> - {english?.surah?.number}:{english?.numberInSurah} - </h5>
                  </div>

                  {/* controls  */}
                  <Controls props={{ setShowModal, canvasRef, imgRef, refresh, play, setPlay, randomizeBg }} />

                  <ReactPlayer
                    url={audio?.audio}
                    playing={play}
                    height={0}
                    width={0}
                    onEnded={() => setPlay(false)}
                  />
                  <p className="text-gray-100  text-sm text-centre ">Aayah.app</p>
                </div>


              </div>
            </div>
          </div>
        </div>
        {showModal ? <SearchAyah showModal={showModal} setShowModal={setShowModal} /> : null}
      </div>

    </>
  );
};

export default Ayah;
