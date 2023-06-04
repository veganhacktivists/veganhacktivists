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
        <span className="text-6xl font-bold font-mono">By the numbers</span>
        <div className="md:w-3/4 mx-auto text-left font-mono text-3xl pt-20 pb-10">
          <Number
            number={<AnimatedNumber number={2636} className="text-magenta" />}
          >
            <b>Volunteer applicants</b> for Vegan Hacktivists
          </Number>
          <div className="flex flex-col md:flex-row flex-wrap mt-5">
            <Number
              number={<AnimatedNumber number={56623} className="text-green" />}
            >
              Emails successfully sent across all <b>newsletters</b>
            </Number>
            <Number
              number={<AnimatedNumber number={2077} className="text-green" />}
            >
              Clicks from our newsletter <b>to our services</b>
            </Number>
            <Number
              number={<AnimatedNumber number={147} className="text-green" />}
            >
              <b>Organizations suppported</b> by Vegan Hacktivists
            </Number>
            <Number
              number={
                <AnimatedNumber number={133060} className="text-yellow" />
              }
            >
              Visitors to{' '}
              <Link href="https://watchdominion.org">
                <b>watchdominion.org</b>
              </Link>
            </Number>
            <Number
              number={<AnimatedNumber number={812} className="text-yellow" />}
            >
              Translators signed up on{' '}
              <Link href="https://veganlinguists.org">
                <b>veganlinguists.org</b>
              </Link>
            </Number>
            <Number
              number={
                <AnimatedNumber number={147382} className="text-yellow" />
              }
            >
              Words translated on{' '}
              <Link href="https://veganlinguists.org">
                <b>veganlinguists.org</b>
              </Link>
            </Number>

            <Number
              number={
                <AnimatedNumber number={10823} className="text-orange-light" />
              }
            >
              Courses completed on{' '}
              <Link href="https://veganbootcamp.org">
                <b>veganbootcamp.org</b>
              </Link>
            </Number>
            <Number
              number={
                <AnimatedNumber number={18102} className="text-orange-light" />
              }
            >
              Users signed up on{' '}
              <Link href="https://veganbootcamp.org">
                <b>veganbootcamp.org</b>
              </Link>
            </Number>
            <Number
              number={
                <AnimatedNumber number={3025} className="text-orange-light" />
              }
            >
              Activists signed up on{' '}
              <Link href="https://activisthub.org">
                <b>activisthub.org</b>
              </Link>
            </Number>

            <Number
              number={<AnimatedNumber number={754} className="text-orange" />}
            >
              Global events launched on{' '}
              <Link href="https://activisthub.org">
                <b>activisthub.org</b>
              </Link>
            </Number>
            <Number
              number={<AnimatedNumber number={15008} className="text-orange" />}
            >
              Actions performed on{' '}
              <Link href="https://activisthub.org">
                <b>activisthub.org</b>
              </Link>
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
