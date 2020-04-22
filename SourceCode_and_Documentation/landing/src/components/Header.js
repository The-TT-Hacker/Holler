import React from 'react';

import logo from '../assets/logo.svg';
import { FRONTEND } from '../constants/roles';

const Header = () => (
  <header className="flex items-center justify-between p-12 lg:pt-32 lg:px-64">
    <img src={logo} className="w-128 lg:w-192" alt="Huddle company logo." />
    <form action={FRONTEND + '/login'}>
      <button className="px-20 py-8 lg:px-32 lg:py-12 bg-white text-orange rounded-full border border-orange shadow-md-orange">
        Login
      </button>
    </form>
  </header>
);

export default Header;
