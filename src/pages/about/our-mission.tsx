import {
  AboutButtons,
  SubSection,
  FirstSubSection,
} from 'components/layout/about';

const OurMission: React.FC = () => {
  return (
    <div className="m-10">
      <AboutButtons />
      <div>
        <FirstSubSection header="OUR MISSION">
          Our mission is to build new, data-driven, disruptive, and innovative
          projects to help end animal exploitation. We believe the animal rights
          movement has four fundamental areas it can improve on that we aim to
          solve through our work.
        </FirstSubSection>
        <SubSection header="We need more data in our movement.">
          We can’t realistically track or be confident that the projects and
          organizations out there right now are as effective as they can be. We
          strongly believe this is the largest issue in growing our movement,
          and so we aim to build, utilize, and gather data through our projects
          and network – and then share that data.
        </SubSection>
        <SubSection header="We need more competition, too.">
          We strongly believe competition is not only healthy but vital in
          growing and improving our movements’ effectiveness. Competition puts
          heat on other organizations and projects to keep building, improving,
          and innovating – and gives them more data on what works, and what
          doesn’t work.
        </SubSection>
        <SubSection header="We need more innovation and collaboration.">
          We believe the movement has a lot of room and potential to be more
          innovative in its approaches. We aim to help organizations and
          activists by giving them the network and tools to promote more
          collaboration, and utilize their massive networks to help each other
          with pressure campaigns, data evaluation, etc.
        </SubSection>
        <SubSection header="We need more vegans to become active.">
          Only a tiny percentage of the world is vegan, and a fraction within
          are active. Most organizations focus on converting vegans whether
          through health, environmental, or ethical reasons. We believe that we
          can be more effective by creating tools to help, inspire, and motivate
          more vegans to become activists.
        </SubSection>
      </div>
    </div>
  );
};

export default OurMission;
