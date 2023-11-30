import Link from "next/link";
import { useWeb3 } from "@components/web3";
import { Button } from "@components/layout";
import { useAccount } from "@components/hooks/useAccount";

// function isMobileDevice() {
//   return "ontouchstart" in window || "onmsgesturechange" in window;
// }

export default function Header() {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
// const account = {
//     isAdmin: false
// }

// const isLoading = false;
// const requireInstall = false;

//   const dappUrl = "polyhedron-ethmarket-lmt6c3lnn-kostyaposlushnoi.vercel.app/";
//   const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;

  return (
    <>
      <section className="font-abeezee  z-50  flex py-5  fixed w-full">
        <div className="relative w-full px-2 sm:px-4 md:px-12">
          <nav className="relative">
            <div className="flex justify-between items-center">
              <div className="flex flex-col xs:flex-row">
                <div>
                  <Link href="/mint">
                    <div className="mr-3 uppercase sm:normal-case font-medium sm:mr-8 textHoverZinc">
                      Mint
                    </div>
                  </Link>
                </div>
             

                {account.isAdmin && (
                   <div>
                   <Link href="/manage">
                     <div className="mr-3 uppercase sm:mr-8 sm:normal-case text-green-400 textHoverZinc">
                       Manage
                     </div>
                   </Link>
                 </div>
                )}
                
              </div>
              <div className="flex items-center">
                {account.isAdmin && (
                  <div className="py-2 px-3 rounded-xl text-md mr-2 bg-green-600">
                    ADMIN
                  </div>
                )}
                {isLoading ? (
                  <Button disabled={true} onClick={connect}>
                    Loading
                  </Button>
                ) : !requireInstall ? (
                  account.account ? (
                    <Button disabled={true} colorProps={"connected"}>
                      Connected
                    </Button>
                  ) : (
                    <Button 
                    onClick={connect}
                    >Connect</Button>
                  )
                ) : (
                  <Button
                    onClick={() => {
                      // if (isMobileDevice()) {
                      //   window.open(metamaskAppDeepLink);
                      // } else {
                      //   window.open("https://metamask.io/", "_blank");
                      // }
                    }}
                  >
                    Install metamask
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </div>
        <div className="blackGradient h-9/6" />
      </section>
    </>
  );
}
