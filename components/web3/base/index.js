import { createContext, useContext, useEffect, useState, useMemo } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { CONTRACT_ABI,  CONTRACT_ADDRESS } from  "../../../utils/contractInfo";
import {Web3} from "web3";
import { setupHooks } from "@components/web3/hooks/setupHooks";


const Web3Context = createContext(null);


export default function Web3Provider({ children }) {
  const [Web3api, setWeb3api] = useState({
    provider: null,
    web3: null,
    contract: null,
    ethersContract: null,
    isLoading: true,
    requireInstall: true,
    hooks: setupHooks()
  });

  const setListener = provider => {
    provider.on("chainChanged", _ => window.location.reload());
  };

  useEffect(() => {

    const loadProvider = async () => {
      console.log("LOAD PROVIDER USE EFFFECT");
      const provider = await detectEthereumProvider();
 
      if (provider) {
        console.log("PROVIDER");
        const web3 = new Web3(provider);
        let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        // replace this part to web3.js when fix issue with correct convert string[] to bytes32[] in whitelistContains() smart contract func.
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        let ethersContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          ethersProvider.getSigner())
      ///

        setListener(provider);
        setWeb3api({
          provider,
          web3,
          contract,
          ethersContract,
          isLoading: false,
        hooks: setupHooks(web3, null, provider),
          requireInstall: false
        });
      } else {
        console.log("NOT____PROVIDER");
        setWeb3api(prev => ({
          ...prev,
          isLoading: false
        }));

        console.error("gotta be install metamask");
      }
    };
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    return {
      ...Web3api,
      connect: Web3api.provider
        ? async () => {
            try {
              await Web3api.provider.request({
                method: "eth_requestAccounts",
                params: []
              });
            } catch (e){
              console.error("cannot access to account");
              window.location.reload();
            }
          }
        : () => {
            console.error("Cannot connect to Metamask :(");
          },
      requireInstall: !Web3api.isLoading && !Web3api.web3
    };
  }, [Web3api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(cb) {
  const { hooks } = useWeb3();
  return cb(hooks);
}



