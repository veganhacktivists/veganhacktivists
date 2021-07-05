import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import PageWrapper, { MainWrapper } from "components/layout/wrapper";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <PageWrapper>
        <Header />

        <MainWrapper>
          <Component {...pageProps} />
        </MainWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default MyApp;
