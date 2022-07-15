import { AssetInfo } from "@stacks/transactions";

export type PostConditionBaseProps = {
  myAddress: string;
  total: number;
  assetInfo?: AssetInfo;
};

export default interface IPostConditionStrategy {
  getPostCondition(props: PostConditionBaseProps);
}
