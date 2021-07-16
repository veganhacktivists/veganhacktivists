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
        <div>
          <FirstSubSection header="Our Values">
            We know that promoting and embracing strong core values for our
            organization is vital in recruiting diverse and talented volunteers
            from all over the world. By making our community safe and welcoming
            for everyone, we build a more productive work environment in which
            all of us can thrive and be the best version of ourselves when
            fighting for the animals.
          </FirstSubSection>

          <SubSection header="Animal Liberation">
            We value and respect the lives of all animals and denounce all forms
            of violence and exploitation against them. We believe animals have
            the right to be free, and we fight for that with our activism.
          </SubSection>

          <SubSection header="Non-violence">
            We practice a love-based organizational approach. We exercise
            kindness, compassion, and nonviolence. We encourage every member to
            fearlessly and openly communicate with leaders.
          </SubSection>

          <SubSection header="Safe Community">
            We believe in building and fostering inclusive communities
            regardless of race, gender, species, age, sexual orientation, or
            political affiliation. We strive to be diverse and embrace growth in
            improving ourselves.
          </SubSection>

          <SubSection header="Farmed Animals">
            We believe farmed animals are in most need of our support, and thus
            as an organization we encourage and focus primarily on farmed animal
            liberation within our activism, projects, and support.
          </SubSection>

          <SubSection header="Open Feedback">
            We value the viewpoints, feedback, and criticisms from every person,
            we believe everyone has something of value to contribute to the
            discussion. We always listen first, then respond constructively.
          </SubSection>

          <SubSection header="Anti-oppression">
            We believe the discrimination and oppression of our friends, family,
            and activists affects both their right to well-being and their
            ability to fight for animal liberation – we aim to support our
            community.
          </SubSection>
        </div>
      </div>
    </>
  );
};

export default OurMission;
