import CustomImage from '../../../decoration/customImage';
import CustomLink from '../../../decoration/link';
import AnimatedNumber from '../../../decoration/animatedNumber';
import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import { HighlightBlock } from '../highlightBlock';
import avocadoIcon from '../../../../../public/images/people/teamIcons/icon-avo.png';
import peachIcon from '../../../../../public/images/people/teamIcons/icon-peach.png';
import mangoIcon from '../../../../../public/images/people/teamIcons/icon-mango.png';
import watermelonIcon from '../../../../../public/images/people/teamIcons/icon-wmelon.png';
import sweetPotatoIcon from '../../../../../public/images/people/teamIcons/icon-spotato.png';

const Intro: React.FC = () => {
  return (
    <>
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
        <div>
          <HighlightBlock
            borderColor="magenta"
            headerStart="We launched"
            headerBold="8 new projects"
            headerEnd="for the movement"
          >
            <b>Four of which were in-house projects.</b> We were also lucky
            enough to work on projects with Sehati Animal Sanctuary, Animal
            Alliance Asia, Vegan Japan Consulting, and many more.
          </HighlightBlock>
          <HighlightBlock
            borderColor="yellow"
            headerStart="We"
            headerBold="expanded our advisory team"
            headerEnd="of vegan experts"
          >
            <b>We&apos;re so thankful to have more advisors to lean on</b> such
            as Katie from Animal Equality, Chris from APEX Advocacy, Tessa from
            the Pollination Project, and Casey from Faunalytics. To browse more
            of our advisors,{' '}
            <CustomLink href="/people/advisors">click here.</CustomLink>
          </HighlightBlock>
          <HighlightBlock
            borderColor="green"
            headerStart="We expanded with"
            headerBold="5 new teams"
            headerEnd="in just 6 months"
          >
            <b>More teams, more impact!</b> We&apos;re so happy to announce the
            growth of our community with five new amazing teams. Please welcome
            Team Avocado, Team Mango, Team Watermelon, and Team Sweet Potato.
          </HighlightBlock>
          <div className="flex flex-row md:w-1/3 mx-auto mb-20 mt-20">
            {[
              avocadoIcon,
              peachIcon,
              mangoIcon,
              watermelonIcon,
              sweetPotatoIcon,
            ].map((icon) => (
              <div key={icon.src}>
                <CustomImage
                  src={icon}
                  alt={icon.src}
                  height={250}
                  width={250}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Intro;
