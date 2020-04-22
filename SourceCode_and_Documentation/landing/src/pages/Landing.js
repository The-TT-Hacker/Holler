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
import { FRONTEND } from '../constants/roles';

const Landing = () => {
  return (
    <>
      <Header />

      <div className="lg:flex lg:justify-center lg:items-center lg:mt-32 lg:mx-128 lg:mb-128">
        <section className="mt-80 lg:mt-128 px-8 text-center lg:text-left lg:w-50%">
          <h1 className="mb-24 lg:text-48">
            Go to events and meet more people at your university!
          </h1>
          <p className="mb-32 max-w-lg">
            Holler helps you find your mates while exploring interesting events happening at your
            uni! Mark an event as going and you will be matched with other people going to the event
            based on your profile.
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
            className="w-70% lg:w-50% max-w-xl mt-80 lg:mt-0 px-12 lg:w-70%"
            alt="Screen mockups of Huddle."
          />
        </div>
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
          Find events available in your uni. Filter events by type and date and quickly join in an
          event! Upcoming events that you have currently signed up for. You would have new friends
          to go with for each event!
        </CurvedSection>
      </div>

      <div className="mt-80">
        <Section
          title="Connect in Groups of 3s"
          img={flowingConversationsIllustration}
          imgAlt="Flowing Conversations illustration."
        >
          Match with friends that are going to similar events here! Now you don’t have to worry
          about going to events alone! Your collected badges for each task/ action you complete.
          Compete with friends and members to clinch the most badges.
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
          Your profile and your information. Holler will use this to provide you with events that
          best matches your interests.
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
