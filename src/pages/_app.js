import "@/styles/globals.css";
import { Web3Button } from "@web3modal/react";
import Image from "next/image";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, polygonMumbai } from "wagmi/chains";

const chains = [sepolia, polygonMumbai];
const projectId = "66346846c869b05bd90b1788311d3e47";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            background: "#f7ebe2",
          }}
        >
          <Image
            src="/logo.png"
            width={180}
            height={100}
            alt="Picture of the author"
            onClick={() => {
              Router.replace("/");
            }}
            style={{
              cursor: "pointer",
            }}
          />
          <Web3Button />
        </div>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
