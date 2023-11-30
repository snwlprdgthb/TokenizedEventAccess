import Image from "next/image";
import { useWeb3 } from "@components/web3";
import { Button } from "@components/layout";
import { TOKEN_TYPE, CONTRACT_ADDRESS, TOKEN_DECIMALS, TOKEN_ICON } from '../../utils/contractInfo';


export default function MMPanel({ customStyle, tokenName, symbol }) {

    const { provider } = useWeb3();


const addToken =  async  () => {

        try {

            console.log(TOKEN_TYPE);
            console.log(symbol);
            console.log(TOKEN_DECIMALS);
            console.log(TOKEN_ICON);
            console.log(CONTRACT_ADDRESS);


            const wasAdded = await provider.request({
                method: 'wallet_watchAsset',
                params: {
                    type: TOKEN_TYPE,
                    options: {
                        address: CONTRACT_ADDRESS,
                        symbol: symbol,
                        decimals: TOKEN_DECIMALS,
                        image: TOKEN_ICON
                    },
                },
            });
            // if (!wasAdded) {
            //     this.alertService.notify('Token import failed');
            // }
        } catch (e) {
            const { message = 'It looks like token impoty failed with exception. More info in debug console' } = e;
            // this.alertService.notify(message);
            console.warn('It looks like token import failed with exception', e);
        }


}

  return (
<div className="flex-row py-6 pl-10">

    <div className={`${customStyle ? customStyle : ""} flex items-center`}>
      <span className="text-white  font-abeezee pr-2">
        Easier to interact with
      </span>
      <div className="">
        <Image width="40" height="40" layout="intrinsic" src="/metamask.svg" />
      </div>
    </div>

    <div className="font-abeezee py-2">Import Token to MetaMask</div>
    <div className="text-lg font-abeezee pt-2 pb-4 pr-32">When a user opens their MetaMask, they are shown a variety of assets, including tokens. You can import {tokenName} token by clicking a label.</div>
    <Button onClick={addToken} className={"bg-indigo-500 hover:bg-indigo-600 border-none"} colorProps={"White"}>Import token</Button>
   
</div>
  );
}

{
  /* <div className="flex justify-end items-center pr-5 lg:pr-8 xl:pr-16 "></div> */
}
