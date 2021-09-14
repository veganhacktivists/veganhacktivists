import React, { useState } from 'react';
import { DarkButton } from '../../decoration/buttons';
import { ContentButton } from './contentButton';

const PROJECTS = {
  veganbootcamp: {
    title: 'Vegan Bootcamp',
    url: 'veganbootcamp.org',
    content:
      // eslint-disable-next-line quotes
      `Following the success of Vegan Bootcamp\'s launch in 2019 with over 5000+ signups,
      we decided to invest more time in improving it. We sent out a survey to all members
      and received a large amount of feedback helping us decide what new content and
      features were needed. Vegan Bootcamp now includes community forums, individual
      courses, tags, better rewards, advanced statistics for referrals, content search,
      a vegan dietitian support program, a mentorship support program, and in
      10 different languages!`,
  },
  animalrightsmap: {
    title: 'Animal Rights Map',
    url: 'animalrightsmap.org',
    content:
      // eslint-disable-next-line quotes
      `Knowing how hard it is to find local activist groups, we wanted to create a map
			that would include every group out there, both small local groups and larger organizations
			with thousands of groups. If you're a vegan who wants to get active, we want to make it
			as easy as possible for you to be able to find and join groups in your local area. And
			that's just what we did! With over 2,500 groups, browse the largest collection of animal
			rights activist groups all located in one single map. Filter and learn more information
			on which vegan activist organizations you‘d like to join in your area. We worked with a
			few organizations to import new groups automatically, and we have a dedicated volunteer
			(who built the database for this project) who meticulously updates the map every week.
			We're really happy with how this project turned out, and we've received a lot of great
			feedback from people who were looking to get active who found this project super useful!
			We plan on gathering more data soon and expanding the features of this map for 2021.`,
  },
  dailynooch: {
    title: 'Daily Nooch',
    url: 'dailynooch.org',
    content:
      // eslint-disable-next-line quotes
      `With this project we wanted to create something a little more fun and light-weight,
			something Vegans could enjoy opening, consuming and sharing with the world. Daily
			Nooch is your one-stop source for daily vegan news, resources and inspiration! Designed
			to be your homepage, get the latest news, quotes, art, memes, facts, videos, and much
			much more updated every day. You're guaranteed to always find something new or inspirational
			every single day. This project is very experimental and we don't know if vegans will use
			this consistently, but if they do we plan on adding more customization options and more widgets.
			In the meantime the team had a lot of fun building this project, we're really happy with the
			cute design, and we've been using it since before the release ourselves to get our daily fix!`,
  },
  mydailydozen: {
    title: 'My Daily Dozen',
    url: 'mydailydozen.org',
    content:
      // eslint-disable-next-line quotes
      `Many of us are fans of Dr. Greger's work as he's a well known doctor in the vegan movement.
			Dr. Greger, founder of NutritionFacts.org, created an app called "Daily Dozen" that allows
			you to track your diet and make sure you get the best nutrition possible - and details the
			healthiest foods and how many servings of each we should try to check off every day. We
			wanted to expand on this concept and create a web-based version of his app with some additional
			features. Use My Daily Dozen to keep daily track of the foods recommended by Dr. Greger in his
			New York Times Bestselling book, How Not to Die, and now his new book, How Not to Diet! Dr.
			Greger’s Daily Dozen. Normally we don't work on plant-based only projects but we do recognize
			that there are many paths to Veganism and Dr. Gregers Daily Dozen project allows potential
			non-vegans to easily adopt a healthy lifestyle.`,
  },
};

export const HighlightedProjects: React.FC = ({}) => {
  const [project, setProject] = useState('veganbootcamp');
  return (
    <div className="py-24">
      <h1 className="text-6xl text-grey font-mono mx-auto mb-12">
        HIGHLIGHTED PROJECTS
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-x-16">
        <div>
          <div className="overflow-hidden pb-80">
            <ContentButton
              contentTitle="Vegan Bootcamp"
              setContent={setProject}
              currentContent={project}
            />
            <ContentButton
              down={project === 'veganbootcamp'}
              contentTitle="Animal Rights Map"
              setContent={setProject}
              currentContent={project}
            />
            <ContentButton
              down={
                project === 'veganbootcamp' || project === 'animalrightsmap'
              }
              contentTitle="Daily Nooch"
              setContent={setProject}
              currentContent={project}
            />
            <ContentButton
              down={project !== 'mydailydozen'}
              contentTitle="My Daily Dozen"
              setContent={setProject}
              currentContent={project}
            />
          </div>
        </div>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 md:text-left mt-8 md:mt-0 mx-auto md:mx-0">
          <h1 className="text-4xl font-bold mb-8">
            {PROJECTS[project as keyof typeof PROJECTS].title}
          </h1>
          <p className="text-2xl">
            {PROJECTS[project as keyof typeof PROJECTS].content}
          </p>
          <div className="flex mt-10">
            <DarkButton
              href={'https://' + PROJECTS[project as keyof typeof PROJECTS].url}
            >
              {PROJECTS[project as keyof typeof PROJECTS].url}
            </DarkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
