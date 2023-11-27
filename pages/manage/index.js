import { useEffect, useState } from "react";
import { BaseLayout } from "@components/layout";
import { useWeb3 } from "@components/web3";
import { Button } from "@components/layout";
import { useAccount } from "@components/hooks/useAccount";
import useOwner from "@components/hooks/useOwner";
import Router from "next/router";



export default function Manage({ items }) {

    let [pausedVeiw, setPausedView] =  useState(true);
    let [isWhitelistMintEnabledView, setIsWhitelistMintEnabledView] =  useState(false);
  
    const { web3, contract, isLoading, requireInstall } = useWeb3();
    // const { account, network, isDisabled, isConnecting } = useWalletInfo();

    const { account, shouldRedirect, redirectPath } = useOwner({
        redirectTo: "/"
      });


      

      useEffect(() => {
        
        if (shouldRedirect && account.account) {
            console.log(`shouldRedirect: ${shouldRedirect}`);
            console.log(`account.account: ${account.account}`);
          redirect();
        }
      }, [shouldRedirect, account.account]);
    

      useEffect(() => {

        const fetchInfo = async () => {
          console.log("Mint useeffect")

        //   setMintWave(await contract.methods.mintWave().call());
        //   setSupply(await contract.methods.totalSupply().call());
          setPausedView(await contract.methods.paused().call());
          setIsWhitelistMintEnabledView(await contract.methods.whitelistMintEnabled().call());
          
        }
  
        if(contract) {
          fetchInfo();
        }
  
  
       }, [contract])


      if (requireInstall) {
        console.log(`requireInstall: ${requireInstall}`);
        redirect();
      }

      const redirect = () => {
        alert();
        Router.push(redirectPath);
      };

  
      const setPaused = async (bool) => {
        try {
            if(bool) {
                await contract.methods.setPaused(true).send({from: account.account});
            } else {
                await contract.methods.setPaused(false).send({from: account.account});
            }
        } catch (e) {
            console.log(e);
        }
        
      }

      const setWhitelistMintEnabled = async (bool) => {
        try {
            if(bool) {
                await contract.methods.setWhitelistMintEnabled(true).send({from: account.account});
            } else {
                await contract.methods.setWhitelistMintEnabled(false).send({from: account.account});
            }
        } catch(e) {
            console.log(e);
        }
      }


    return (
      <div>
        {!shouldRedirect ?  
        <div>
        <div className="fixed z-10"></div>
        <div className="fixed z-30 flex justify-center w-screen h-screen items-center">
        <div className="bg-black p-8 w-full opacity-90 text-2xl text-white rounded-md flex flex-col items-center">
            <div>Admin Panel</div>
            <div className="text-sm">As owner you can manage whitelist, pause and other iteraction with ERC721A smart contract via blockchain.</div>

            <div className="w-full flex flex-col  mt-5  items-center">
                <div className="">
                <div className="flex   justify-around">
                    <Button  onClick={() => setPaused(false)} disabled={!pausedVeiw} className="py-2 px-3 rounded-xl border-none text-md  bg-green-600 hover:bg-green-400" colorProps={"white"}>Running</Button>
                    <Button  onClick={() => setPaused(true)}  disabled={pausedVeiw} className="py-2 px-3 rounded-xl border-none text-md  bg-red-600 hover:bg-red-400" colorProps={"white"}>Paused</Button>
                </div>
                
          
            <Button  onClick={() => setWhitelistMintEnabled(true)} className="py-2 w-full px-3 my-2 border-none rounded-xl text-md  bg-green-600 hover:bg-green-400" colorProps={"white"}>Whitelist Mint Enabled</Button>
            <Button  onClick={() => setWhitelistMintEnabled(false)} className="py-2 px-3 w-full border-none rounded-xl text-md  bg-red-600 hover:bg-red-400" colorProps={"white"}>Whitelist Mint Disabled</Button>
          
                    
                </div>
            </div>

            <div>
                <div className="text-lg mt-5">Current state:</div>
                <div className="flex">
                    <div className="mr-4">Sale status:</div>
                    {isWhitelistMintEnabledView ? <div className="text-green-500">Whitelist</div> : !pausedVeiw ? <div className="text-green-500">Running</div> : <div className="text-red-500">Paused</div> }
                </div>
                
            </div>


        </div>
        </div>
      </div> : ""}
        

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
  
  Manage.Layout = BaseLayout;
  