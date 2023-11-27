import { useAccount } from "./useAccount";
import { useWeb3 } from "@components/web3";

export default function useOwner({ redirectTo }) {
  const { account } = useAccount();
  const { requireInstall } = useWeb3();
  let shouldRedirect = false;

  if (requireInstall || !account.isAdmin) {
    shouldRedirect = true;
  }

  return { account, shouldRedirect, redirectPath: redirectTo };
}
