import { OpenFormatProvider } from "@simpleweb/open-format-react";
import Footer from "../components/footer";
import Header from "../components/header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <OpenFormatProvider config={{ network: "mumbai" }}>
      <main>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </OpenFormatProvider>
  );
}

export default MyApp;
