import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { TOKEN_STX } from "common/Constants";

export type RecipientAndAmountPair = {
  recipient: string;
  amount: string;
};

export type AddFn = () => void;
export type AddTenFn = () => void;
export type RemoveFn = (item: PrimitiveAtom<RecipientAndAmountPair>) => void;

export const selectedTokenAtom = atom(TOKEN_STX);
export const recipientAndAmountPairsAtom = atom<
  PrimitiveAtom<RecipientAndAmountPair>[]
>([]);

export const destructuredPairAtom = atom((get) => {
  const recipientAndAmountPairs = get(recipientAndAmountPairsAtom);
  return recipientAndAmountPairs.map((atom) => get(atom));
});
