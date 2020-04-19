import React from 'react';

import NewsletterForm from './NewsletterForm';

import footerLogo from '../assets/footer-logo.svg';
import phoneIcon from '../assets/icon-phone.svg';
import emailIcon from '../assets/icon-email.svg';

const Footer = () => (
  <>
    <img className="bg-footer-curve min-w-full -mb-8" alt="Section curve illustration." />
    <footer className="lg:flex lg:flex-row-reverse lg:justify-around p-40 bg-dark text-white">
      <div className="max-w-md">
        <h3 className="mb-20 uppercase">Newsletter</h3>
        <p className="mb-28">
          To receive tips on how to grow your community, sign up to our weekly newsletter. We'll
          never send you spam or pass on your email address.
        </p>
        <div className="mb-64">
          <NewsletterForm />
        </div>
      </div>
      <div className="max-w-md">
        <img src={footerLogo} alt="Huddle company logo." className="mb-16" />
        <p className="mb-32">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eisumund tmepor incidunuit
          ut labore et dolor magna aliqua.
        </p>
        <div className="mb-32">
          <a href="tel:+15431234567">
            <div className="flex items-center mb-28">
              <img src={phoneIcon} alt="Phone icon." className="w-24 h-24 mr-24" />
              <span className="inline-block">Phone: +61-543-123-4567</span>
            </div>
          </a>
          <a href="mailto:example@fylo.com">
            <div className="flex">
              <img src={emailIcon} alt="Phone icon." className="w-24 h-24 mr-24" />
              <span className="inline-block">hello@holler.com</span>
            </div>
          </a>
        </div>
        <div className="lg:mt-64">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="icon ion-logo-facebook mr-32" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="icon ion-logo-instagram mr-32" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="icon ion-logo-twitter" />
          </a>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
