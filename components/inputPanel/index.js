import React, {useState} from "react";
import { Button } from "@components/layout";
import weiToEth from '../../utils/weiToETH';

export default function InputPanel({ onClick, price }) {

   const [count, setCount] = useState(1);
   const [totalPriceInEth, setTotalPriceInEth] = useState(0)

   function handleChange(e) {
         

    if(e.target.value.toString()[0] === "0" || e.target.value.length >=3 ) {
        return;
    } else {
        convertToETH(e.target.value)
        setCount(e.target.value);
    }
        

  
  }

  const changeBy = (str) => {
       if(str === "incr") {
        convertToETH(Number(count) + 1);
        setCount(Number(count) + 1);
       } else {
        if(count === 0) {
            return;
        } else {
            if(count === 1) {
                setCount(0);
                setTotalPriceInEth(0)

            } else {
                convertToETH(Number(count) - 1);
                setCount(count - 1);
            }
        
        }
       }
  }

  const convertToETH =  (itemsCount) => {
    const quantity = parseInt(itemsCount || 0);
    const cost = parseInt(price || 0);
    const priceInETH = weiToEth(quantity * cost);
    setTotalPriceInEth(priceInETH);
  }

  const countFinalPrice = () => {

    // const quantity = parseInt(count || 0);
    // const cost = parseInt(price || 0);
    // const priceInETH = weiToEth(quantity * cost);
    // setTotalPriceInEth(priceInETH);
    convertToETH(count);
    onClick(totalPriceInEth);
  }

  return (
    <div className="w-full">
      <div className="flex-row my-2  items-center ">

        <div className="flex justify-around items-center self-center">
            <div className="text-5xl mr-8 cursor-pointer text-blue-200" onClick={() => changeBy("decr")} >-</div>
            <div>
                <input type="number" value={count} placeholder="0" onChange={handleChange} className="py-2 pl-3 focus:border-pink-500 focus:outline-0 transition-all outline outline-0 border-b border-blue-200 bg-transparent text-blue-100"/>
            </div>

            <div className="text-5xl ml-8 cursor-pointer text-blue-200" onClick={() => changeBy("incr")}>+</div>
        </div>

        <div className="flex my-5 text-lg justify-around items-center">
            {/* <Test val={totalPriceInEth}/> */}
            <div>Total price: {totalPriceInEth} ETH </div>
            <Button onClick={() => countFinalPrice()} disabled={!count || Number(count) === false} className={"bg-indigo-500 hover:bg-indigo-600 border-none"} colorProps={"White"}> MINT</Button>
        </div>

      </div>
    </div>
  );
}


// const Test = ({val}) => {
//     return <div>Total price: {val} ETH </div>
// }