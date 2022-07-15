import {
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
  TOKEN_STX,
  TOKEN_USDA,
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
        return new FtPostConditionStrategy();

      default:
        throw new Error("Not supported token");
    }
  };
}
