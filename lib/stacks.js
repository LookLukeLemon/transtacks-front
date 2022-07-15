import { StacksMainnet, StacksTestnet } from "@stacks/network";
import axios from "axios";

export const STACKS_API_URL = process.env.NEXT_PUBLIC_STACKS_API_URL;
export const STACKS_API_V2_INFO = `${STACKS_API_URL}/v2/info`;
export const STACKS_API_ACCOUNTS_URL = `${STACKS_API_URL}/v2/accounts`;
export const STACKS_API_NFT_HOLDINGS = `${STACKS_API_URL}/extended/v1/tokens/nft/holdings`;
export const STACKS_API_NFT_METADATA = `${STACKS_API_URL}/extended/v1/tokens/nft/metadata`;
export const STACKS_API_ADDRESSINFO = `${STACKS_API_URL}/extended/v1/address`;
export const STACKS_API_MEMPOOL = `${STACKS_API_URL}/extended/v1/tx/mempool`;
export const STACKS_API_FEE_URL = `${STACKS_API_URL}/v2/fees/transfer`;

export const NETWORK =
  process.env.NEXT_PUBLIC_STACKS_ENV === "testnet"
    ? new StacksTestnet()
    : new StacksMainnet();

export function ustxToStx(ustx) {
  return parseInt(ustx) / 1000000;
}

export function stxToUstx(stx) {
  return parseInt(stx * 1000000);
}

export const getCurrentBlockHeight = async () => {
  try {
    const res = await axios.get(STACKS_API_V2_INFO);
    return res.data.stacks_tip_height;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getStxBalance = async (address) => {
  try {
    const url = `${STACKS_API_ADDRESSINFO}/${address}/stx`;
    const response = await fetch(url);
    const json = await response.json();

    return json.balance;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
