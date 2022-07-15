import StxLogo from "public/images/stx.svg";
import MiaLogo from "public/images/mia.svg";
import NycLogo from "public/images/nyc.svg";
import UsdaLogo from "public/images/usda.svg";
import BananaLogo from "public/images/banana.svg";
import AlexLogo from "public/images/alex.svg";
import DikoLogo from "public/images/diko.svg";
import LydianLogo from "public/images/lydian.svg";
import SlmLogo from "public/images/slime.png";
import WelshLogo from "public/images/welsh.png";
import { SelectTokenType } from "./store";

export const ENV_TESTNET = "testnet";
export const ENV_MAINNET = "mainnet";

export const TOKEN_STX = "stx";
export const TOKEN_MIA_V2 = "mia-v2";
export const TOKEN_NYC_V2 = "nyc-v2";
export const TOKEN_USDA = "usda";
export const TOKEN_BANANA = "ban";
export const TOKEN_ALEX = "alex";
export const TOKEN_SLM = "slm";
export const TOKEN_DIKO = "diko";
export const TOKEN_LDN = "ldn";
export const TOKEN_WELSH = "welsh";

export const TOKEN_STX_DISPLAY = "STX";
export const TOKEN_MIA_V2_DISPLAY = "MIA";
export const TOKEN_NYC_V2_DISPLAY = "NYC";
export const TOKEN_USDA_DISPLAY = "USDA";
export const TOKEN_BANANA_DISPLAY = "BAN";
export const TOKEN_ALEX_DISPLAY = "ALEX";
export const TOKEN_SLM_DISPLAY = "SLM";
export const TOKEN_DIKO_DISPLAY = "DIKO";
export const TOKEN_LDN_DISPLAY = "LDN";
export const TOKEN_WELSH_DISPLAY = "WELSH";

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
export const USDA_ADDRESS = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR";
export const USDA_CONTRACT = "usda-token";
export const USDA_ASSETNAME = "usda";
export const BAN_ADDRESS = "SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C";
export const BAN_CONTRACT = "btc-monkeys-bananas";
export const BAN_ASSETNAME = "BANANA";
export const ALEX_ADDRESS = "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9";
export const ALEX_CONTRACT = "age000-governance-token";
export const ALEX_ASSETNAME = "alex";
export const SLM_ADDRESS = "SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7";
export const SLM_CONTRACT = "slime-token";
export const SLM_ASSETNAME = "SLIME";
export const DIKO_ADDRESS = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR";
export const DIKO_CONTRACT = "arkadiko-token";
export const DIKO_ASSETNAME = "diko";
export const LDN_ADDRESS = "SP3MBWGMCVC9KZ5DTAYFMG1D0AEJCR7NENTM3FTK5";
export const LDN_CONTRACT = "lydian-token";
export const LDN_ASSETNAME = "lydian";
export const WELSH_ADDRESS = "SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G";
export const WELSH_CONTRACT = "welshcorgicoin-token";
export const WELSH_ASSETNAME = "welshcorgicoin";

export const SUPPORT_FUNGIBLE_TOKENS = [
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
  TOKEN_USDA,
  TOKEN_BANANA,
  TOKEN_ALEX,
  TOKEN_SLM,
  TOKEN_DIKO,
  TOKEN_LDN,
  TOKEN_WELSH,
];

export const SUPPORT_TOKENS: SelectTokenType[] = [
  { value: TOKEN_STX, display: TOKEN_STX_DISPLAY, image: StxLogo },
  { value: TOKEN_MIA_V2, display: TOKEN_MIA_V2_DISPLAY, image: MiaLogo },
  { value: TOKEN_NYC_V2, display: TOKEN_NYC_V2_DISPLAY, image: NycLogo },
  { value: TOKEN_USDA, display: TOKEN_USDA_DISPLAY, image: UsdaLogo },
  { value: TOKEN_ALEX, display: TOKEN_ALEX_DISPLAY, image: AlexLogo },
  { value: TOKEN_DIKO, display: TOKEN_DIKO_DISPLAY, image: DikoLogo },
  { value: TOKEN_BANANA, display: TOKEN_BANANA_DISPLAY, image: BananaLogo },
  { value: TOKEN_WELSH, display: TOKEN_WELSH_DISPLAY, image: WelshLogo },
  { value: TOKEN_SLM, display: TOKEN_SLM_DISPLAY, image: SlmLogo },
  { value: TOKEN_LDN, display: TOKEN_LDN_DISPLAY, image: LydianLogo },
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

export const getLogoByToken = (token) => {
  switch (token) {
    case TOKEN_STX:
      return StxLogo;
    case TOKEN_MIA_V2:
      return MiaLogo;
    case TOKEN_NYC_V2:
      return NycLogo;
    case TOKEN_USDA:
      return UsdaLogo;
    case TOKEN_BANANA:
      return BananaLogo;
    case TOKEN_ALEX:
      return AlexLogo;
    case TOKEN_LDN:
      return LydianLogo;
    case TOKEN_DIKO:
      return DikoLogo;
    case TOKEN_SLM:
      return SlmLogo;
    case TOKEN_WELSH:
      return WelshLogo;

    default:
      null;
  }
};
