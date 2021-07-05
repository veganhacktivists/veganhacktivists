import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Header from "components/layout/header";
import Footer from "components/layout/footer";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
};

export default MyApp;
