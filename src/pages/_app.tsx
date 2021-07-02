import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Header from "components/layout/header";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
