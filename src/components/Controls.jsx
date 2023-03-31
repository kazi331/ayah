import React from 'react';
import { saveAsJpeg } from 'save-html-as-image';
import { Download, Pause, Play, Refresh, Screenshot, Search, Share } from './Icons';
import { useRef } from 'react';
import html2canvas from 'html2canvas';




const Controls = ({ props }) => {
    const { play, setPlay, refresh, imgRef, canvasRef, randomizeBg, setShowModal } = props;
    const downloadImg = () => {
        saveAsJpeg(imgRef.current, {
            fileName: "ayah",
            quality: 1
        });
    };

    function captureScreenshot() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        return new Promise(resolve => {
            html2canvas(document.body).then(canvas => {
                const imageData = canvas.toDataURL('image/png');
                resolve(imageData);
            });
        });
    }


   
  
    async function shareImage() {
        try {
            const imageData = await captureScreenshot();
            await navigator.share({
                title: 'My Image',
                text: 'Check out this cool image!',
                files: [
                    new File([imageData], 'image.png', { type: 'image/png' }),
                ],
            });
        } catch (error) {
            console.error('Error sharing image:', error);
        }
    }



    return (
        <div className='flex gap-1 items-center justify-center my-3'>
            <button className=" p-2 outline-none md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" type="button" onClick={refresh} >
                <Refresh className="w-7 h-7 md:w-5 md:h-5 mt-1" />
            </button>
            <button className=" p-2 outline-none md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={downloadImg} >
                <Download className="w-7 h-7 md:w-5 md:h-5" />
            </button>
            <button className=" p-2 outline-none md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={() => setShowModal(true)} >
                <Search className="w-7 h-7 md:w-5 md:h-5" />

            </button>

            {
                play === false ?
                    <button className=" p-2 outline-none md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={() => setPlay(true)} >
                        <Play className="w-7 h-7 md:w-5 md:h-5" />
                    </button>
                    :
                    <button className=" p-2 outline-none md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={() => setPlay(false)} >
                        <Pause className="w-7 h-7 md:w-5 md:h-5" />
                    </button>
            }

            <button className=" p-2 outline-none md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={randomizeBg} >
                <Screenshot className="w-7 h-7 md:w-5 md:h-5" />

            </button>
            <button className=" p-2 outline-none md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={shareImage} >
                <Share className="w-7 h-7 md:w-5 md:h-5" />

            </button>
        </div>
    )
}

export default Controls