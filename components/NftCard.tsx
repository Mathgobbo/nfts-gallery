import Image from "next/image";

export const NFTCard = ({ nft }: { nft: any }) => {
  const onCopyClick = () => {
    try {
      navigator.clipboard.writeText(nft.contract.address);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="rounded-md">
        <img className="object-cover w-full h-128 rounded-t-md" src={nft.media[0].gateway}></img>
      </div>
      <div className="flex flex-col px-2 py-3 y-gap-2 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600 break-all">Id: {nft.id.tokenId}</p>

          <button
            onClick={onCopyClick}
            title="Copy address"
            className="text-left text-gray-600 break-all hover:underline"
          >
            {nft.contract.address} <Image src={"/copy.png"} alt="Copy" className="ml-2" width={16} height={16} />
          </button>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>
    </div>
  );
};
