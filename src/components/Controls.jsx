import React from 'react';
import { Download, Pause, Play, Refresh, Screenshot, Search, Share } from './Icons';



const Controls = ({ props }) => {
    const { play, setPlay, downloadImg, refresh, imgRef, randomizeBg, setShowModal } = props;

    // Define the toBlob function using canvas.toBlob()
    function toBlob(canvas) {
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Failed to convert canvas to blob'));
                }
            }, 'image/png');
        });
    }
    const handleShare = async () => {
        const newFile = await toBlob(imgRef.current);
        const data = {
            files: [
                new File([newFile], 'image.png', {
                    type: newFile.type,
                }),
            ],
            title: 'Image',
            text: 'image',
        };
        try {
            await navigator.share(data);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className='flex gap-1 items-center justify-center my-3'>
            <button className=" p-2 md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" type="button" onClick={refresh} >
                <Refresh className="w-7 h-7 md:w-5 md:h-5 mt-1" />
            </button>
            <button className=" p-2 md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={downloadImg} >
                <Download className="w-7 h-7 md:w-5 md:h-5" />
            </button>
            <button className=" p-2 md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={() => setShowModal(true)} >
                <Search className="w-7 h-7 md:w-5 md:h-5" />

            </button>

            {
                play === false ?
                    <button className=" p-2 md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={() => setPlay(true)} >
                        <Play className="w-7 h-7 md:w-5 md:h-5" />
                    </button>
                    :
                    <button className=" p-2 md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={() => setPlay(false)} >
                        <Pause className="w-7 h-7 md:w-5 md:h-5" />
                    </button>
            }

            <button className=" p-2 md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={randomizeBg} >
                <Screenshot className="w-7 h-7 md:w-5 md:h-5" />

            </button>
            <button className=" p-2 md:hover:bg-gray-300 hover:bg-opacity-20 rounded md:hover:-translate-y-1 md:hover:scale-110 transition-all" onClick={handleShare} >
                <Share className="w-7 h-7 md:w-5 md:h-5" />

            </button>
        </div>
    )
}

export default Controls