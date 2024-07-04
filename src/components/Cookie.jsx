import React from 'react';
import { motion } from 'framer-motion';
import galleta from '../assets/galleta.png';

function Cookie({ handleCookieClick }) {
  return (
    <motion.button
      onClick={handleCookieClick}
      whileHover={{
        scale: 1.1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 8,
        },
      }}
      whileTap={{
        scale: 1.2,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 12,
        },
      }}
      className='text-[100px] w-auto'
    >
      <img src={galleta} alt='galleta' className=' w-[230px]' />
    </motion.button>
  );
}

export default Cookie;
