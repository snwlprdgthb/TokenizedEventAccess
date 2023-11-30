import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MdOutlineTravelExplore } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { IoMdPhotos } from "react-icons/io";

export default function SecondPanel  ()  {
  return (
    <section
      id="about"
      data-testid="about"
      className="flex flex-col justify-end 2xl:container"
    >
      <div className="min-h-[7rem]"></div>
      <div className="flex flex-col cont-height justify-center gap-y-20 sm:gap-y-28 lmd:px-10 2xl:px-4 box-border">
        <div className="flex flex-wrap justify-center gap-y-6 gap-x-6 ">
          <div className="flex flex-col gap-y-10 lmd:w-[45%] px-6 box-border">
            <div className="flex flex-col gap-y-6">
              <h2 className="text-3xl font-bold text-gray-100 md:text-4xl lg:text-5xl lmd:max-w-lg">
              Tokenized access using ERC721A
              </h2>
              <p className="lg:text-lg text-gray-200">
                ERC721A is an improved implementation of the ERC721 Non-Fungible Token Standard that supports minting multiple tokens for close to the cost of one.
                ERC721A enables a near constant gas cost for batch minting via a lazy-initialization mechanism.

              </p>
            </div>
            <div className="flex gap-x-4">
              <Link
                href="https://docs.openzeppelin.com/contracts/4.x/erc721"
                className="px-4 py-[0.6rem] lmd:py-3 lmd:px-6 bg-gray-700 text-gray-100 hover:bg-gray-800 transition-all duration-300"
              >
                ERC721
              </Link>
              <Link
                href="https://chiru-labs.github.io/ERC721A/#/erc721a"
                className="px-4 py-[0.6rem] lmd:py-3 lmd:px-6  bg-gray-700 text-gray-100 hover:bg-gray-800  transition-all duration-200"
              >
                ERC721A
              </Link>
            </div>
            {/* <div className="bg-gray-200 p-4">
              <p>
                Interested in Travel to be your travel companion on your special
                moment? Get in touch with our team at{" "}
                <a href="" className="text-emerald-800 underline">
                  tripteam@travel.com
                </a>
              </p>
            </div> */}
          </div>
          {/* image */}
          <div className="w-full lmd:w-[45%] px-6 box-border">
            <div className="bg-[url('/sc1.png')] h-[20rem] w-full bg-cover bg-center shadow-2xl lmd:h-3/4 lg:h-[100%] relative">
              <div className="absolute -bottom-4 -right-4 shadow-2xl border-8 border-gray-200">
                <Image src="/sc2.png" alt="" width={200} height={50} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-start lmd:px-10 xl:px-16 box-border">
          <div className="md:w-[80%] flex flex-col sm:flex-row gap-y-6 justify-between px-6 box-border">
            <div className="flex items-start gap-x-3">
              <MdOutlineTravelExplore size={30} />
              <div>
                <h3 className="text-3xl sm:text-[2rem] leading-8 font-bold text-gray-700 lmd:text-4xl">
                  1.4B
                </h3>
                <p>travellers/month</p>
              </div>
            </div>
            <div className="flex items-start gap-x-3">
              <SlPeople size={30} />
              <div>
                <h3 className="text-3xl sm:text-[2rem] leading-8 font-bold text-gray-700 lmd:text-4xl">
                  4.9M
                </h3>
                <p>honest reviews</p>
              </div>
            </div>
            <div className="flex items-start gap-x-3">
              <IoMdPhotos size={30} />
              <div>
                <h3 className="text-3xl sm:text-[2rem] leading-8 font-bold text-gray-700 lmd:text-4xl">
                  329.6k
                </h3>
                <p>photos</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
