import React from 'react';

import Header from '../components/Header';
import CurvedSection from '../components/CurvedSection';
import Section from '../components/Section';
import Footer from '../components/Footer';

import screenMockups from '../assets/happygroupstock.jpg';
import flowingConversationsIllustration from '../assets/connect.png';
import yourUsersIllustration from '../assets/match.png';
import { FRONTEND } from '../constants/roles';
import explore from '../assets/explore-screen.png'
import chat from '../assets/chat-screen.png'
import interests from '../assets/interests-screen.png'

const Landing = () => {
  return (
    <>
      <Header />

      <div className="lg:flex lg:justify-center lg:items-center lg:mt-32 lg:mx-128 lg:mb-128">
        <section className="mt-80 lg:mt-128 px-8 text-center lg:text-left lg:w-50%">
          <h1 className="mb-24 lg:text-48">
            Find society events and meet more people at your university!
          </h1>
          <p className="mb-32 max-w-lg">
            Holler helps you find new friends while browsing society events happening at your
            uni! Match with other users based on the events you're going to!
          </p>
          
          <form action={FRONTEND + '/signup'}>
            <button className="btn-primary rounded-full" type="submit">
              {' '}
              Join Now{' '}
            </button>
          </form>
        </section>

        <div className="text-center lg:text-right">
          <img
            src={screenMockups}
            className="w-90% lg:w-70% max-w-xl mt-80 lg:mt-0 px-12 lg:w-70%"
            alt="Happy social group"
            style={{position:'relative', top:'50px'}}
          />
        </div>
      </div>


      <div className="mt-80">
        <CurvedSection
          topCurveClass="bg-top-curve-1"
          bottomCurveClass="bg-bottom-curve-1"
          title="Select your interests!"
          img={interests}
          imgAlt="Interests select"
          style={{'max-width':'auto', 'max-height': '32rem'}}
        >
          Let others know what you're interested in!
        </CurvedSection>
      </div>

      <div className="mt-80">
        <Section
          title="Find Fun Events!"
          img={explore}
          imgAlt="Features screen"
        >
          Find your university's society events and save the events you like!
        </Section>
      </div>

      <div className="mt-80">
        <CurvedSection
          topCurveClass="bg-top-curve-2"
          bottomCurveClass="bg-bottom-curve-2"
          title="Connect with Other Users!"
          img={chat}
          imgAlt="Group chat screen"
        >
          Talk to new people before the event starts!
        </CurvedSection>
      </div>

      <div className="mt-80 px-16 text-center">
        <h2 className="mb-32 lg:mb-32 lg:text-36">Ready to meet your new friends?</h2>
        <form action={FRONTEND + '/signup'}>
          <button className="btn-primary rounded-full" type="submit">
            {' '}
            Join Now{' '}
          </button>
        </form>
      </div>

      <div className="mt-80">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
