import { RecipientAndAmountPair, RemoveFn } from "common/store";
import { PrimitiveAtom } from "jotai";
import React from "react";
import { MdRemove } from "react-icons/md";

export type RecipientInputProps = {
  atom: PrimitiveAtom<RecipientAndAmountPair>;
  onRemove: RemoveFn;
};

const RemoveButton = ({ atom, onRemove }) => {
  return (
    <button
      className="btn btn-outline btn-sm md:btn-md"
      onClick={() => onRemove(atom)}
    >
      <MdRemove className="w-3 h-3 md:w-4 md:h-4" />
    </button>
  );
};

export default RemoveButton;
