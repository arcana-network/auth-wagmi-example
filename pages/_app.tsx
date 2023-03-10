import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wagmiClient } from "../utils/wagmi_client";
import { WagmiConfig } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  );
}
