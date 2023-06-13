import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { configureChains, createConfig, Chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getAuthProvider } from "../utils/getArcanaAuth";

export const connector = (chains: Chain[]) => {
  return new ArcanaConnector({
    chains,
    options: {
      auth: getAuthProvider(),
    },
  });
};

const { chains, publicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors: [connector(chains)],
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
