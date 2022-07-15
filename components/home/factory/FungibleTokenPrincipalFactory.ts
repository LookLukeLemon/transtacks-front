import {
  MIA_V2_ADDRESS,
  MIA_V2_CONTRACT,
  MULTI_SEND_DEPLOYER_MAINNET,
  MULTI_SEND_DEPLOYER_TESTNET,
  NYC_V2_ADDRESS,
  NYC_V2_CONTRACT,
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
} from "common/Constants";
import { contractPrincipalCV } from "@stacks/transactions";

const ADDRESS =
  process.env.NEXT_PUBLIC_STACKS_ENV === "testnet"
    ? MULTI_SEND_DEPLOYER_TESTNET
    : MULTI_SEND_DEPLOYER_MAINNET;

export class FungibleTokenPrincipalFactory {
  static getPrincipal = (token: string) => {
    switch (token) {
      case TOKEN_MIA_V2:
        return contractPrincipalCV(MIA_V2_ADDRESS, MIA_V2_CONTRACT);
      case TOKEN_NYC_V2:
        return contractPrincipalCV(NYC_V2_ADDRESS, NYC_V2_CONTRACT);

      default: {
        throw new Error("Not supported token");
      }
    }
  };
}
