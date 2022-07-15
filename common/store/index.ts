import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";

import {
  SUPPORT_TOKENS,
  TOKEN_ALEX,
  TOKEN_BANANA,
  TOKEN_DIKO,
  TOKEN_LDN,
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
  TOKEN_SLM,
  TOKEN_STX,
  TOKEN_USDA,
  TOKEN_WELSH,
} from "common/Constants";

export const DefaultStxPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_STX),
  decimals: 6,
  order: 0,
};

export const DefaultMiaV2Pair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_MIA_V2),
  decimals: 6,
  order: 1,
};

export const DefaultNycV2Pair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_NYC_V2),
  decimals: 6,
  order: 1,
};

export const DefaultUsdaPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_USDA),
  decimals: 6,
  order: 1,
};

export const DefaultBananaPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_BANANA),
  decimals: 6,
  order: 1,
};

export const DefaultAlexPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_ALEX),
  decimals: 8,
  order: 1,
};

export const DefaultDikoPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_DIKO),
  decimals: 6,
  order: 1,
};

export const DefaultSlmPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_SLM),
  decimals: 6,
  order: 1,
};

export const DefaultLydianPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_LDN),
  decimals: 6,
  order: 1,
};

export const DefaultWelshPair: RecipientAndFTPair = {
  recipient: "",
  amount: "",
  token: SUPPORT_TOKENS.find((t) => t.value === TOKEN_WELSH),
  decimals: 6,
  order: 1,
};

export const getDefaultPair = (token: SelectTokenType) => {
  switch (token.value) {
    case TOKEN_STX:
      return DefaultStxPair;
    case TOKEN_MIA_V2:
      return DefaultMiaV2Pair;
    case TOKEN_NYC_V2:
      return DefaultNycV2Pair;
    case TOKEN_USDA:
      return DefaultUsdaPair;
    case TOKEN_BANANA:
      return DefaultBananaPair;
    case TOKEN_ALEX:
      return DefaultAlexPair;
    case TOKEN_SLM:
      return DefaultSlmPair;
    case TOKEN_DIKO:
      return DefaultDikoPair;
    case TOKEN_LDN:
      return DefaultLydianPair;
    case TOKEN_WELSH:
      return DefaultWelshPair;
    default:
      throw new Error("Not supported token");
  }
};

export type RecipientAndFTPair = {
  recipient: string;
  amount: string;
  token: SelectTokenType;
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

export type SelectTokenType = {
  image: string;
  display: string;
  value: string;
};

export const selectedTokenAtom = atom<SelectTokenType>(SUPPORT_TOKENS[0]);
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
