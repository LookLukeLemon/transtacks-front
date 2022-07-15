import IPostConditionStrategy, {
  PostConditionBaseProps,
} from "./IPostConditionStrategy";
import {
  makeStandardSTXPostCondition,
  FungibleConditionCode,
} from "@stacks/transactions";

export class StxPostConditionStrategy implements IPostConditionStrategy {
  getPostCondition = (props: PostConditionBaseProps) => {
    const { myAddress, total } = props;
    return makeStandardSTXPostCondition(
      myAddress,
      FungibleConditionCode.LessEqual,
      total
    );
  };
}
