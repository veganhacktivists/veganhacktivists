import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import Circle from '../../components/decoration/circle';
import CustomImage from '../../components/decoration/customImage';
import Label from '../../components/forms/inputs/label';
import SelectInput from '../../components/forms/inputs/selectInput';
import hero from '../../../public/images/data/VH-goat-hero.jpg';
import heroTagline from '../../../public/images/data/hero-tagline.png';
import SquareField from '../../components/decoration/squares';

const Tagline: React.FC = () => (
  <div className="lg:pt-10 md:pt-0">
    <CustomImage
      src={heroTagline}
      alt="More data, better impact, for the animals"
      width={heroTagline.width}
      height={heroTagline.height}
    />
  </div>
);

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

const Data: React.FC = () => {
  const [dataDisplayed, displayData] = useState(false);
  const changeProject = () => {
    displayData(true);
  };

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

  const DataUI: React.FC = () => {
    return (
      <div className="flex mx-auto flex-wrap md:flex-nowrap items-start">
        <div
          id="data-options"
          className="flex flex-col w-full md:w-72 lg:w-80 bg-gray-dark p-5 relative"
        >
          <div className="w-full mb-4">
            <Label className="text-white" name="project" />
            <SelectInput
              theme="data"
              name="project"
              current={null}
              options={[]}
            />
          </div>
          <div className="w-full mb-4">
            <Label className="text-white" name="date-range">
              Date range
            </Label>
            <SelectInput
              theme="data"
              name="date-range"
              current={null}
              options={[]}
            />
          </div>
          <div className="w-full mb-4">
            <Label className="text-white" name="bot">
              Select bot
            </Label>
            <SelectInput theme="data" name="bot" current={null} options={[]} />
          </div>
          <div className="w-full">
            <p className="mb-2 text-white font-bold text-left block">
              Show / Hide
            </p>
            <div className="checkbox-container mb-3 flex items-center">
              <input
                className={
                  'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
                }
                type="checkbox"
                name="engagement"
              />
              <Label className="text-white mb-0 ml-3" name="engagement">
                User engagement
              </Label>
            </div>
            <div className="checkbox-container mb-3 flex items-center">
              <input
                className={
                  'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
                }
                type="checkbox"
                name="replies"
              />
              <Label className="text-white mb-0 ml-3" name="replies">
                Nº of replies
              </Label>
            </div>
            <div className="checkbox-container flex items-center">
              <input
                className={
                  'h-6 w-6 block focus:!ring-0 appearance-none checked:bg-green-dark active:bg-green-dark border-white border before:absolute relative checked:before:content-["✓"] before:inset-0 before:text-white before:text-center before:my-auto pl-0 pr-0 pt-0 pb-0 before:w-full before:h-full box-content before:-translate-y-0.5 my-auto'
                }
                type="checkbox"
                name="retweets"
              />
              <Label className="text-white mb-0 ml-3" name="retweets">
                Nº of retweets
              </Label>
            </div>
          </div>
        </div>
        <div id="data" className=" w-full p-5">
          <div id="data-overview" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-blue-dark"
                icon={faChartSimple}
                fixedWidth
              />
              <h1 className="text-left ml-3">Data overview</h1>
            </div>
            <div className="relative bg-white flex-wrap w-full flex p-4">
              <div className="pr-4 mb-6 lg:mb-0 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    125
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">Total replies</p>
              </div>
              <div className="px-4 mb-6 lg:mb-0 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    85
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">Total retweets</p>
              </div>
              <div className="px-4 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    78
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-green-dark -rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">
                  Average <span className="hidden lg:inline">number of</span>
                  <span className="lg:hidden inline">#</span>&nbsp;likes
                </p>
              </div>
              <div className="pl-4 lg:w-1/4 w-1/2">
                <div className="flex justify-center">
                  <p className="font-mono font-semibold text-xl lg:text-4xl">
                    14
                  </p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-red-dark rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
                    fixedWidth
                  />
                </div>
                <p className=" lg:text-xl">New followers</p>
              </div>
              <div className="hidden md:inline bg-grey-background w-4 h-4 absolute bottom-0 left-0" />
              <div className="hidden md:inline bg-grey-background w-3 h-3 absolute bottom-0 right-0" />
              <div className="hidden md:inline bg-grey-background w-4 h-4 absolute top-0 right-0" />
              <div className="hidden md:inline bg-grey-background w-3 h-3 absolute top-4 right-4" />
            </div>
          </div>
          <div id="number-of-retweets" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                icon={faChartPie}
                className="text-orange"
                fixedWidth
              />
              <h1 className="text-left ml-3">Number of Retweets</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-orange h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
          <div id="number-of-replies" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-purple"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">Number of Replies</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-purple h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
          <div id="user-engagement-replies" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-yellow"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">User engagement - User replies</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-yellow h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
          <div id="user-engagement-likes" className=" w-full mb-8">
            <div className="data-heading flex items-center mb-3">
              <FontAwesomeIcon
                className="text-green"
                icon={faChartBar}
                fixedWidth
              />
              <h1 className="text-left ml-3">User engagement - Likes</h1>
            </div>
            <div>
              <div className="flex bg-gray-dark h-3">
                <div className="bg-green h-full w-10" />
              </div>
              <div className="h-28 bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Landing: React.FC = () => {
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
                , we aim to increase the impact of our projects by building
                tools to help us both collect and utilize data.
                <br />
                <br />
                We also strongly believe sharing this data will lead others to
                increasing their own impact as-well.
              </p>
              <div className="w-full mb-10 lg:mb-36">
                <SelectInput
                  theme="dark"
                  className="font-mono"
                  options={[
                    { value: 'project-1', label: 'Project 1' },
                    { value: 'project-2', label: 'Project 2' },
                    { value: 'project-3', label: 'Project 3' },
                  ]}
                  placeholder={'Select A Project'}
                  name="project"
                  current={null}
                  onChange={changeProject}
                />
              </div>
            </div>
          </div>
        </div>
        <SquareField squares={dataSquares.bottom} className="hidden lg:block" />
      </div>
    );
  };
  return (
    <>
      <NextSeo title="Data" />
      <div className="bg-grey-background relative">
        {!dataDisplayed ? <Landing /> : <DataUI />}
      </div>
    </>
  );
};

export default Data;
