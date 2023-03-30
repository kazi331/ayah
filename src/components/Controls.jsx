import React from 'react'
import {motion} from 'framer-motion'
import { Download, Pause, Play, Refresh, Screenshot, Search } from './Icons';

const Controls = ({props}) => {
    const {play, setPlay, setSmShow, refresh, handleClick, setShowModal} = props;
  return (
    <div>
          <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="pr-4"
              onClick={refresh}
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
              onClick={() => setShowModal(true)}
          >
              <Search />

          </motion.button>

          {/* search modal  */}


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
    </div>
  )
}

export default Controls