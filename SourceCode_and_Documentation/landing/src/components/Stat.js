import React from 'react';

const Stat = ({ icon, iconAlt, text, children: stat }) => (
  <div>
    <img src={icon} className="w-32 mb-4" alt={iconAlt} />
    <span className="block mb-12 font-display font-bold text-64 leading-none">{stat}</span>
    <span className="text-grey-dark">{text}</span>
  </div>
);

export default Stat;
