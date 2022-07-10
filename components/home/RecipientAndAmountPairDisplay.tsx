import { RecipientAndAmountPair, RemoveFn } from "common/store";
import { PrimitiveAtom, useAtom } from "jotai";
import React from "react";
import AmountInput from "./AmountInput";
import RecipientInput from "./RecipientInput";
import RemoveButton from "./RemoveButton";

export type PairDisplayProps = {
  atom: PrimitiveAtom<RecipientAndAmountPair>;
  idx: number;
  onRemove: RemoveFn;
};

const RecipientAndAmountPairDisplay = ({
  atom,
  idx,
  onRemove,
}: PairDisplayProps) => {
  return (
    <div className="flex gap-4 md:gap-8 h-fit">
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 h-fit">
        <RecipientInput atom={atom} idx={idx} />
        <AmountInput atom={atom} />
      </div>
      <RemoveButton atom={atom} onRemove={onRemove} />
    </div>
  );
};

export default RecipientAndAmountPairDisplay;
