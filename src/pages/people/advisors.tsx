import Head from 'next/head';
import { PeopleHero, PeopleButtons } from 'components/layout/people';

const People: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Advisors | Vegan Hacktivists</title>
      </Head>
      <PeopleHero />
      <div className="m-10">
        <PeopleButtons />
        <div className="m-10 mb-40">Some People exist</div>
      </div>
    </>
  );
};

export default People;
