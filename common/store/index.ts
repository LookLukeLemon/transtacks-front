import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";

export type RecipientAndAmountPair = {
  recipient: string;
  amount: string;
};

export type AddFn = () => void;
export type AddTenFn = () => void;
export type RemoveFn = (item: PrimitiveAtom<RecipientAndAmountPair>) => void;

export const selectedTokenAtom = atom("stx");
export const recipientAndAmountPairsAtom = atom<
  PrimitiveAtom<RecipientAndAmountPair>[]
>([]);
