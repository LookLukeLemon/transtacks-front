import { ACCOUNT_COLLECTED_PER_PAGE } from "common/Constants";
import MoreNftCardsLoader from "components/loader/MoreNftCardsLoader";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteCollected from "hooks/useInfiniteCollected";
import NftCard from "./NftCard";
import { atom, useAtomValue, useSetAtom } from "jotai";
import {
  destructuredNFTCacheAtom,
  RecipientAndNFTPair,
  recipientAndNFTPairsCacheAtom,
} from "common/store";
import BaseImage from "components/common/BaseImage";
import LogoImage from "public/images/Infinity.svg";

const NftCardList = ({ address }) => {
  const setRecipientAndNFTPairsCache = useSetAtom(
    recipientAndNFTPairsCacheAtom
  );
  const destructuredNFTCache = useAtomValue(destructuredNFTCacheAtom);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
    isError,
  } = useInfiniteCollected(address, null, ACCOUNT_COLLECTED_PER_PAGE);
  const flatList = data?.pages.flatMap((d) => d.items);
  const dataLength = flatList?.length || 0;

  const handleAddNftToCache = (item) => {
    const cache: RecipientAndNFTPair = {
      recipient: "",
      tokenId: item.recordIndex,
      name: item.name,
      desc: item.desc,
      nftAddress: item.deployer,
      nftContract: item.contract,
      nftAssetName: item.nftCollection.assetIdentifier,
      image: item.imageSmall,
      order: 2,
    };

    const cacheKey = `${cache.nftAddress}.${cache.nftContract}::${cache.nftAssetName}.${cache.tokenId}`;
    const existItem = destructuredNFTCache.find((c) => {
      const { nftAddress, nftContract, nftAssetName, tokenId } = c;
      const key = `${nftAddress}.${nftContract}::${nftAssetName}.${tokenId}`;
      return key === cacheKey;
    });

    if (!existItem) {
      setRecipientAndNFTPairsCache((prev) => {
        return [...prev, atom(cache)];
      });
    } else {
      const filtered = destructuredNFTCache.filter((c) => c !== existItem);
      setRecipientAndNFTPairsCache([
        ...filtered.map((f) => atom<RecipientAndNFTPair>(f)),
      ]);
    }
  };

  return (
    <div
      id="scrollableDiv"
      className="modal-content-wrapper"
      style={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 className="text-xl font-semibold p-4 pb-8">My NFTs</h2>
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.4}
        dataLength={dataLength}
        next={() => fetchNextPage()}
        hasMore={hasNextPage || (dataLength === 0 && isLoading)}
        loader={<MoreNftCardsLoader count={ACCOUNT_COLLECTED_PER_PAGE} />}
      >
        <div className="p-1">
          {dataLength === 0 ? (
            <div className="flex items-center justify-center py-10">
              <div className="min-w-[340px]  text-center gap-8 grid">
                <a
                  className="flex items-center justify-center"
                  href={`https://infinitysquare.io`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative h-6 w-12 md:h-12 md:w-24">
                    <BaseImage
                      src={LogoImage}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <h1 className="self-center whitespace-nowrap text-2xl font-semibold">
                    Infinity
                    <span className="text-[#3A8FF5]">Square</span>
                  </h1>
                </a>

                <p>
                  If this is your first visit, log in to{" "}
                  <a
                    href={`https://infinitysquare.io`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold"
                  >
                    Infinity<span className=" text-[#3A8FF5]">Square</span>
                  </a>
                  <br />
                  at least once to extract the NFTs you own.
                  <br />
                  It may take a few minutes.
                </p>
              </div>
            </div>
          ) : (
            <div className="nft-items-grid-container">
              {flatList?.map((item) => (
                <NftCard
                  key={item.itemId}
                  item={item}
                  onAdd={handleAddNftToCache}
                />
              ))}
            </div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default NftCardList;
