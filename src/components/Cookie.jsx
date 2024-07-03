import React from 'react';

function Cookie({ handleCookieClick }) {
  return (
    <button onClick={handleCookieClick} className='font-bold text-5xl'>
      🍪Click Me
    </button>
  );
}

export default Cookie;
