import React from 'react';

import Header from '../components/Header';
import Stat from '../components/Stat';
import CurvedSection from '../components/CurvedSection';
import Section from '../components/Section';
import Footer from '../components/Footer';

import screenMockups from '../assets/hero.png';
import iconCommunities from '../assets/icon-communities.svg';
import iconMessages from '../assets/icon-messages.svg';
import growTogetherIllustration from '../assets/events.png';
import flowingConversationsIllustration from '../assets/connect.png';
import yourUsersIllustration from '../assets/match.png';

const Landing = () => {
  return (
    <>
      <Header />

      <section className="mt-80 lg:mt-128 px-8 text-center">
        <h1 className="mb-24 lg:text-48">Go to events and meet more people at your university!</h1>
        <p className="mb-32 max-w-lg lg:mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut.
        </p>
        <form action="http://localhost:3001/signup">        
          <button className="btn-primary rounded-full" type="submit"> Join Now </button>
        </form>
      </section>

      <div className="text-center">
        <img
          src={screenMockups}
          className="w-50% max-w-xl mt-80 lg:mt-80 px-12"
          alt="Screen mockups of Huddle."
        />
      </div>

      <section className="lg:flex lg:justify-around mt-80 lg:px-96 text-center">
        <div className="mb-64">
          <Stat icon={iconCommunities} iconAlt="Communities icon." text="Groups Formed">
            1.4k+
          </Stat>
        </div>
        <div>
          <Stat icon={iconMessages} iconAlt="Messages icon." text="Messages Sent">
            2.7m+
          </Stat>
        </div>
      </section>

      <div className="mt-80">
        <CurvedSection
          topCurveClass="bg-top-curve-1"
          bottomCurveClass="bg-bottom-curve-1"
          title="Find Interesting Events"
          img={growTogetherIllustration}
          imgAlt="Grow together illustration."
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut.
        </CurvedSection>
      </div>

      <div className="mt-80">
        <Section
          title="Connect in Groups of 3s"
          img={flowingConversationsIllustration}
          imgAlt="Flowing Conversations illustration."
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut.
        </Section>
      </div>

      <div className="mt-80">
        <CurvedSection
          topCurveClass="bg-top-curve-2"
          bottomCurveClass="bg-bottom-curve-2"
          title="Clever Matching Engine"
          img={yourUsersIllustration}
          imgAlt="Your Users illustration."
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut.
        </CurvedSection>
      </div>

      <div className="mt-80 px-16 text-center">
        <h2 className="mb-32 lg:mb-32 lg:text-36">Ready to meet your new friends?</h2>
        <form action="http://localhost:3001/signup">        
          <button className="btn-primary rounded-full" type="submit"> Join Now </button>
        </form>
      </div>

      <div className="mt-80">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
