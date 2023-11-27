import { useEffect } from "react";
import useSWR from "swr";

const adminAddress = {
  "0xc223791619d574d3bd9e55ebc70c2925c8ca9fe93d434b6fecdf78f3cb74e7ba": true
};

export const handler = (web3, provider) => () => {
  const isAdminByENV = adminAddress["0xc223791619d574d3bd9e55ebc70c2925c8ca9fe93d434b6fecdf78f3cb74e7ba"];

  const { data, error, mutate, ...rest } = useSWR(
    web3 ? "web3/useAcccount" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();

      const account = accounts[0];
      if (!account) {
        throw new Error("doesn't exist any accounts");
      }
      return account;
    }
  );

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    account: {
      account: data,
      hasInitialResponse: !!(data || error),
      isAdmin:
        (data && adminAddress[web3.utils.keccak256(data)] && isAdminByENV) ??
        false,
      mutate,
      ...rest
    }
  };
};
