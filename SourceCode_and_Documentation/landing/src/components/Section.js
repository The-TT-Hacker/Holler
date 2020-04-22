import React from 'react';

const Section = ({ title, img, children: text, className }) => (
  <section className={`lg:flex lg:justify-around lg:items-center w-full px-20 py-48 ${className}`}>
    <img src={img} className="w-full max-w-512 max-h-auto mb-48" alt="Grow together illustration." style={{'max-width': '25rem'}}/>
    <div className="text-center lg:text-left max-w-512">
      <h2 className="mb-20 lg:text-36">{title}</h2>
      <p>{text}</p>
    </div>
  </section>
);

export default Section;
