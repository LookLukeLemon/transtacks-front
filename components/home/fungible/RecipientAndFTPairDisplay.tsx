import { RecipientAndFTPair, RemoveFungibleFn } from "common/store";
import { PrimitiveAtom } from "jotai";
import React from "react";
import AmountInput from "./AmountInput";
import RecipientInput from "./RecipientInput";
import RemoveFtButton from "./RemoveFtButton";

export type PairDisplayProps = {
  atom: PrimitiveAtom<RecipientAndFTPair>;
  idx: number;
  onRemove: RemoveFungibleFn;
  isAvailableFTLimit: (tokenToAdd: string) => boolean;
};

const RecipientAndFTPairDisplay = ({
  atom,
  idx,
  onRemove,
  isAvailableFTLimit,
}: PairDisplayProps) => {
  return (
    <div className="flex gap-4 md:gap-8 h-fit">
      <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 h-fit">
        <RecipientInput atom={atom} idx={idx} />
        <AmountInput atom={atom} isAvailableFTLimit={isAvailableFTLimit} />
      </div>
      <RemoveFtButton atom={atom} onRemove={onRemove} />
    </div>
  );
};

export default RecipientAndFTPairDisplay;
