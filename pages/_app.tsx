import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { configureChains, createClient, Chain } from "wagmi";
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

const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [connector(chains)],
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
