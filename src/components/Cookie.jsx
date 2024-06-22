import React from 'react';

function Cookie({ handleCookieClick }) {
  return (
    <button onClick={handleCookieClick} className='font-bold'>
      🍪Click Me
    </button>
  );
}

export default Cookie;
