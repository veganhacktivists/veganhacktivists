import React from 'react';

import SquareField from 'components/decoration/squares';
import { LightButton } from 'components/decoration/buttons';

const TOP_DECORATION_SQUARES = [
  { color: '#454545', size: 16, left: 0, top: 0 },
  { color: '#FFC709', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  {
    left: 0,
    bottom: 0,
    color: 'white',
    size: 16,
  },
  {
    right: 0,
    bottom: 0,
    color: '#454545',
    size: 16,
  },
];

const Playground: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="bg-grey-dark pt-20 px-5">
        <div className="flex flex-row flex-wrap-reverse">
          <div className="w-full 2xl:w-1/2">
            <div className="xl:mx-auto xl:w-2/3">
              <div className="text-white text-left">
                <span className="block white text-6xl font-bold font-mono uppercase pb-5">
                  New & improved
                </span>
                <span className="text-xl">
                  Playground was our answer to meet the overwhelming demand of
                  tech and design support in our movement, while staying
                  sustainable as an organization with limited capacity. We
                  prioritized automating the process of connecting organizations
                  with technical, design, and other support needs from
                  volunteers.
                  <br />
                  <br />
                  Over 45 requests from organizations have been supported since
                  our launch. Over 1500 volunteers have joined the Playground
                  community, and it&apos;s growing every day!
                  <br />
                  <br />
                  These volunteers are not just developers or designers, but
                  also include data scientists, videographers, marketers,
                  security experts, researchers, and many more roles.
                </span>
                <div className="flex mt-10 pb-20">
                  <LightButton href={'/playground'}>Get support</LightButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default Playground;
