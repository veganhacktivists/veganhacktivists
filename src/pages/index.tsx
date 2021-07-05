import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Vegan Hacktivists | Developers Coding for a Vegan World</title>
      </Head>
      <div className="text-7xl">
        We <code className="text-9xl">Code</code> for the{" "}
        <span className="font-italic">animals</span>
      </div>
    </>
  );
};

export default Home;
