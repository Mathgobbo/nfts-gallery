import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { NFTCard } from "../components/NftCard";

const apiKey = "s0VTPm7zBsLzsEivRzhF2UasWWDZiEyS";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}`;

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  const fetchNFTs = async () => {
    let nfts;
    let fetchURL;
    if (!collectionAddress.length) fetchURL = `${baseURL}/getNFTs/?owner=${walletAddress}`;
    else fetchURL = `${baseURL}/getNFTs/?owner=${walletAddress}&contractAddresses[]=${collectionAddress}`;
    let nftsResponse = await fetch(fetchURL, { method: "GET" });
    nfts = await nftsResponse.json();
    setNFTs(nfts.ownedNfts);
  };

  const fetchNFTsForCollection = async () => {
    if (collectionAddress.length) {
      const fetchURL = `${baseURL}/getNFTsForCollection?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
      const nftsResponse = await fetch(fetchURL, { method: "GET" });
      const nfts = await nftsResponse.json();
      setNFTs(nfts.nfts);
    }
  };

  return (
    <>
      <Head>
        <title>NFT Gallery | Query NFT's</title>
      </Head>
      <div className="flex flex-col items-center justify-center py-8 gap-y-3">
        <div className="flex flex-col items-center justify-center w-full gap-y-2">
          <h1 className="text-xl font-bold">Search for NFT's</h1>
          <input
            disabled={fetchForCollection}
            onChange={(e) => setWalletAddress(e.target.value)}
            value={walletAddress}
            type={"text"}
            placeholder="Add your wallet address"
            className="p-2 border rounded-md lg:w-1/2 border-slate-300"
          ></input>
          <input
            onChange={(e) => setCollectionAddress(e.target.value)}
            value={collectionAddress}
            type={"text"}
            placeholder="Add the collection address"
            className="p-2 border rounded-md lg:w-1/2 border-slate-300"
          ></input>
          <label className="text-gray-600 ">
            <input
              onChange={(e) => {
                setFetchForCollection(e.target.checked);
              }}
              type={"checkbox"}
              className="mr-2"
            ></input>
            Fetch for collection
          </label>
          <button
            className={"disabled:bg-slate-500 w-1/2 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm"}
            onClick={() => {
              if (fetchForCollection) {
                fetchNFTsForCollection();
              } else fetchNFTs();
            }}
          >
            Let's go!{" "}
          </button>
        </div>
        <div className="grid w-3/4 grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-2">
          {!!NFTs?.length &&
            NFTs.filter((nft: any) => !nft?.error).map((nft) => {
              return <NFTCard nft={nft} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
