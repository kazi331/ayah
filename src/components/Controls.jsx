import { motion } from 'framer-motion';
import React from 'react';
import { Download, Pause, Play, Refresh, Screenshot, Search } from './Icons';



const Controls = ({ props }) => {
    const { play, setPlay, downloadImg, refresh, handleClick, setShowModal } = props;

    return (
        <div className='flex gap-3 items-center justify-center my-3'>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"

                onClick={refresh}
            >

                <Refresh />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={downloadImg}

            >

                <Download />

            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                onClick={() => setShowModal(true)}
            >
                <Search />

            </motion.button>

            {/* search modal  */}


            {play === false && (
                <motion.button

                    onClick={() => setPlay(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Play />

                </motion.button>
            )}
            {play === true && (
                <motion.button

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
        </div>
    )
}

export default Controls