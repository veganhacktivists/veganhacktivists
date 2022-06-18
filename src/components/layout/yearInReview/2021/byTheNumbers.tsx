import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import AnimatedNumber from '../../../decoration/animatedNumber';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

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
      <SectionContainer
        className="text-white uppercase"
        color="grey-darker"
        header={<SectionHeader header="By the numbers" startWithBoldFont />}
      >
        <div className="md:w-3/4 mx-auto text-left font-mono text-3xl pb-10">
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
              Unique page visits for <b>Vegan Bootcamp</b>
            </Number>

            <Number
              number={
                <AnimatedNumber number={21000} className="text-yellow" approx />
              }
            >
              Total sign ups for <b>Vegan Bootcamp</b>
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
              New resources added to <b>Vegan Cheat Sheet</b>
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
              Groups added to <b>Animal Rights Map</b>
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
              New comments made by our <b>Reddit bot</b>
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
              <b>New blog posts</b> from our content team
            </Number>
            <Number
              number={
                <AnimatedNumber number={29} className="text-orange" approx />
              }
            >
              <b>Grants requested</b> of us within the first 45 days
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
      </SectionContainer>
    </>
  );
};
export default ByTheNumbers;
