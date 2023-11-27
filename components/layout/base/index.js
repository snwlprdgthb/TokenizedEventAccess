import { Web3Provider, useWeb3 } from "@components/web3";
import { Header } from "@components/layout";

export default function BaseLayout({ children }) {
  return (
    <>
      <Web3Provider>
        <Header />
        {children}
      </Web3Provider>
    </>
  );
}
