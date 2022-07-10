import {
  MIA_V2_ADDRESS,
  MIA_V2_ASSETNAME,
  MIA_V2_CONTRACT,
  MULTI_SEND_CONTRACT_MAINNET,
  MULTI_SEND_CONTRACT_TESTNET,
  MULTI_SEND_DEPLOYER_MAINNET,
  MULTI_SEND_DEPLOYER_TESTNET,
  MULTI_SEND_FT,
  MULTI_SEND_STX,
  NYC_V2_ADDRESS,
  NYC_V2_ASSETNAME,
  NYC_V2_CONTRACT,
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
  TOKEN_STX,
} from "common/Constants";
import {
  destructuredPairAtom,
  RecipientAndAmountPair,
  selectedTokenAtom,
} from "common/store";
import { useAtomValue } from "jotai";
import { useConnect as useConnectReact } from "@stacks/connect-react";
import { useConnect, userAddressAtom } from "lib/auth";
import { NETWORK } from "lib/stacks";
import {
  AnchorMode,
  contractPrincipalCV,
  createAssetInfo,
  FungibleConditionCode,
  makeContractNonFungiblePostCondition,
  makeStandardFungiblePostCondition,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  noneCV,
  NonFungibleConditionCode,
  PostConditionMode,
  StandardPrincipalCV,
  standardPrincipalCV,
  UIntCV,
  listCV,
  TupleCV,
  someCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";

export type MultiSendParameterPair = {
  to: StandardPrincipalCV;
  amount: UIntCV;
};

const ADDRESS =
  process.env.NEXT_PUBLIC_STACKS_ENV === "testnet"
    ? MULTI_SEND_DEPLOYER_TESTNET
    : MULTI_SEND_DEPLOYER_MAINNET;

const CONTRACT =
  process.env.NEXT_PUBLIC_STACKS_ENV === "testnet"
    ? MULTI_SEND_CONTRACT_TESTNET
    : MULTI_SEND_CONTRACT_MAINNET;
// (define-public (transfer-stx-many (recipients (list 400 { to: principal, amount: uint })))
// (define-public (transfer-ft-many (recipient (list 400 {amount: uint, sender: principal, to: principal})) (token-contract <ft-trait>))
const useContract = () => {
  const { handleOpenAuth } = useConnect();
  const { doContractCall } = useConnectReact();
  const myAddress = useAtomValue(userAddressAtom);
  const selectedToken = useAtomValue(selectedTokenAtom);
  const destructuredPair = useAtomValue(destructuredPairAtom);

  const handleSendAll = async () => {
    try {
      if (selectedToken === TOKEN_STX) {
        const recipients = [];
        let total = new BigNumber(0);
        destructuredPair.map((pair) => {
          const { recipient, amount } = pair;
          total = total.plus(amount);

          recipients.push(
            tupleCV({
              to: standardPrincipalCV(recipient),
              amount: uintCV(
                new BigNumber(amount).multipliedBy(Math.pow(10, 6)).toNumber()
              ),
            })
          );
        });

        const postConditions = [
          makeStandardSTXPostCondition(
            myAddress,
            FungibleConditionCode.LessEqual,
            total.multipliedBy(Math.pow(10, 6)).toNumber()
          ),
        ];

        await doContractCall({
          contractAddress: ADDRESS,
          contractName: CONTRACT,
          functionName: MULTI_SEND_STX,
          functionArgs: [listCV<TupleCV>(recipients)],
          network: NETWORK,
          postConditionMode: PostConditionMode.Deny,
          postConditions: postConditions,
          anchorMode: AnchorMode.Any,
          onCancel: () => {},
          onFinish: (result) => {
            toast.success("Success to broadcast!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          },
        });
      } else if (selectedToken === (TOKEN_MIA_V2 || TOKEN_NYC_V2)) {
        const recipients = [];
        const assetInfo =
          selectedToken === TOKEN_MIA_V2
            ? createAssetInfo(MIA_V2_ADDRESS, MIA_V2_CONTRACT, MIA_V2_ASSETNAME)
            : createAssetInfo(
                NYC_V2_ADDRESS,
                NYC_V2_CONTRACT,
                NYC_V2_ASSETNAME
              );

        const paymentAssetContractCV =
          selectedToken === TOKEN_MIA_V2
            ? contractPrincipalCV(MIA_V2_ADDRESS, MIA_V2_CONTRACT)
            : contractPrincipalCV(NYC_V2_ADDRESS, NYC_V2_CONTRACT);

        let total = new BigNumber(0);
        destructuredPair.map((pair) => {
          const { recipient, amount } = pair;
          total = total.plus(amount);

          recipients.push(
            tupleCV({
              amount: uintCV(
                new BigNumber(amount).multipliedBy(Math.pow(10, 6)).toNumber()
              ),
              sender: standardPrincipalCV(myAddress),
              to: standardPrincipalCV(recipient),
            })
          );
        });

        const postConditions = [
          makeStandardFungiblePostCondition(
            myAddress,
            FungibleConditionCode.LessEqual,
            total.multipliedBy(Math.pow(10, 6)).toNumber(),
            assetInfo
          ),
        ];

        await doContractCall({
          contractAddress: ADDRESS,
          contractName: CONTRACT,
          functionName: MULTI_SEND_FT,
          functionArgs: [listCV<TupleCV>(recipients), paymentAssetContractCV],
          network: NETWORK,
          postConditionMode: PostConditionMode.Deny,
          postConditions: postConditions,
          anchorMode: AnchorMode.Any,
          onCancel: () => {},
          onFinish: (result) => {
            toast.success("Success to broadcast!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleSendAll };
};

export default useContract;
