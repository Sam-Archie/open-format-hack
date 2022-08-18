import { File, NFTStorage } from "nft.storage";

if (typeof process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN !== "string")
  throw new Error("Please set the NEXT_PUBLIC_CHAIN_ID environment variable.");

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
});

export const uploadToIPFS = async (data) => {
  if (!data) throw Error("Data is invalid");
  return await client.store(data);
};

/**
 * The function builds up a metadata object in a format accepted
 * by the uploadToIPFS function above.
 * Name, description and Image are REQUIRED
 * You can add any metadata you want here. Each file will be uploaded
 * with it's own IPFS CID linking back to the generated metadata.json.
 */

export const buildMetadata = async (data) => {
  const { name, description, blockchain } = data;

  // generate a random factory ID
  const FACTORY_ID = process.env.NEXT_PUBLIC_FACTORY_ID;
  // throw error if factory ID is not set or invalid;
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
