import { useRawRequest } from "@simpleweb/open-format-react";
import { gql } from "graphql-request";
import { useState } from "react";
import Modal from "../components/modal";
import { getProperty } from "../helpers/getProperty";
import transformURL from "../helpers/transformUrl";

const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
};

export default function Home() {
  const getTokenDataQuery = gql`
    query ($tokenId: String!) {
      token(id: $tokenId) {
        id
        properties {
          key
          value
        }
        saleData {
          salePrice
          totalSold
          maxSupply
        }
        creator {
          id
        }
      }
    }
  `;

  const [open, setOpen] = useState(false);

  const { data: nftData } = useRawRequest({
    query: getTokenDataQuery,
    variables: { tokenId: "0x5d2c8858ec2b20d37ba7ff2654c985fc93fc81f8" },
    config: {
      refetchInterval: (nftData) =>
        !nftData?.token || nftData?.progress < 100 ? 500 : false,
    },
  });

  const properties = nftData?.token?.properties;
  const image = transformURL(getProperty("image", properties));
  const description = getProperty("description", properties);
  const title = getProperty("name", properties);
  const artist = getProperty("artist", properties);
  const releaseType = getProperty("release_type", properties);
  const blockchain = getProperty("blockchain", properties);

  const handleBuy = () => {
    setOpen(true);
  };
  const handleDeposit = () => {
    setOpen(true);
  };
  const handleWithdraw = () => {
    setOpen(true);
  };

  const handleView = () => {
    setOpen(true);
  };

  console.log(nftData);

  return (
    <>
      <div className="mx-auto pt-14 pb-24 px-4 sm:pt-16 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:row-end-1 lg:col-span-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
              <img src={image} className="object-center object-cover" />
            </div>
          </div>
          {/* NFT details */}
          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:tracking-tight sm:text-3xl">
                  {title}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  NFT Info
                </h2>
              </div>
            </div>

            <p className="text-white mt-6">{description}.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                onClick={handleBuy}
                type="button"
                className="w-full  bg-black border-2 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-emerald-400 hover:bg-zinc-800 focus:-2ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Buy
              </button>
              <button
                onClick={handleDeposit}
                type="button"
                className="w-full bg-black border-2 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-emerald-400 hover:bg-zinc-800 focus:-2ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Deposit
              </button>
              <button
                onClick={handleWithdraw}
                type="button"
                className="w-full bg-black border-2 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-emerald-400 hover:bg-zinc-800 focus:-2ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Withdraw
              </button>
              <button
                onClick={handleView}
                type="button"
                className="w-full bg-black border-2 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-emerald-400 hover:bg-zinc-800 focus:-2ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                View Deck
              </button>
            </div>

            <div className="border-t border-cyan-400 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-100">Highlights</h3>
              <div className="mt-4 prose prose-sm text-white">
                <ul role="list">
                  <li>{releaseType}</li>
                  <li>{artist}</li>
                  <li>{blockchain}</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-cyan-400 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-100">License</h3>
              <p className="mt-4 text-sm text-white">
                {license.summary}{" "}
                <a
                  href={license.href}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Read full terms and conditions
                </a>
              </p>
            </div>

            <div className="border-t border-cyan-400 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-100">Share</h3>
              <ul role="list" className="flex items-center space-x-6 mt-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-white"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-white"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Modal {...{ open, setOpen }} />
        </div>
      </div>
    </>
  );
}
