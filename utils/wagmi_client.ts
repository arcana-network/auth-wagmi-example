import { ArcanaConnector } from "@arcana/auth-wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { configureChains, createClient, Chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export const connector = (chains: Chain[]) => {
  return new ArcanaConnector({
    chains,
    options: {
      clientId: `xar_test_b2dde12aad64eb35d72b2c80926338e178b1fa3f`,
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
