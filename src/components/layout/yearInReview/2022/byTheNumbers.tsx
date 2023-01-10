import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import AnimatedNumber from '../../../decoration/animatedNumber';
import NumberImage from '../../../../../public/images/yearInReview/2022/numbers.png';

import CustomImage from 'components/decoration/customImage';

interface NumberProps extends React.PropsWithChildren {
  number: React.ReactNode;
  header?: boolean;
}

const Number: React.FC<NumberProps> = ({
  number,
  children,
  header = false,
}) => {
  return (
    <div className={classNames({ 'w-full xl:w-1/2 2xl:w-1/3 p-5': !header })}>
      <div>
        <div>{number}</div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

const ByTheNumbers: React.FC = () => {
  return (
    <>
      <div className="text-white uppercase pb-20 bg-black pt-20 px-5">
        <div className="flex justify-center pb-10">
          <CustomImage alt="" src={NumberImage} />
        </div>
        <span className="text-6xl font-bold">By the numbers</span>
        <div className="md:w-3/4 mx-auto text-left font-mono text-3xl pt-20 pb-10">
          <Number
            number={
              <AnimatedNumber
                className="text-7xl md:text-9xl text-magenta"
                number={3e6}
                approx
              />
            }
          >
            <b>Total unique page views</b> for all projects
          </Number>
          <div className="flex flex-col md:flex-row flex-wrap mt-5">
            <Number
              number={
                <AnimatedNumber number={13100} className="text-green" approx />
              }
            >
              Tweets by our <b>5 Minutes 5 Vegans</b> support bot
            </Number>
            <Number
              number={
                <AnimatedNumber number={93432} className="text-green" approx />
              }
            >
              Clicks directing activists to orgs{' '}
              <Link href="https://veganactivism.org">
                <a>
                  <b>veganactivism.org</b>
                </a>
              </Link>
            </Number>
            <Number
              number={
                <AnimatedNumber number={500000} className="text-green" approx />
              }
            >
              Unique page visits for <b>veganbootcamp.org</b>
            </Number>

            <Number
              number={
                <AnimatedNumber number={21000} className="text-yellow" approx />
              }
            >
              Total sign ups for <b>veganbootcamp.org</b>
            </Number>
            <Number
              number={
                <AnimatedNumber number={625} className="text-yellow" approx />
              }
            >
              New grassroots groups on <b>Activist Hub</b>
            </Number>
            <Number
              number={
                <AnimatedNumber number={134} className="text-yellow" approx />
              }
            >
              New resources added to <b>vegancheatsheet.org</b>
            </Number>

            <Number
              number={
                <AnimatedNumber
                  number={95}
                  className="text-orange-light"
                  approx
                />
              }
            >
              Groups added to <b>animalrightsmap.org</b>
            </Number>
            <Number
              number={
                <AnimatedNumber
                  number={103000}
                  className="text-orange-light"
                  approx
                />
              }
            >
              New comments made by <b>our Reddit bot</b>
            </Number>
            <Number
              number={
                <AnimatedNumber
                  number={40}
                  className="text-orange-light"
                  approx
                />
              }
            >
              <b>New team members</b> have joined us
            </Number>

            <Number
              number={
                <AnimatedNumber number={28} className="text-orange" approx />
              }
            >
              <b>New blog posts</b> from our comms team
            </Number>
            <Number
              number={
                <AnimatedNumber number={29} className="text-orange" approx />
              }
            >
              <b>Grants requested</b> from us within the first 45 days
            </Number>
            {/* <Number
              number={
                <AnimatedNumber number={40} className="text-orange" approx />
              }
            >
              <b>New team members</b> have joined us
            </Number> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default ByTheNumbers;
