import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDeploy } from "@simpleweb/open-format-react";
import { uploadToIPFS, buildMetadata } from "../helpers/ipfs";
import { ConnectButton, useWallet } from "@simpleweb/open-format-react";
import { useSetupRevenueSharing, useNFT } from "@simpleweb/open-format-react";

const Create = () => {
  const [open, setOpen] = useState(false);
  const { isConnected, wallet } = useWallet();
  const { deploy, isLoading } = useDeploy();
  const [contractAddress, setContractAddress] = useState();
  const nft = useNFT(contractAddress);
  const { setup } = useSetupRevenueSharing(nft);
  const revShareExtensionAddress = process.env.NEXT_PUBLIC_REVSHARE;
  const creatorAddress = wallet?.accounts[0].address;
  const collaboratorAddress = "0xf2041e383b8874b237B72740da07901A2FF9D2B6";
  const creatorShare = 4000; // 40%
  const collaboratorShare = 1000; // 10%
  const holderPercentage = 5000;

  const form = useForm();
  const { handleSubmit, register, control, formState } = form;
  const onSubmit = handleSubmit(async (data) => {
    if (!isConnected) {
      console.log("connect wallet");
      return;
    }

    console.log(data);
    const metadata = buildMetadata(data);
    console.log(metadata);
    const ipfs = await uploadToIPFS(metadata);
    console.log(ipfs);

    const contract = await deploy({
      maxSupply: data.totalSupply,
      mintingPrice: data.price,
      name: data.name,
      symbol: data.blockchainId,
      url: ipfs.url,
    });
    console.log(contract.contractAddress);

    setContractAddress(contract.contractAddress);

    // const tx = await setup({
    //   //should b await in docs
    //   revShareExtensionAddress,
    //   collaborators: [
    //     {
    //       address: creatorAddress,
    //       share: creatorShare,
    //     },
    //     {
    //       collaboratorAddress,
    //       collaboratorShare,
    //     },
    //   ],
    //   holderPercentage,
    // });
    // console.log(tx);
    //setOpen(true);
  });

  return (
    <>
      <div className="px-8 sm:px-6 lg:px-8 max-w-4xl py-8">
        <div className="relative bg-transparent rounded-sm px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div>
              <div className=" space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-white">
                    Fund your idea
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-sky-400">
                    Please upload as much as you can about your business
                  </p>
                </div>
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-rt sm:border-t sm:pt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                    >
                      Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        {...register("name")}
                        placeholder="Name of your business"
                        type="text"
                        name="name"
                        id="name"
                        className="max-w-lg block w-full shadow-sm focus:ring-neutral-400 focus:border-neutral-600 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-rt sm:border-t sm:pt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                    >
                      Your Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        {...register("artistName")}
                        placeholder="John Smith"
                        type="text"
                        name="artistName"
                        id="artistName"
                        className="max-w-lg block w-full shadow-sm focus:ring-neutral-400 focus:border-neutral-600 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-rt sm:border-t sm:pt-5">
                    <label
                      htmlFor="blockchain-id"
                      className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                    >
                      Blockchain ID
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        {...register("blockchainId")}
                        placeholder="e.g BIO"
                        type="text"
                        name="blockchainId"
                        id="blockchainId"
                        className="max-w-lg block w-full shadow-sm focus:ring-neutral-400 focus:border-neutral-600 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-rt sm:border-t sm:pt-5">
                    <label
                      htmlFor="sector"
                      className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                    >
                      Sector
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        {...register("sector")}
                        id="sector"
                        name="sector"
                        className="max-w-lg block focus:ring-neutral-400 focus:border-neutral-600 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="Arbois">Sport</option>
                        <option>Hospitality</option>
                        <option>Healthcare</option>
                        <option>Travel</option>
                        <option>Law</option>
                        <option>Consultancy</option>
                        <option>Human Resources</option>
                        <option>Accountancy</option>
                        <option>Technology</option>
                        <option>Retail</option>
                        <option>Insurance</option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-rt sm:border-t sm:pt-5">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                    >
                      Total Supply
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        {...register("totalSupply")}
                        defaultValue="1"
                        type="text"
                        name="totalSupply"
                        id="totalSupply"
                        className="max-w-lg block w-full shadow-sm focus:ring-neutral-400 focus:border-neutral-600 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-rt sm:border-t sm:pt-5">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                    >
                      Price (Matic)
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        {...register("price")}
                        defaultValue="0.001"
                        type="text"
                        name="region"
                        id="region"
                        className="max-w-lg block w-full shadow-sm focus:ring-neutral-400 focus:border-neutral-600 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start border-t sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  rows={6}
                  maxLength={500}
                  className="max-w-lg shadow-sm block w-full focus:ring-neutral-400 focus:border-neutral-600 sm:text-sm border border-gray-300 rounded-md"
                  placeholder=""
                />
                <p className="mt-2 text-sm text-white">
                  Max 500 charecters, if you are uploading an article please go{" "}
                  <Link href={"/contribute-audio"}>
                    <a className=" text-sky-400">here.</a>
                  </Link>
                </p>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start border-t sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
              >
                Image
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-white">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-transparent rounded-md font-medium text-sky-400 hover:text-sky-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          {...register("image")}
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start border-t sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
              >
                Contract
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-white">
                      <label
                        htmlFor="contract"
                        className="relative cursor-pointer bg-transparent rounded-md font-medium text-sky-400 hover:text-sky-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          {...register("contract")}
                          id="contract"
                          name="contract"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start border-t sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
              >
                Pitch Deck
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-white">
                      <label
                        htmlFor="deck"
                        className="relative cursor-pointer bg-transparent rounded-md font-medium text-sky-400 hover:text-sky-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          {...register("deck")}
                          id="deck"
                          name="deck"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white">PDF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5 pb-4">
              <div className="flex justify-end">
                <button
                  disabled={isLoading}
                  isLoading={isLoading}
                  className=" text-emerald-400 bg-black border-2 rounded-md px-4 py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
