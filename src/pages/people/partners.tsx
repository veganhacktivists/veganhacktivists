import Head from 'next/head';
import { PeopleHero, PeopleButtons } from 'components/layout/people';
import { FirstSubSection } from 'components/decoration/textBlocks';

const People: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Partners | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="m-10">
        <PeopleButtons />
        <FirstSubSection header="Our partners">{null}</FirstSubSection>
        <div className="m-10 mb-40">Some People exist</div>
      </div>
    </>
  );
};

export default People;
