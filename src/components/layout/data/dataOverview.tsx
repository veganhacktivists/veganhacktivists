import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChartSimple } from '@fortawesome/free-solid-svg-icons';

import SquareField from '../../decoration/squares';

const dataSquaresOverview = {
  top: [
    { color: 'gray-background', size: 4, right: 0, top: 0 },
    { color: 'gray-background', size: 4, right: 4, top: 4 },
  ],
  bottom: [
    { color: 'gray-background', size: 4, left: 0, bottom: 0 },
    { color: 'gray-background', size: 3, right: 0, bottom: 0 },
  ],
};

/**
 * Component of the overview section of the data page of a project
 * @type {React.FC}
 * @return {React.ReactElement} The overview section of the data page of a project
 */
const DataOverview: React.FC = () => {
  return (
    <div id="data-overview" className=" w-full mb-8">
      <div className="data-heading flex items-center mb-3">
        <FontAwesomeIcon
          className="text-blue-dark"
          icon={faChartSimple}
          fixedWidth
        />
        <h1 className="text-left ml-3">Data overview</h1>
      </div>
      <SquareField squares={dataSquaresOverview.top} />
      <div className="relative bg-white flex-wrap w-full flex p-4">
        <div className="pr-4 mb-6 lg:mb-0 lg:w-1/4 w-1/2 lg:border-r-2 border-gray-light border-solid">
          <div className="flex justify-center">
            <p className="font-mono font-semibold text-xl lg:text-4xl">125</p>
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
            <p className="font-mono font-semibold text-xl lg:text-4xl">85</p>
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
            <p className="font-mono font-semibold text-xl lg:text-4xl">78</p>
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
            <p className="font-mono font-semibold text-xl lg:text-4xl">14</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-red-dark rotate-45 mt-1 lg:mt-2 ml-1 text-xl lg:text-2xl"
              fixedWidth
            />
          </div>
          <p className=" lg:text-xl">New followers</p>
        </div>
      </div>
      <SquareField squares={dataSquaresOverview.bottom} />
    </div>
  );
};

export default DataOverview;
