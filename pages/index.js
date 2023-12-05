
import Link from "next/link";
import Hero from "@components/hero"
import Desc from "@components/description"
import SecondPanel from "@components/secondPanel"
import Slides from "@components/slides"
import Func from "@components/func"
import { BaseLayout } from "@components/layout";


export default function Home({ items }) {
  return (
    <>
        {/* <Link href="/mint">
         <div className="relative overflow-hidden  text-white">
        tttttdsf

    </div>
    </Link> */}

<main
      id="home"
      data-testid="homepage"
      className={`min-h-screen bg-[url('/main.jpg')] bg-cover bg-no-repeat`}
    >
      <div className="w-full h-screen relative">
        <Hero />
        <Desc />
        <SecondPanel />
        <Slides />
        <Func />
      </div>
    </main>


      </>

    
   
  );
}



Home.Layout = BaseLayout;
