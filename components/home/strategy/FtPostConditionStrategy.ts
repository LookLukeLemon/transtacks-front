import IPostConditionStrategy, {
  PostConditionBaseProps,
} from "./IPostConditionStrategy";
import {
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
} from "@stacks/transactions";
export class FtPostConditionStrategy implements IPostConditionStrategy {
  getPostCondition = (props: PostConditionBaseProps) => {
    const { myAddress, total, assetInfo } = props;
    return makeStandardFungiblePostCondition(
      myAddress,
      FungibleConditionCode.LessEqual,
      total,
      assetInfo
    );
  };
}
