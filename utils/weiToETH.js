import {fromWei}  from 'web3-utils';


export const weiToEth = (wei) => {
    const value = fromWei(wei.toString(), 'ether');
    return value;
};

export default weiToEth;
