import {
  AboutButtons,
  AboutHero,
  SubSection,
  FirstSubSection,
} from 'components/layout/about';

const OurMission: React.FC = () => {
  return (
    <>
      <AboutHero />
      <div className="m-10">
        <AboutButtons />
        <FirstSubSection header="Our Story">
          The Vegan Hacktivists started as a one-man team with the goal of
          launching one project per month to help further the vegan cause by
          supporting both vegans, non-vegans and activists. After launching our
          first project (midnight, New Year’s Day of 2019) VeganActivism.org, we
          were overwhelmed by the response and generosity that came from the
          community offering to volunteer!
        </FirstSubSection>
        <SubSection>
          Since that day we’ve grown to 80+ volunteers of developers, designers,
          and content creators that work close together in small teams working
          on several projects at a time. As time went on, we slowly gathered the
          attention and support of several well-known activists, organizations,
          and vegan communities. We’re incredibly grateful to have had the
          chance to support organizations such as Meat The Victims, Animal
          Rebellion, The Save Movement, and others!
        </SubSection>
        <SubSection>
          We currently have 5 teams, team sweet potato 🍠, team broccoli 🥦,
          team eggplant 🍆, team banana 🍌 and team carrot 🥕 — these teams have
          their own developers, designers, and team leaders that manage their
          assigned projects respectively. Whether it’s an idea of our own that
          we think could help further the vegan cause, or if it’s an
          organization or activist that’s approached us for help, we work
          non-stop to hit our goal for spreading peace and compassion through
          our animal rights activism. We do this for the animals, we do this
          because coding is our way of doing our part for activism. Every
          project we release is 100% free to use for everyone, we don’t do
          premium versions, microtransactions, sell user data, or do
          advertisements whatsoever. If you want to support us, please consider
          a small donation via our Patreon, it means the world to us to have
          your support.
        </SubSection>
        <SubSection>
          We routinely meet up at vegan events, communicate daily using
          hangouts, and play games together during our breaks and weekends.
          Volunteering behind a worthy cause is empowering, but having
          tight-knit friendships and fun activities really bring us together and
          reinvigorate our passion in working harder for the animals. If this
          sounds like a group you’d like to volunteer for, and you have the
          time, please click over here and find out how!
        </SubSection>
      </div>
    </>
  );
};

export default OurMission;
