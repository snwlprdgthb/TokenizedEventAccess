import { useEffect, useState } from "react";
import Image from "next/image";
import { BaseLayout } from "@components/layout";
import { useWeb3 } from "@components/web3";
import { useAccount } from "@components/hooks/useAccount";
import  InputPanel  from "@components/inputPanel";
import  MMPanel  from "@components/MMPanel";
import weiToEth from '../../utils/weiToETH';
import ethToWei from '../../utils/ethToWei';
import {getProofForAddress} from "@utils/merkleHelper"
// import weiToEth from '../../utils/weiToETH';

const value = [
  "0x06d964C3BDe85Be3A7d9Ae20005180c25416C1Bf",
  "0xD69CBefA8f95d0CAE072eE61FB2C9f1b554A0269",
  "0x0600d0a43DFd2Be51aFD2D3618b5d04A0d2072BE",
  "0x95470297E85E59ED7cEBB7c17100Bc002974deF8"
]


export default function Mint({ items }) {
  
    const { web3, contract, ethersContract, isLoading, requireInstall } = useWeb3();
    // const { account, network, isDisabled, isConnecting } = useWalletInfo();
    const {account} = useAccount();

    let [tokenName, setTokenName] =  useState("");
    let [tokenSymbol, setTokenSymbol] =  useState("");
    let [tokenPrice, setTokenprice] =  useState("");
    let [maxMintAmountPerTx, setMaxMintAmountPerTx] =  useState("");
    let [mintWave, setMintWave] =  useState("");
    let [supply, setSupply] =  useState();
    let [maxSupply, setMaxSupply] = useState();
    let [merkleProof, setMerkleProof] = useState();
    let [whitelistContains, setWhitelistContains] = useState();
    let [claimed, setClaimed] = useState();

    let [paused, setPaused] =  useState(true);
    let [isWhitelistMintEnabled, setIsWhitelistMintEnabled] =  useState();

    

    useEffect(() => {

      const fetch = async () => {
        const res = await contract.methods.whitelistClaimed(account.account).call();
        console.log(res.toString());
        setClaimed(res);
      }

      if(account.account) {
        const proof = getProofForAddress(account.account, value);
        fetch();
        setMerkleProof(proof);
      }
    }, [account.account]);


    useEffect(()  => {

      const fetchInfo = async () => {



       





      if(merkleProof.length) {
        const res = await ethersContract.whitelistContains(merkleProof);
        setWhitelistContains(res);
      } else {
        setWhitelistContains(false);
      }
      }

      if(merkleProof && ethersContract) {
        fetchInfo();
      }
    }, [merkleProof, ethersContract])
    



    
     useEffect(() => {


      const fetchInfo = async () => {
        console.log("Mint useeffect")
        setTokenName(await contract.methods.name().call());
        setTokenSymbol(await contract.methods.symbol().call());
        setTokenprice(await contract.methods.cost().call());
        setMaxMintAmountPerTx(await contract.methods.maxMintAmountPerTx().call());
        setMintWave(await contract.methods.mintWave().call());
        setSupply(await contract.methods.totalSupply().call());
        setMaxSupply(await contract.methods.maxSupply().call())
        setPaused(await contract.methods.paused().call());
        setIsWhitelistMintEnabled(await contract.methods.whitelistMintEnabled().call());

                         
      }

      if(contract) {
        fetchInfo();
      }


     }, [contract])

   
    const handleMint = async (cost, count) => {

        try {

          if (count <= 0) {
            alert('Quantity must be greater than zero');
            return;
          }

          if (count >= maxMintAmountPerTx) {
            alert('Quantity must be greater than zero');
            return;
          }
          
          const allCost = cost * count;
          let priceInWei = ethToWei(allCost.toString());

          
          if (isWhitelistMintEnabled && paused) {
          const proof = getProofForAddress(account.account, value);
          await contract.methods.whitelistMint(count.toString(), proof).send({ from: account.account, value: priceInWei.toString() });
          } else {
          await contract.methods.mint(count.toString()).send({ from: account.account, value: priceInWei.toString() });
          }


        } catch (e) {
          console.log(e);        
        }
      

    }
 




    return (
      <div>
        <div>
          <div className="pt-20 z-10"></div>
          <div className=" z-30 flex justify-center w-screen  items-center">
            <div className="bg-black p-8 opacity-90 text-2xl text-white rounded-md flex flex-col items-center">
              {/* <div onClick={() => testContract()}>Test </div> */}

              <div className="flex-row">

              <div className="flex py-3 mb-3 border justify-center"> 
              <div className="flex-row">
                  <div className=" text-center">Wallet address:</div>
                  <div>{account.account}</div>
              </div>
              </div>

              <div className="flex border py-3"> 

                <div className="flex justify-center  w-1/2">
                  <div className="flex-row text-center">
                       <div>Supply</div>
                       <div>{`${supply}/${maxSupply}`}</div>
                  </div>
                </div>

                <div className="flex justify-center  w-1/2">
                  <div className="flex-row text-center">
                       <div>Sale status</div>
                       {isWhitelistMintEnabled ? <div className="text-green-500">Whitelist</div> : !paused ? <div className="text-green-500">Running</div> : <div className="text-red-500">Paused</div> }
                  </div>
                </div>

              </div>

              <div className="my-5 border flex justify-center">

                { supply === maxSupply ? <div>SOLD OUT</div> 
                    :
                      !paused ? 

            <div className="flex justify-center  items-center">
                      <div className="flex-row">
                        <div className="flex justify-center mt-6">
                            <Image
                              className="border-4 border-none rounded-xl"
                              width="400"
                              height="120"
                              alt="eth"
                              layout="fixed"
                              src="/pic.png"
                            />
                          </div>
                          <InputPanel price={tokenPrice} onClick={(value, count) => handleMint(value, count)}/>
                     </div>
              </div> 
                        :
                          !isWhitelistMintEnabled ? 

                          <div className="py-16 text-center">
                          <span className="">⏳</span>
                            <div>The sale is paused.</div>
                            <div>Please come back during the next wave!</div>
                         </div>

                            :
                              (merkleProof.length && whitelistContains) ? 
                                  (mintWave === claimed) ? 

                                   <div className="py-16 text-center">
                                  <span className="">⏳</span>
                                    <div>It looks like you has already minted on this whitelist wave.</div>
                                    <div>Please come back during the next one!</div>
                                 </div>
                                  
                                  : 


                                  <div className="flex justify-center  items-center">
                                          <div className="flex-row">
                                            <div className="flex justify-center mt-6">
                                                <Image
                                                  className="border-4 border-none rounded-xl"
                                                  width="400"
                                                  height="120"
                                                  alt="eth"
                                                  layout="fixed"
                                                  src="/pic.png"
                                                />
                                              </div>
                                              <InputPanel price={tokenPrice} onClick={(value, count) => handleMint(value, count)}/>
                                         </div>
                                  </div> 
                                  
                                :
                                 <div className="py-16 text-center">
                                  <span className="">⏳</span>
                                    <div>You are not included in the whitelist.</div>
                                    <div>Please come back during the next wave!</div>
                                 </div>
                                  
                
                }



                   {/* {() => {
                       console.log("FFFF");
                    if (supply === maxSupply) {
                      return <div>SOLD OUT</div>;
                  } else if (!paused) {
                      return <div>MINT CARD</div>;
                  } else if (isWhitelistMintEnabled) {
                      if (merkleProof.length && whitelistContains) {
                             console.log(merkleProof);
                          if (mintWave === claimed) {
                              return     <div>WhitelistMintedCard</div>;;
                          
                          } else {
                              return <div>MINT CARD</div>;
                          }


                          
                      } else {
                          return <div>NotWhitelistedCard</div>;
                         
                      }
                  } else {
                      return <div>PausedCard</div>;;
                  }
                   }} */}

                



              {/* {isWhitelistMintEnabled ? 
              <div className="text-green-500">

                <div>Check</div>


              </div> : !paused ? 



<div className="flex  border justify-center  items-center">

  <div className="flex-row">
    <div className="flex justify-center mt-6">
    <Image
  className="border-4 border-none rounded-xl"
          width="400"
          height="120"
          alt="eth"
          layout="fixed"
          src="/pic.png"
        />
    </div>

      <InputPanel price={tokenPrice} onClick={(value) => testContract(value)}/>
  </div>
            
  </div> 

                : <div className="text-red-500">Paused</div> } */}




                {/* {paused ? 
                  <div>paused</div> 
                        : 
                  <div>
                     <div>not  paused</div>
                     <div>ICOn</div>
                     <div>You are not included in the whitelist. Please come back during the next wave!</div>
                  </div>
                } */}
               
              </div>

              <div  className="my-5 border">

                <div className="flex py-4 border-b-2 border-gray-900">
                  <div className="w-1/2 pl-10">Token Name</div>
                  <div >{tokenName}</div>                 
                </div>

                <div className="flex py-4 border-b-2 border-gray-900">
                   <div className="w-1/2 pl-10">Token Symbol</div>
                   <div className="">{tokenSymbol}</div>
                </div>

                <div className="flex py-4 border-b-2 border-gray-900">
                   <div className="w-1/2 pl-10">Mint Wave</div>
                   <div>{mintWave.toString()}</div>
                </div>

                <div className="flex py-4 border-b-2 border-gray-900">
                   <div  className="w-1/2 pl-10">Wave Price</div>
                   <div>{weiToEth(tokenPrice.toString())} ETH</div>
                </div>

                <div  className="flex py-4">
                   <div className="w-1/2 pl-10">Max Amount per TX</div>
                   <div>{maxMintAmountPerTx.toString()}</div>
                </div>

              </div>


              <div  className="my-5 border flex-row">
                <MMPanel tokenName={tokenName} symbol={tokenSymbol}/> 
              </div>


              </div>

             
             
              {/* <div className="">Gotta be install</div>
              <div
                onClick={() => window.open("https://metamask.io/", "_blank")}
                className="cursor-pointer"
              >
                Metamask!
              </div> */}
    
            </div>
          </div>
        </div>

      </div>
    );
  }
  
  export function getStaticProps() {
    // const { data } = getAllItems();
    return {
      props: {
        items: "data"
      }
    };
  }
  
  Mint.Layout = BaseLayout;
  