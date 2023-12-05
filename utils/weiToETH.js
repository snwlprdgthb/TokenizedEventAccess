import {fromWei}  from 'web3-utils';


export default function weiToEth  (wei)  {
    const value = fromWei(wei.toString(), 'ether');
    return value;
};



