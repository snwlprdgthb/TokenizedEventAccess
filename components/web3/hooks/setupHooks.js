import { handler as createUseAccount } from "./useAccount";
// import { handler as createUseNetwork } from "./useNetwork";
// import { handler as createUseOwnedItems } from "./useOwnedItems";
// import { handler as createUseOwnedItem } from "./useOwnedItem";
// import { handler as createUseItems } from "./useItems";

export const setupHooks = (web3, contract, provider) => {
  return {
    useAccount: createUseAccount(web3, provider),
    // useNetwork: createUseNetwork(web3),
    // useOwnedItems: createUseOwnedItems(web3, contract),
    // useOwnedItem: createUseOwnedItem(web3, contract),
    // useItems: createUseItems(web3, contract)
  };
};
