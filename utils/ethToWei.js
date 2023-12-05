import {toWei}  from 'web3-utils';


export default function ethToWei  (ether)  {
    const value = toWei(ether, "ether");
    return value;
};


