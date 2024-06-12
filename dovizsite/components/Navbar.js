import React from 'react';

export default function Navbar() {
  return (
    <div className='bg-[#17212f] p-2'>
      <div className='max-w-screen-xl mx-auto flex items-center justify-center'>
        <a href="/">
          <img src="logos.png" className='rounded-2xl shadow-2xl' width={220} alt="Logo" />
        </a>
      </div>
    </div>
  );
}
