import { NFTStorage } from "nft.storage";

if (typeof process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN !== "string")
  throw new Error("Please set the NEXT_PUBLIC_CHAIN_ID environment variable.");

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
});

export const uploadToIPFS = async (data) => {
  if (!data) throw Error("Data is invalid");
  return await client.store(data);
};

export const buildMetadata = async (data) => {
  const { name, description, blockchain } = data;

  const FACTORY_ID = process.env.NEXT_PUBLIC_FACTORY_ID;
  if (!FACTORY_ID || typeof FACTORY_ID !== "string") {
    throw Error(
      "Invalid Factory ID: Check NEXT_PUBLIC_FACTORY_ID in your .env.local"
    );
  }

  const metadata = {
    name,
    description,
    blockchain,
    release_type: "investment",
    factory_id: FACTORY_ID,
  };

  return metadata;
};
