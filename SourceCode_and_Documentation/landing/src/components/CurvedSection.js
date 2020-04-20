import React from 'react';

import Section from './Section';

const CurvedSection = ({ topCurveClass, bottomCurveClass, children, ...rest }) => (
  <>
    <img className={`min-w-full -mb-8 ${topCurveClass}`} alt="Section curve illustration." />
    <Section className="bg-orange-light lg:flex-row-reverse" {...rest}>
      {children}
    </Section>
    <img className={`min-w-full -mt-8 ${bottomCurveClass}`} alt="Section curve illustration." />
  </>
);

export default CurvedSection;
