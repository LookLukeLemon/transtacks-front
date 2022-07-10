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
      className="btn btn-outline btn-circle"
      onClick={() => onRemove(atom)}
    >
      <MdRemove className="w-5 h-5" />
    </button>
  );
};

export default RemoveButton;
