import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";


const getMerkleTree = (arrayOfAddress) => {
    console.log(arrayOfAddress);
    const leafNodes = arrayOfAddress.map(address => keccak256(address));
    return new MerkleTree(leafNodes, keccak256, { sortPairs: true });
}


export const getRootMerkle = (arrayOfAddress) => {

    if (arrayOfAddress.length < 2) {
        throw new Error('WhiteList must contain two and more addresses')
      }
      return getMerkleTree(arrayOfAddress).getHexRoot();

};

export const checkAddressMerkle = (address) => {
    const merkleProof = getMerkleTree().getHexProof(keccak256(address));

    if (!merkleProof.length) {
        return 'The given address is not in the whitelist, please double-check.';
    }

    return 'Congrats! This address is whitelisted. Your Merkle Proof has been copied to the clipboard'

}

export const getRawProofForAddress = (address, arrayOfAddress) => {
       const res = getMerkleTree(arrayOfAddress).getHexProof(keccak256(address));
       return res.toString().replaceAll('\'', '').replaceAll(' ', '');
}




export const getProofForAddress = (address, arrayOfAddress) => {
    const res =  getMerkleTree(arrayOfAddress).getHexProof(keccak256(address.toString()));
    return res;
  };



