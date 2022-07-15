import {
  LIMIT_FOR_FT,
  LIMIT_FOR_FT_MSG,
  LIMIT_FOR_IN_FT,
} from "common/Constants";
import {
  AddAllNonFungibleFn,
  AddFungibleFn,
  AddTenFungibleFn,
  destructuredFTPairAtom,
  destructuredNFTAtom,
  getDefaultPair,
  RecipientAndFTPair,
  recipientAndFTPairsAtom,
  RecipientAndNFTPair,
  recipientAndNFTPairsAtom,
  RemoveFungibleFn,
  RemoveNonFungibleFn,
  selectedTokenAtom,
} from "common/store";
import { atom, useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { toast } from "react-toastify";
import FungibleTokenRegion from "./fungible/FungibleTokenRegion";
import NonFungibleTokenRegion from "./non-fungible/NonFungibleTokenRegion";
import SendAction from "./SendAction";
import useContract from "./useContract";

const Orchestra = () => {
  const { handleSendAll } = useContract();
  const selectedToken = useAtomValue(selectedTokenAtom);
  const setRecipientAndFTPairs = useSetAtom(recipientAndFTPairsAtom);
  const setRecipientAndNFTPairs = useSetAtom(recipientAndNFTPairsAtom);
  const destructuredFTPair = useAtomValue(destructuredFTPairAtom);
  const destructuredNFT = useAtomValue(destructuredNFTAtom);

  const isAvailableFTLimit = (tokenToAdd) => {
    const tokenList = new Map();
    destructuredFTPair.map((p) => {
      const count = tokenList.get(p.token) ?? 0;
      tokenList.set(p.token, count + 1);
    });

    const tokenCount = tokenList.get(tokenToAdd);
    const isValidLimit = tokenList.size < LIMIT_FOR_FT;

    return tokenCount ? tokenCount < LIMIT_FOR_IN_FT : isValidLimit;
  };

  const handleAddFungible: AddFungibleFn = () => {
    if (!isAvailableFTLimit(selectedToken)) {
      toast.error(LIMIT_FOR_FT_MSG);
      return;
    }

    setRecipientAndFTPairs((prev) => [
      ...prev,
      atom<RecipientAndFTPair>(getDefaultPair(selectedToken)),
    ]);
  };

  const handleAddTenFungible: AddTenFungibleFn = () => {
    if (!isAvailableFTLimit(selectedToken)) {
      toast.error(LIMIT_FOR_FT_MSG);
      return;
    }

    setRecipientAndFTPairs((prev) => [
      ...prev,
      ...Array(10)
        .fill(null)
        .map(() => atom<RecipientAndFTPair>(getDefaultPair(selectedToken))),
    ]);
  };

  const handleAddAllNftFromCache: AddAllNonFungibleFn = (items) => {
    const filtered = items.filter((item) => {
      const { nftAddress, nftContract, nftAssetName, tokenId } = item;
      const itemKey = `${nftAddress}.${nftContract}::${nftAssetName}.${tokenId}`;

      const isExist = destructuredNFT.some((n) => {
        const { nftAddress, nftContract, nftAssetName, tokenId } = n;
        const key = `${nftAddress}.${nftContract}::${nftAssetName}.${tokenId}`;

        return key === itemKey;
      });

      return !isExist;
    });

    setRecipientAndNFTPairs((prev) => [
      ...prev,
      ...filtered.map((item) => {
        return atom<RecipientAndNFTPair>({ ...item });
      }),
    ]);
  };

  const handleRemoveFungible: RemoveFungibleFn = (recipientAndFTPair) =>
    setRecipientAndFTPairs((prev) =>
      prev.filter((item) => item !== recipientAndFTPair)
    );

  const handleRemoveNonFungible: RemoveNonFungibleFn = (recipientAndNFTPair) =>
    setRecipientAndNFTPairs((prev) =>
      prev.filter((item) => item !== recipientAndNFTPair)
    );

  return (
    <div className="gap-4 md:gap-8 flex flex-col">
      <form
        className="h-full flex flex-col gap-4 md:gap-8"
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleSendAll();
        }}
      >
        <div className="h-full flex-1 grid xl:grid-cols-3 gap-8">
          <FungibleTokenRegion
            onAdd={handleAddFungible}
            onAddTen={handleAddTenFungible}
            onRemove={handleRemoveFungible}
            isAvailableFTLimit={isAvailableFTLimit}
          />
          <NonFungibleTokenRegion
            onAddAll={handleAddAllNftFromCache}
            onRemove={handleRemoveNonFungible}
          />
        </div>
        <SendAction />
      </form>
    </div>
  );
};

export default Orchestra;
