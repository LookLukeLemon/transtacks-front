export const ENV_TESTNET = "testnet";
export const ENV_MAINNET = "mainnet";

export const TOKEN_STX = "stx";
export const TOKEN_MIA_V2 = "mia-v2";
export const TOKEN_NYC_V2 = "nyc-v2";
export const TOKEN_STX_DISPLAY = "STX";
export const TOKEN_MIA_V2_DISPLAY = "MIA";
export const TOKEN_NYC_V2_DISPLAY = "NYC";

export const MULTI_SEND_DEPLOYER_TESTNET =
  "ST376VXPZGBQC6W0B8XEKG6E6FZNN0PR0W4SKYKT7";
export const MULTI_SEND_CONTRACT_TESTNET = "transtacks-dope";
export const MULTI_SEND_DEPLOYER_MAINNET =
  "SP376VXPZGBQC6W0B8XEKG6E6FZNN0PR0W7H6DWRH";
export const MULTI_SEND_CONTRACT_MAINNET = "transtacks-dope";

export const MULTI_SEND_STX = "transfer-stx-many";
export const MULTI_SEND_FT = "transfer-ft-many";
export const MULTI_SEND_MIX = "transfer-mix-many";

export const MIA_V2_ADDRESS = "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R";
export const MIA_V2_CONTRACT = "miamicoin-token-v2";
export const MIA_V2_ASSETNAME = "miamicoin";
export const NYC_V2_ADDRESS = "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11";
export const NYC_V2_CONTRACT = "newyorkcitycoin-token-v2";
export const NYC_V2_ASSETNAME = "newyorkcitycoin";

export const SUPPORT_FUNGIBLE_TOKENS = [TOKEN_MIA_V2, TOKEN_NYC_V2];
export const SUPPORT_TOKENS = [
  { value: TOKEN_STX, display: TOKEN_STX_DISPLAY },
  { value: TOKEN_MIA_V2, display: TOKEN_MIA_V2_DISPLAY },
  { value: TOKEN_NYC_V2, display: TOKEN_NYC_V2_DISPLAY },
];
export const LIMIT_FOR_FT = 10;
export const LIMIT_FOR_IN_FT = 400;
export const LIMIT_FOR_FT_MSG =
  "The number of fungible tokens that can be sent at one time is limited to 10, and each can be sent to 400 recipients.";
export const LIMIT_FOR_NFT = 20;
export const LITMIT_FOR_NFT_MSG =
  "The number of nfts that can be sent at one time is limited to 20.";
export const QUERY_KEY_COLLECTED = "collected";
export const ACCOUNT_COLLECTED_EMPTY = "There are no NFTs found owened by you.";
export const ACCOUNT_COLLECTED_INSTRUCTION =
  "If this is your first visit, log in to Infinity Square once to see the NFTs you own.";
export const ACCOUNT_COLLECTED_PER_PAGE = 12;
