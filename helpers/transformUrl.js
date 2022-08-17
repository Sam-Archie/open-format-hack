export const transformURL = (url) => {
  if (!url) return;
  return url?.replace("ipfs://", process.env.NEXT_PUBLIC_IPFS);
};

export default transformURL;
