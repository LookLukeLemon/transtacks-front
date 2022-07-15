import {
  ALEX_ADDRESS,
  ALEX_ASSETNAME,
  ALEX_CONTRACT,
  BAN_ADDRESS,
  BAN_ASSETNAME,
  BAN_CONTRACT,
  DIKO_ADDRESS,
  DIKO_ASSETNAME,
  DIKO_CONTRACT,
  LDN_ADDRESS,
  LDN_ASSETNAME,
  LDN_CONTRACT,
  MIA_V2_ADDRESS,
  MIA_V2_ASSETNAME,
  MIA_V2_CONTRACT,
  MULTI_SEND_DEPLOYER_MAINNET,
  MULTI_SEND_DEPLOYER_TESTNET,
  NYC_V2_ADDRESS,
  NYC_V2_ASSETNAME,
  NYC_V2_CONTRACT,
  SLM_ADDRESS,
  SLM_ASSETNAME,
  SLM_CONTRACT,
  TOKEN_ALEX,
  TOKEN_BANANA,
  TOKEN_DIKO,
  TOKEN_LDN,
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
  TOKEN_SLM,
  TOKEN_USDA,
  TOKEN_WELSH,
  USDA_ADDRESS,
  USDA_ASSETNAME,
  USDA_CONTRACT,
  WELSH_ADDRESS,
  WELSH_ASSETNAME,
  WELSH_CONTRACT,
} from "common/Constants";
import { createAssetInfo } from "@stacks/transactions";

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
      case TOKEN_USDA:
        return createAssetInfo(USDA_ADDRESS, USDA_CONTRACT, USDA_ASSETNAME);
      case TOKEN_BANANA:
        return createAssetInfo(BAN_ADDRESS, BAN_CONTRACT, BAN_ASSETNAME);
      case TOKEN_ALEX:
        return createAssetInfo(ALEX_ADDRESS, ALEX_CONTRACT, ALEX_ASSETNAME);
      case TOKEN_DIKO:
        return createAssetInfo(DIKO_ADDRESS, DIKO_CONTRACT, DIKO_ASSETNAME);
      case TOKEN_LDN:
        return createAssetInfo(LDN_ADDRESS, LDN_CONTRACT, LDN_ASSETNAME);
      case TOKEN_SLM:
        return createAssetInfo(SLM_ADDRESS, SLM_CONTRACT, SLM_ASSETNAME);
      case TOKEN_WELSH:
        return createAssetInfo(WELSH_ADDRESS, WELSH_CONTRACT, WELSH_ASSETNAME);

      default:
        return null;
    }
  };
}
