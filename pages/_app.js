import { OpenFormatProvider } from "@simpleweb/open-format-react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <OpenFormatProvider config={{ network: "mumbai" }}>
      <Component {...pageProps} />
    </OpenFormatProvider>
  );
}

export default MyApp;
