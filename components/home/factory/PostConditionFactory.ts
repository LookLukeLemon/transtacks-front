import {
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
import { FtPostConditionStrategy } from "../strategy/FtPostConditionStrategy";
import IPostConditionStrategy from "../strategy/IPostConditionStrategy";
import { StxPostConditionStrategy } from "../strategy/StxPostConditionStrategy";

export class PostConditionFactory {
  static getStrategy = (token: string): IPostConditionStrategy => {
    switch (token) {
      case TOKEN_STX:
        return new StxPostConditionStrategy();
      case TOKEN_MIA_V2:
      case TOKEN_NYC_V2:
      case TOKEN_USDA:
      case TOKEN_BANANA:
      case TOKEN_ALEX:
      case TOKEN_SLM:
      case TOKEN_DIKO:
      case TOKEN_LDN:
      case TOKEN_WELSH:
        return new FtPostConditionStrategy();

      default:
        throw new Error("Not supported token");
    }
  };
}
