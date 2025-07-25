import type React from 'react';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import AnimatedNumber from '../../../decoration/animatedNumber';
import { SectionHeader } from '../../../decoration/textBlocks';

import SquareField from 'components/decoration/squares';
import CustomLink from 'components/decoration/link';
import getThemeColor from 'lib/helpers/theme';

const TOP_DECORATION_SQUARES = [
  { color: 'grey-dark', size: 16, right: 0, top: 0 },
];

interface StatProps {
  children: React.ReactNode;
  color?: string;
  isHeading?: boolean;
  toolTipText?: React.ReactNode;
}

const Stat = ({ children, color, isHeading = false }: StatProps) => (
  <div
    className={`font-mono relative pb-2 ${
      isHeading ? 'text-4xl md:text-6xl lg:pb-5' : 'text-3xl md:text-4xl'
    }${color ? ' text-' + color : ''}`}
  >
    {children}
  </div>
);

interface ToolTipProps {
  children: React.ReactNode;
  linkUrl: string;
}

const Tooltip = ({ children, linkUrl }: ToolTipProps) => {
  const intl = useIntl();
  const isClicked = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const clickToolTip = () => {
    // Only allow the click functionality on devices smaller than desktop
    if (window.innerWidth < 1024) isClicked.current = !isClicked.current;
  };

  const hoverToolTip = () => {
    if (isClicked.current !== true) toggleTooltip();
  };

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className="lg:relative inline-block"
      onMouseEnter={() => hoverToolTip()}
      onMouseLeave={() => hoverToolTip()}
    >
      <button
        type="button"
        onClick={clickToolTip}
        className="text-gray-500 hover:text-gray-700 focus:outline-none lg:z-20 relative"
        aria-label="Help"
      >
        <svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-3"
        >
          <path
            fill={isVisible ? 'black' : 'gray'}
            d="M8.625 4.71532H10.5417V6.60145H8.625V4.71532ZM8.625 8.48757H10.5417V14.146H8.625V8.48757ZM9.58333 0C4.29333 0 0 4.22493 0 9.43064C0 14.6363 4.29333 18.8613 9.58333 18.8613C14.8733 18.8613 19.1667 14.6363 19.1667 9.43064C19.1667 4.22493 14.8733 0 9.58333 0ZM9.58333 16.9751C5.35708 16.9751 1.91667 13.5895 1.91667 9.43064C1.91667 5.27173 5.35708 1.88613 9.58333 1.88613C13.8096 1.88613 17.25 5.27173 17.25 9.43064C17.25 13.5895 13.8096 16.9751 9.58333 16.9751Z"
          />
        </svg>
      </button>
      {isVisible && (
        <div className="z-10 w-full sm:w-auto absolute lg:pl-[40px] font-large left-1/2 bottom-full -translate-x-1/2 lg:translate-x-0 lg:top-3">
          <div
            className="border-solid top-0 absolute left-[10px] hidden lg:inline translate-x-1"
            // Tailwind was misbehaving with the border color and widths so I am styling inline
            style={{
              borderWidth: '0 30px 30px 0',
              borderColor: `transparent ${getThemeColor(
                'gray-light',
              )} transparent transparent`,
            }}
          />
          <div className="bg-gray-light w-full sm:w-80 px-3 py-2 text-base">
            {children}{' '}
            <CustomLink
              className="underline text-black hover:text-grey"
              href={linkUrl}
              disableMagenta={true}
            >
              {intl.formatMessage({
                id: 'page.year-in-review.2023.section.by-the-numbers.learn-more',
                defaultMessage: 'Learn more',
              })}
            </CustomLink>
          </div>
        </div>
      )}
    </div>
  );
};

const ByTheNumbers: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />
      <div className="pt-16 pb-12 md:pt-24 md:pb-20 px-5 md:px-10">
        <SectionHeader
          header={intl.formatMessage({
            id: 'page.year-in-review.2023.section.by-the-numbers.heading',
            defaultMessage: '<b>By the numbers</b>',
          })}
        />
        <div className="pb-10">
          <Stat color={'green'} isHeading={true}>
            <AnimatedNumber
              className="text-4xl md:text-6xl"
              number={133}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.heading',
              defaultMessage: 'Organizations Served',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={25}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.1',
              defaultMessage: 'BIPGM-led',
            })}
            <Tooltip linkUrl="https://faunalytics.org/glossary/">
              {intl.formatMessage({
                id: 'page.year-in-review.2023.section.by-the-numbers.services.1.tooltip',
                defaultMessage:
                  'BIPGM stands for Black, Indigenous, and People of the Global Majority.',
              })}
            </Tooltip>
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={29}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.2',
              defaultMessage: 'EA-aligned',
            })}
            <Tooltip linkUrl="https://www.effectivealtruism.org/articles/cause-profile-animal-welfare">
              {intl.formatMessage({
                id: 'page.year-in-review.2023.section.by-the-numbers.services.2.tooltip',
                defaultMessage:
                  'EA stands for Effective Altruism – groups who are focused on animal welfare.',
              })}
            </Tooltip>
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={50}
              suffix={'+ '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.3',
              defaultMessage: 'Different countries',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={220}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.services.4',
              defaultMessage: 'Services provided',
            })}
          </Stat>
        </div>
        <div className="pb-10">
          <Stat color={'yellow-orange'} isHeading={true}>
            <AnimatedNumber
              prefix={'$'}
              suffix={'+'}
              className="text-4xl md:text-6xl"
              number={750}
            />{' '}
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.heading',
              defaultMessage: 'Saved for the Movement',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={526}
              prefix={'$'}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.1',
              defaultMessage: 'Minimum',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={752}
              prefix={'$'}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.2',
              defaultMessage: 'On Average',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={978}
              prefix={'$'}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.cost-saved.3',
              defaultMessage: 'Maximum',
            })}
          </Stat>
        </div>
        <div>
          <Stat color={'magenta'} isHeading={true}>
            <FormattedMessage
              id="page.year-in-review.2023.section.by-the-numbers.grant-program.heading"
              defaultMessage="<b>Grant</b> Program"
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={126}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.grant-program.1',
              defaultMessage: 'Applicants',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={30}
              suffix={' '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.grant-program.2',
              defaultMessage: 'Applications approved',
            })}
          </Stat>
          <Stat>
            <AnimatedNumber
              className="text-3xl md:text-4xl"
              number={39}
              suffix={'k '}
            />
            {intl.formatMessage({
              id: 'page.year-in-review.2023.section.by-the-numbers.grant-program.3',
              defaultMessage: 'Given in seed grants',
            })}
          </Stat>
        </div>
      </div>
    </>
  );
};
export default ByTheNumbers;
