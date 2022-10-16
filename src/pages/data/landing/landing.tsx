import React from 'react';
import Link from 'next/link';

import SquareField from '../../../components/decoration/squares';
import Circle from '../../../components/decoration/circle';
import SelectInput from '../../../components/forms/inputs/selectInput';
import CustomImage from '../../../components/decoration/customImage';
import hero from '../../../../public/images/data/VH-goat-hero.jpg';
import heroTagline from '../../../../public/images/data/hero-tagline.png';

import type { DataDashboardProject } from '@prisma/client';

const Hero: React.FC = () => (
  <CustomImage
    src={hero}
    alt="Goat"
    width={hero.width}
    height={hero.height}
    objectFit="contain"
    layout="fill"
    objectPosition="right bottom"
    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 60vw,900px"
  />
);

const Tagline: React.FC = () => (
  <div className="lg:pt-10 md:pt-0">
    <CustomImage
      src={heroTagline}
      alt="More data, better impact, for the animals"
    />
  </div>
);

const dataSquares = {
  top: [{ color: 'orange', size: 10, right: 0, top: 0 }],
  middleTop: [
    { color: 'yellow', size: 5, right: 0, bottom: 0 },
    { color: 'green', size: 7, left: 0, bottom: 0 },
  ],
  middleBottom: [
    { color: 'pink', size: 5, right: 5, bottom: 0 },
    { color: 'yellow', size: 4, left: 2, top: 0 },
  ],
  bottom: [
    { color: 'yellow', size: 16, left: 0, bottom: 16 },
    { color: 'yellow', size: 16, left: 16, bottom: 0 },
    { color: 'pink', size: 24, right: 0, bottom: 0 },
    { color: 'white', size: 10, right: 24, bottom: 0 },
  ],
};

interface LandingProps {
  project: DataDashboardProject | undefined;
  projectOptions: DataDashboardProject[];
  changeProject: (id?: string) => void;
}

const Landing: React.FC<LandingProps> = ({
  project,
  projectOptions,
  changeProject,
}) => {
  return (
    <div className="relative">
      <SquareField squares={dataSquares.top} />
      <div className="flex lg:flex-row flex-col relative">
        <div
          id="imgCon"
          className="w-full sm:h-96 h-48 relative lg:static lg:h-auto lg:flex lg:justify-end lg:order-1 lg:w-1/2"
        >
          <Hero />
          <div className="z-10 absolute inset-0 pointer-events-none overflow-hidden">
            <Circle
              color="#BCBCBC"
              xAlign="left"
              yAlign="bottom"
              opacity={0.4}
              thickness="17px"
            />
            <Circle
              color="#BCBCBC"
              xAlign="right"
              yAlign="top"
              opacity={0.4}
              thickness="17px"
            />
          </div>
        </div>
        <SquareField
          squares={dataSquares.middleTop}
          className="lg:hidden inline"
        />
        <div
          id="textCon"
          className="z-20 relative w-full bg-white lg:bg-white/0 flex lg:justify-end px-5 lg:w-1/2"
        >
          <SquareField
            squares={dataSquares.middleBottom}
            className="lg:hidden inline"
          />
          <div className="flex flex-col w-full lg:max-w-xl">
            <Tagline />
            <p className="text-2xl lg:text-left mb-10">
              Staying true to our{' '}
              <Link href={'/about/our-mission'}>
                <a className="underline">mission statement</a>
              </Link>
              , we aim to increase the impact of our projects by building tools
              to help us both collect and utilize data.
              <br />
              <br />
              We also strongly believe sharing this data will lead others to
              increasing their own impact as-well.
            </p>
            <div className="w-full mb-10 lg:mb-36">
              <SelectInput
                theme="dark"
                className="font-mono"
                options={
                  projectOptions?.map((p) => ({
                    value: p.id,
                    label: p.label,
                  })) ?? []
                }
                placeholder={'Select A Project'}
                name="project"
                current={
                  project ? { value: project.id, label: project.label } : null
                }
                onChange={(option) => {
                  changeProject(option?.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <SquareField squares={dataSquares.bottom} className="hidden lg:block" />
    </div>
  );
};

export default Landing;
