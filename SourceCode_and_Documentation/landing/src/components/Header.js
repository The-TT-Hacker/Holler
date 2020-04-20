import React from 'react';

import logo from '../assets/logo.svg';

const Header = () => (
  <header className="flex items-center justify-between p-12 lg:p-32">
    <img src={logo} className="w-128 lg:w-192" alt="Huddle company logo." />
    <form action="http://localhost:3001/login">        
    <button className="px-20 py-8 bg-white text-orange rounded-full border border-orange shadow-md-orange">
      Login
    </button>
    </form>
  </header>
);

export default Header;
