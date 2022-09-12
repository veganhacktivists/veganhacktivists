import React from 'react';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPatreon } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import SelectInput from '../../components/forms/inputs/selectInput';
import Label from '../../components/forms/inputs/label';
import CustomImage from '../../components/decoration/customImage';
import roundLogo from '../../../public/images/VH_Logo_Type_WhiteBG_Tagline_300.png';

import type { StaticImageData } from 'next/image';

const Logo: React.FC = () => (
  <div className="pt-10 md:pt-0 mt-20">
    <CustomImage
      src={roundLogo}
      alt="VH Round Logo"
      width={roundLogo.width * 0.5}
      height={roundLogo.height * 0.5}
    />
  </div>
);

const Data: React.FC = () => (
  <>
    <NextSeo title="Data" />
    <div className="bg-grey-background">
      <div className="flex mx-auto flex-wrap md:flex-nowrap items-start">
        <div
          id="data-options"
          className="flex flex-col w-full md:w-72 lg:w-80 bg-gray-dark p-5 relative"
        >
          <div className="w-full mb-4">
            <Label className="text-white" name="project" />
            <SelectInput theme="dark" name="project" />
          </div>
          <div className="w-full mb-4">
            <Label className="text-white" name="date-range">
              Date range
            </Label>
            <SelectInput theme="dark" name="date-range" />
          </div>
          <div className="w-full mb-4">
            <Label className="text-white" name="bot">
              Select bot
            </Label>
            <SelectInput theme="dark" name="bot" />
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
            <div className="social-media mt-3 hidden md:inline">
              <Logo />
              <p className="text-white mt-2 mb-3">Contact or feedback?</p>
              <a
                className="text-white p-3 text-center transition duration-500 hover:text-gray-light"
                href="https://www.instagram.com/veganhacktivists/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} fixedWidth />
              </a>
              <a
                className="text-white p-3 text-center transition duration-500 hover:text-gray-light"
                href="https://www.patreon.com/veganhacktivists"
                target="_blank"
                rel="noreferrer"
                aria-label="Support us on Patreon!"
              >
                <FontAwesomeIcon icon={faPatreon} fixedWidth />
              </a>
              <a
                className="text-white p-3 text-center transition duration-500 hover:text-gray-light"
                href="https://www.youtube.com/c/VeganHacktivists"
                target="_blank"
                rel="noreferrer"
                aria-label="Subscribe to our Youtube channel!"
              >
                <FontAwesomeIcon icon={faYoutube} fixedWidth />
              </a>
            </div>
          </div>
          <div className="bg-yellow w-10 h-10 absolute bottom-0 right-0 hidden md:inline" />
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
    </div>
  </>
);

export default Data;
