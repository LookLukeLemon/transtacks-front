import React, { useEffect } from "react";
import AddNFTButton from "./AddNFTButton";
import MyNftCart from "./MyNftCart";
import MyNFTs from "./MyNFTs";
import { userAddressAtom } from "lib/auth";
import { useAtomValue, useSetAtom } from "jotai";
import {
  recipientAndNFTPairsAtom,
  recipientAndNFTPairsCacheAtom,
} from "common/store";

const NonFungibleTokenRegion = ({ onAddAll, onRemove }) => {
  const myAddress = useAtomValue(userAddressAtom);
  const setRecipientAndNFTPairs = useSetAtom(recipientAndNFTPairsAtom);
  const setRecipientAndNFTPairsCache = useSetAtom(
    recipientAndNFTPairsCacheAtom
  );

  useEffect(() => {
    if (myAddress) {
      setRecipientAndNFTPairs([]);
      setRecipientAndNFTPairsCache([]);
    }
  }, [myAddress]);

  return (
    <>
      <div className="card card-compact md:card-normal bg-base-100 shadow-xl h-fit">
        <div className="card-body gap-8">
          <h2 className="card-title">
            <span className="flex-1">NFT</span>
            <AddNFTButton />
          </h2>

          <MyNftCart onRemove={onRemove} />
        </div>
      </div>

      <MyNFTs onAddAll={onAddAll} />
    </>
  );
};

export default NonFungibleTokenRegion;
