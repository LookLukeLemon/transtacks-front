import {
  MIA_V2_ADDRESS,
  MIA_V2_ASSETNAME,
  MIA_V2_CONTRACT,
  MULTI_SEND_DEPLOYER_MAINNET,
  MULTI_SEND_DEPLOYER_TESTNET,
  NYC_V2_ADDRESS,
  NYC_V2_ASSETNAME,
  NYC_V2_CONTRACT,
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
} from "common/Constants";
import { createAssetInfo } from "@stacks/transactions";

const ADDRESS =
  process.env.NEXT_PUBLIC_STACKS_ENV === "testnet"
    ? MULTI_SEND_DEPLOYER_TESTNET
    : MULTI_SEND_DEPLOYER_MAINNET;

export class AssetInfoFactory {
  static getAssetInfo = (token: string) => {
    switch (token) {
      case TOKEN_MIA_V2:
        return createAssetInfo(
          MIA_V2_ADDRESS,
          MIA_V2_CONTRACT,
          MIA_V2_ASSETNAME
        );
      case TOKEN_NYC_V2:
        return createAssetInfo(
          NYC_V2_ADDRESS,
          NYC_V2_CONTRACT,
          NYC_V2_ASSETNAME
        );

      default:
        return null;
    }
  };
}
