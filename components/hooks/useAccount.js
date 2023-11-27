import { useHooks } from "@components/web3";

export const useAccount = () => {
  return useHooks(hooks => hooks.useAccount)();
};
