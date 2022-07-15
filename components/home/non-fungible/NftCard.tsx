import { destructuredNFTCacheAtom } from "common/store";
import BaseImage from "components/common/BaseImage";
import { useAtomValue } from "jotai";
import React from "react";
import { classNames } from "utils";

const NftCard = ({ item, onAdd }) => {
  const destructuredNFTCache = useAtomValue(destructuredNFTCacheAtom);
  const { imageSmall, name, desc, recordIndex, nftCollection } = item;
  const { deployer, contract, assetIdentifier } = nftCollection;

  const itemKey = `${deployer}.${contract}::${assetIdentifier}.${recordIndex}`;
  const isSelected = destructuredNFTCache.some((c) => {
    const { nftAddress, nftContract, nftAssetName, tokenId } = c;
    const key = `${nftAddress}.${nftContract}::${nftAssetName}.${tokenId}`;
    return key === itemKey;
  });

  return (
    <div
      className={classNames(
        "card card-compact hover:cursor-pointer bg-base-100 ring-1 ring-base-300",
        isSelected && "ring-warning hover:ring-warning"
      )}
      onClick={() => {
        onAdd({ ...item });
      }}
    >
      <figure className="aspect-square relative m-3 rounded-xl bg-base-200 overflow-hidden">
        <BaseImage src={imageSmall} alt="" layout="fill" objectFit="cover" />
        {isSelected && (
          <div className="absolute top-3 right-3 text-warning bg-base-100 overflow-hidden rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </figure>

      <div className="card-body !p-4 !pt-0 gap-0">
        <h2 className="card-title text-sm flex justify-between">
          <span className="truncate">{name}</span>
          <div className="badge badge-warning">#{recordIndex}</div>
        </h2>
        <p className="truncate text-xs">{desc}</p>
      </div>
    </div>
  );
};

export default NftCard;
