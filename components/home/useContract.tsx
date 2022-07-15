import {
  LIMIT_FOR_FT,
  LIMIT_FOR_NFT,
  MULTI_SEND_CONTRACT_MAINNET,
  MULTI_SEND_CONTRACT_TESTNET,
  MULTI_SEND_DEPLOYER_MAINNET,
  MULTI_SEND_DEPLOYER_TESTNET,
  MULTI_SEND_FT,
  MULTI_SEND_MIX,
  MULTI_SEND_STX,
  SUPPORT_FUNGIBLE_TOKENS,
  TOKEN_MIA_V2,
  TOKEN_NYC_V2,
  TOKEN_STX,
} from "common/Constants";
import { destructuredFTPairAtom, destructuredNFTAtom } from "common/store";
import { useAtomValue } from "jotai";
import { useConnect as useConnectReact } from "@stacks/connect-react";
import { useConnect, userAddressAtom } from "lib/auth";
import { NETWORK } from "lib/stacks";
import {
  AnchorMode,
  ContractPrincipalCV,
  contractPrincipalCV,
  FungibleConditionCode,
  makeStandardFungiblePostCondition,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  noneCV,
  PostConditionMode,
  NonFungibleConditionCode,
  StandardPrincipalCV,
  standardPrincipalCV,
  createAssetInfo,
  UIntCV,
  uintCV,
  listCV,
  TupleCV,
  someCV,
  tupleCV,
} from "@stacks/transactions";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { PostConditionFactory } from "./factory/PostConditionFactory";
import { FungibleTokenPrincipalFactory } from "./factory/FungibleTokenPrincipalFactory";
import { AssetInfoFactory } from "./factory/AssetInfoFactory";

type RecipientProps = {
  decimals: number;
  total: BigNumber;
  paymentMethod?: ContractPrincipalCV;
  recipients: TupleCV[];
  recordId?: number;
};

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

const useContract = () => {
  const { handleOpenAuth } = useConnect();
  const { doContractCall } = useConnectReact();
  const myAddress = useAtomValue(userAddressAtom);
  const destructuredPair = useAtomValue(destructuredFTPairAtom);
  const destructuredNFT = useAtomValue(destructuredNFTAtom);

  const handleSendStx = async () => {
    if (destructuredPair?.length === 0) return;

    const { decimals } = destructuredPair[0];
    const recipients = [];
    let total = new BigNumber(0);

    destructuredPair.map((pair) => {
      const { recipient, amount } = pair;
      total = total.plus(amount);

      recipients.push(
        tupleCV({
          to: standardPrincipalCV(recipient),
          amount: uintCV(
            new BigNumber(amount)
              .multipliedBy(Math.pow(10, decimals))
              .toNumber()
          ),
        })
      );
    });

    const postConditions = [
      makeStandardSTXPostCondition(
        myAddress,
        FungibleConditionCode.LessEqual,
        total.multipliedBy(Math.pow(10, decimals)).toNumber()
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
  };

  //오직 같은종류 FT들을 Multi-send 할 경우만 사용
  const handleSendFt = async () => {
    if (destructuredPair?.length === 0) return;

    const recipients = [];
    const firstPair = destructuredPair[0];
    const { token, decimals } = firstPair;
    const assetInfo = AssetInfoFactory.getAssetInfo(token);
    const paymentAssetContractCV =
      FungibleTokenPrincipalFactory.getPrincipal(token);
    let total = new BigNumber(0);
    destructuredPair.map((pair) => {
      const { recipient, amount } = pair;
      total = total.plus(amount);

      recipients.push(
        tupleCV({
          amount: uintCV(
            new BigNumber(amount)
              .multipliedBy(Math.pow(10, decimals))
              .toNumber()
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
        total.multipliedBy(Math.pow(10, decimals)).toNumber(),
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
  };

  const buildArgs = (recipientsMap: Map<string, RecipientProps>) => {
    const functionArgs = [];

    if (!recipientsMap.get(TOKEN_STX)) {
      functionArgs.push(noneCV());
    } else {
      functionArgs.push(
        someCV(listCV<TupleCV>(recipientsMap.get(TOKEN_STX).recipients))
      );
    }

    const recipientsForFt = new Map(
      [...recipientsMap]
        .filter(([key]) => SUPPORT_FUNGIBLE_TOKENS.some((t) => t === key))
        .slice(0, LIMIT_FOR_FT)
    );

    for (const [, value] of recipientsForFt) {
      functionArgs.push(value.paymentMethod);
      functionArgs.push(listCV<TupleCV>(value.recipients));
    }

    const recipientsForNFT = new Map(
      [...recipientsMap]
        .filter(
          ([key]) =>
            !SUPPORT_FUNGIBLE_TOKENS.some((t) => t === key || key === TOKEN_STX)
        )
        .slice(0, LIMIT_FOR_NFT)
    );

    for (const [key, value] of recipientsForNFT) {
      const splitFullAddress = key.split("::");
      const addrAndContract = splitFullAddress[0].split(".");
      const nftAddress = addrAndContract[0];
      const nftContract = addrAndContract[1];

      functionArgs.push(contractPrincipalCV(nftAddress, nftContract));
      functionArgs.push(value.recipients[0]);
    }

    return functionArgs;
  };

  const buildPostConditions = (recipientsMap: Map<string, RecipientProps>) => {
    const postConditions = [];

    const recipientsForStxAndFt = new Map(
      [...recipientsMap]
        .filter(([key]) =>
          SUPPORT_FUNGIBLE_TOKENS.some((t) => t === key || TOKEN_STX === key)
        )
        .slice(0, LIMIT_FOR_FT)
    );

    for (const [key, value] of recipientsForStxAndFt) {
      const assetInfo = AssetInfoFactory.getAssetInfo(key);
      const strategy = PostConditionFactory.getStrategy(key);
      postConditions.push(
        strategy.getPostCondition({
          myAddress,
          total: value.total
            .multipliedBy(Math.pow(10, value.decimals))
            .toNumber(),
          assetInfo,
        })
      );
    }

    const recipientsForNFT = new Map(
      [...recipientsMap]
        .filter(
          ([key]) =>
            !SUPPORT_FUNGIBLE_TOKENS.some((t) => t === key || key === TOKEN_STX)
        )
        .slice(0, LIMIT_FOR_NFT)
    );

    for (const [key, value] of recipientsForNFT) {
      const splitFullAddress = key.split("::");
      const addrAndContract = splitFullAddress[0].split(".");
      const assetNameAndTokenId = splitFullAddress[1].split(".");

      postConditions.push(
        makeStandardNonFungiblePostCondition(
          myAddress,
          NonFungibleConditionCode.DoesNotOwn,
          createAssetInfo(
            addrAndContract[0],
            addrAndContract[1],
            assetNameAndTokenId[0]
          ),
          uintCV(value.recordId)
        )
      );
    }

    return postConditions;
  };

  const handleSendMix = async () => {
    const recipientsMap = new Map<string, RecipientProps>();
    let howManyFt = 0;
    let howManyNft = destructuredNFT.length;

    destructuredPair
      .filter((pair) => {
        const { token } = pair;
        return SUPPORT_FUNGIBLE_TOKENS.some(
          (t) => t === token || TOKEN_STX === token
        );
      })
      .sort((a, b) => a.order - b.order)
      .map((pair) => {
        const { recipient, amount, token, decimals } = pair;

        if (!recipientsMap.get(token)) {
          if (token === TOKEN_STX) {
            recipientsMap.set(token, {
              decimals,
              total: new BigNumber(0),
              recipients: [],
            });
          } else {
            const paymentAssetContractCV =
              FungibleTokenPrincipalFactory.getPrincipal(token);

            recipientsMap.set(token, {
              decimals,
              total: new BigNumber(0),
              recipients: [],
              paymentMethod: paymentAssetContractCV,
            });

            howManyFt += 1;
          }
        }

        recipientsMap.set(token, {
          decimals,
          ...recipientsMap.get(token),
          total: recipientsMap.get(token).total.plus(amount),
          recipients: [
            ...recipientsMap.get(token).recipients,
            token === TOKEN_STX
              ? tupleCV({
                  amount: uintCV(
                    new BigNumber(amount)
                      .multipliedBy(Math.pow(10, decimals))
                      .toNumber()
                  ),
                  to: standardPrincipalCV(recipient),
                })
              : tupleCV({
                  amount: uintCV(
                    new BigNumber(amount)
                      .multipliedBy(Math.pow(10, decimals))
                      .toNumber()
                  ),
                  sender: standardPrincipalCV(myAddress),
                  to: standardPrincipalCV(recipient),
                }),
          ],
        });
      });

    destructuredNFT.map((nft) => {
      const { recipient, nftAddress, nftContract, nftAssetName, tokenId } = nft;
      const assetKey = `${nftAddress}.${nftContract}::${nftAssetName}.${tokenId}`;

      if (!recipientsMap.get(assetKey)) {
        const paymentAssetContractCV = contractPrincipalCV(
          nftAddress,
          nftContract
        );

        recipientsMap.set(assetKey, {
          decimals: 0,
          total: new BigNumber(0),
          recipients: [
            tupleCV({
              "token-id": uintCV(tokenId),
              sender: standardPrincipalCV(myAddress),
              to: standardPrincipalCV(recipient),
            }),
          ],
          paymentMethod: paymentAssetContractCV,
          recordId: tokenId,
        });
      }
    });

    let functionArgs = buildArgs(recipientsMap);
    let postConditions = buildPostConditions(recipientsMap);

    await doContractCall({
      contractAddress: ADDRESS,
      contractName: `transtacks-${howManyFt}-base`,
      functionName: `${MULTI_SEND_MIX}-${howManyFt}-${howManyNft}`,
      functionArgs: functionArgs,
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
  };

  const handleSendAll = async () => {
    if (destructuredPair?.length === 0 && destructuredNFT.length === 0) return;
    try {
      const isOnlyStx = destructuredPair.every((pair) => {
        const { token } = pair;
        return token === TOKEN_STX;
      });

      const isOnlyMia = destructuredPair.every((pair) => {
        const { token } = pair;
        return token === TOKEN_MIA_V2;
      });

      const isOnlyNyc = destructuredPair.every((pair) => {
        const { token } = pair;
        return token === TOKEN_NYC_V2;
      });

      const hasNFT = destructuredNFT.length > 0;

      if (isOnlyStx && !hasNFT) {
        await handleSendStx();
      } else if (!hasNFT && (isOnlyMia || isOnlyNyc)) {
        await handleSendFt();
      } else {
        await handleSendMix();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleSendAll };
};

export default useContract;
