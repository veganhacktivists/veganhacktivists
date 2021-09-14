import React, { useState } from 'react';
import { firstLetterUppercase } from '../../../lib/helpers/strings';
import { DarkButton } from '../../decoration/buttons';
import { FirstSubSection } from '../../decoration/textBlocks';
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
      a vegan dietitian support program, a mentorship support program, and it now comes
      translated in 10 different languages!`,
  },
  animalrightsmap: {
    title: 'Animal Rights Map',
    url: 'animalrightsmap.org',
    content:
      // eslint-disable-next-line quotes
      `With over 2,500 groups, the Animal Rights Map is a globally updated map that helps
      vegans find local groups to get active with. Our map includes everyone from the
      largest organizations to the very small grassroots groups spread around the country.
      We worked with a few organizations to import new groups automatically, and we have a
      dedicated volunteer (that started this project) who meticulously updates the map
      almost every day. We've received a lot of great feedback for the map from vegans
      who were looking to get active - we plan on gathering more data soon and expanding
      the features of this map for 2021!`,
  },
  dailynooch: {
    title: 'Daily Nooch',
    url: 'dailynooch.org',
    content:
      // eslint-disable-next-line quotes
      `With this project we wanted to create something a little more fun and light-weight that
      vegans could enjoy consuming and sharing with the world. Daily Nooch is your one-stop
      source for daily vegan news, resources and inspiration. Designed to be your homepage,
      get the latest news, quotes, art, memes, facts, videos, and more updated every day at
      midnight. This project is very experimental and we don't know if vegans will use this
      consistently, but in the meantime the team had a lot of fun building it. If folks like
      it we have a bunch of fun ideas to explore that will add more interactivity to the project.`,
  },
  mydailydozen: {
    title: 'My Daily Dozen',
    url: 'mydailydozen.org',
    content:
      // eslint-disable-next-line quotes
      `Dr. Greger, founder of NutritionFacts.org, created an app called "Daily Dozen" that allows
      you to track your diet and make sure you get the best nutrition possible - and details the
      healthiest foods and how many servings of each we should try to check off every day.
      We wanted to expand on this concept and create a web-based version of his app with
      some additional features. Use My Daily Dozen to keep daily track of the foods
      recommended by Dr. Greger in his New York Times Bestselling book, How Not to Die.
      We hope that this project will give non-vegans the opportunity for an easier path
      to veganism by adopting a plant-based lifestyle.`,
  },
};

export const HighlightedProjects: React.FC = ({}) => {
  const [project, setProject] = useState('veganbootcamp');
  return (
    <div className="py-24">
      <FirstSubSection
        header="See our HIGHLIGHTED PROJECTS"
        firstWordsNum={2}
      />
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
              className="normal-case"
            >
              {firstLetterUppercase(
                PROJECTS[project as keyof typeof PROJECTS].url
              )}
            </DarkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
