import AnimatedNumber from '../../../decoration/animatedNumber';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';

import { HighlightBlock } from './highlightBlock';

import SquareField from 'components/decoration/squares';

const Intro: React.FC = () => {
  return (
    <>
      <SquareField
        squares={[
          { size: 16, right: 0, top: 0, color: 'grey-background' },
          { size: 16, right: 0, bottom: 0, color: 'grey-light' },
          { size: 16, left: 0, bottom: 0, color: 'white' },
        ]}
        className="hidden md:block z-10"
      />
      <SectionContainer
        header={
          <SectionHeader
            header={['Providing value through', 'Capacity-building services']}
            stackEntries={true}
            newDesign={true}
            className="text-black"
          />
        }
      >
        <div className="md:w-2/3 mx-auto pb-10">
          This year, we leaned into our role and strength as capacity builders
          by expanding both our services and our professional volunteer network.
          We saved the movement over half a million dollars by serving over 120
          organizations this year alone with our tech, design and advisory
          services. And we&apos;re just getting started!
        </div>
        <div className="flex flex-col md:flex-row flex-wrap w-4/5 xl:w-2/3 2xl:w-2/3 mx-auto mb-10">
          <div className="flex flex-col w-full md:w-1/2 xl:w-1/3 md:px-4 py-4 xl:py-0">
            <AnimatedNumber
              number={620}
              className="text-left text-yellow-orange"
              prefix={'$'}
              suffix={'K'}
            />
            <div className="text-left">
              Saved by organizations using our{' '}
              <span className="text-yellow-orange font-bold">
                free tech, design, and advisory services
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 xl:w-1/3 md:px-4 py-4 xl:py-0">
            <AnimatedNumber
              number={715}
              className="text-left text-magenta"
              prefix={'$'}
              suffix={'K'}
            />
            <div className="text-left">
              Total value of{' '}
              <span className="text-magenta font-bold">
                technology built to date
              </span>{' '}
              for the animal protection movement
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 xl:w-1/3 md:px-4 py-4 xl:py-0">
            <span className="text-left font-bold font-mono text-7xl md:text-8xl text-green">
              $1.7M
            </span>
            <div className="text-left">
              The cost for a company to deliver the{' '}
              <span className="text-green font-bold">same output per year</span>
            </div>
          </div>
        </div>
        <div className="xl:w-2/3 2xl:w-2/3 mx-auto mb-8">
          <div className="bg-grey-border bg-opacity-20 p-10 text-lg">
            Amounts are in USD. Due to the nature of volunteer work, such as
            location of volunteer / cost of living, experience, hours
            contributed, hourly rate, and many other variables, these numbers
            are both conservative and rough estimates.
          </div>
          <div>
            <SquareField
              squares={[
                {
                  top: 0,
                  left: 0,
                  color: '#d31679',
                  size: 10,
                },
              ]}
            />
            <div className="bg-magenta flex flex-row flex-wrap p-12 px-2">
              <div className="flex items-center flex-wrap w-full md:w-1/2 text-white text-8xl font-mono px-2 justify-center">
                <span className="font-bold">9600+</span>{' '}
                <span className="uppercase font-light">Hours</span>
              </div>
              <div className="flex items-center flex-wrap w-full md:w-1/2 text-white text-3xl font-serif italic font-bold  text-center md:text-left px-2 justify-center">
                volunteered in 2022 for the animal protection movement
              </div>
            </div>
          </div>
          <SquareField
            squares={[
              {
                bottom: 0,
                right: 0,
                color: '#d31679',
                size: 10,
              },
            ]}
          />
        </div>
        <div>
          <HighlightBlock
            borderColor="magenta"
            headerStart="We partnered with"
            headerBold="10 organizations"
            headerEnd="for animal protection"
          >
            <b>We are immensely thankful</b> for the opportunity to partner and
            collaborate with other organizations dedicated to animal protection
            such as Sentient Media, Open Sanctuary, Animal Advocacy Careers, and
            Animal Defense Partnerships, and others.
          </HighlightBlock>
          <HighlightBlock
            borderColor="yellow"
            headerStart="We expanded our network by over"
            headerBold="1500+ volunteers"
            headerEnd=""
          >
            <b>Within our Playground community,</b> we&apos;ve been able to
            expand our network of volunteers to 1500+ strong utilizing skills
            like developers, designers, writers, editors, researchers,
            marketers, data scientists, and many other roles.
          </HighlightBlock>
          <HighlightBlock
            borderColor="green"
            headerStart="Building"
            headerBold="projects, research and community"
            headerEnd="in 2022"
          >
            <b>Beyond building technology,</b> we work hard to find and fill
            gaps in our movement. This not only includes building our projects,
            but also launching our research study, participating in various
            international conferences, and investing in the growth of
            communities.
          </HighlightBlock>
        </div>
      </SectionContainer>
    </>
  );
};

export default Intro;
