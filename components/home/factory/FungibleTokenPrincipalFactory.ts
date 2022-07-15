import {
  ALEX_ADDRESS,
  ALEX_CONTRACT,
  BAN_ADDRESS,
  BAN_CONTRACT,
  DIKO_ADDRESS,
  DIKO_CONTRACT,
  LDN_ADDRESS,
  LDN_CONTRACT,
  MIA_V2_ADDRESS,
  MIA_V2_CONTRACT,
  MULTI_SEND_DEPLOYER_MAINNET,
  MULTI_SEND_DEPLOYER_TESTNET,
  NYC_V2_ADDRESS,
  NYC_V2_CONTRACT,
  SLM_ADDRESS,
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
  USDA_CONTRACT,
  WELSH_ADDRESS,
  WELSH_CONTRACT,
} from "common/Constants";
import { contractPrincipalCV } from "@stacks/transactions";

export class FungibleTokenPrincipalFactory {
  static getPrincipal = (token: string) => {
    switch (token) {
      case TOKEN_MIA_V2:
        return contractPrincipalCV(MIA_V2_ADDRESS, MIA_V2_CONTRACT);
      case TOKEN_NYC_V2:
        return contractPrincipalCV(NYC_V2_ADDRESS, NYC_V2_CONTRACT);
      case TOKEN_USDA:
        return contractPrincipalCV(USDA_ADDRESS, USDA_CONTRACT);
      case TOKEN_BANANA:
        return contractPrincipalCV(BAN_ADDRESS, BAN_CONTRACT);
      case TOKEN_ALEX:
        return contractPrincipalCV(ALEX_ADDRESS, ALEX_CONTRACT);
      case TOKEN_DIKO:
        return contractPrincipalCV(DIKO_ADDRESS, DIKO_CONTRACT);
      case TOKEN_LDN:
        return contractPrincipalCV(LDN_ADDRESS, LDN_CONTRACT);
      case TOKEN_SLM:
        return contractPrincipalCV(SLM_ADDRESS, SLM_CONTRACT);
      case TOKEN_WELSH:
        return contractPrincipalCV(WELSH_ADDRESS, WELSH_CONTRACT);
      default: {
        throw new Error("Not supported token");
      }
    }
  };
}
