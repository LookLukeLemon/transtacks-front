import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";

import {
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
  TOKEN_STX,
  TOKEN_USDA,
} from "common/Constants";

export const DefaultStxPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: TOKEN_STX,
  decimals: 6,
  order: 0,
};

export const DefaultMiaV2Pair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: TOKEN_MIA_V2,
  decimals: 6,
  order: 1,
};

export const DefaultNycV2Pair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: TOKEN_NYC_V2,
  decimals: 6,
  order: 1,
};

export const DefaultUsdaPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: TOKEN_USDA,
  decimals: 6,
  order: 1,
};

export const getDefaultPair = (token) => {
  switch (token) {
    case TOKEN_STX:
      return DefaultStxPair;
    case TOKEN_MIA_V2:
      return DefaultMiaV2Pair;
    case TOKEN_NYC_V2:
      return DefaultNycV2Pair;
    case TOKEN_USDA:
      return DefaultUsdaPair;
    default:
      throw new Error("Not supported token");
  }
};

export type RecipientAndFTPair = {
  recipient: string;
  amount: string;
  token: string;
  decimals: number;
  order: number;
};

export type RecipientAndNFTPair = {
  recipient: string;
  tokenId: number;
  name: string;
  desc: string;
  nftAddress: string;
  nftContract: string;
  nftAssetName: string;
  image: string;
  order: number;
};

export type AddFungibleFn = () => void;
export type AddTenFungibleFn = () => void;
export type RemoveFungibleFn = (
  item: PrimitiveAtom<RecipientAndFTPair>
) => void;

export const selectedTokenAtom = atom(TOKEN_STX);
export const recipientAndFTPairsAtom = atom<
  PrimitiveAtom<RecipientAndFTPair>[]
>([]);

export const destructuredFTPairAtom = atom((get) => {
  const recipientAndFTPairs = get(recipientAndFTPairsAtom);
  return recipientAndFTPairs.map((atom) => get(atom));
});

export type AddAllNonFungibleFn = (items: RecipientAndNFTPair[]) => void;
export type RemoveNonFungibleFn = (
  item: PrimitiveAtom<RecipientAndNFTPair>
) => void;

export const recipientAndNFTPairsAtom = atom<
  PrimitiveAtom<RecipientAndNFTPair>[]
>([]);

export const destructuredNFTAtom = atom((get) => {
  const recipientAndNFTPairs = get(recipientAndNFTPairsAtom);
  return recipientAndNFTPairs.map((atom) => get(atom));
});

export const recipientAndNFTPairsCacheAtom = atom<
  PrimitiveAtom<RecipientAndNFTPair>[]
>([]);

export const destructuredNFTCacheAtom = atom((get) => {
  const recipientAndNFTPairsCache = get(recipientAndNFTPairsCacheAtom);
  return recipientAndNFTPairsCache.map((atom) => get(atom));
});

export const isModalOpenAtom = atom(false);
