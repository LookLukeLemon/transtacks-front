import { AddFn } from "common/store";
import React, { memo } from "react";
import { GoPlus } from "react-icons/go";

type PlusProps = {
  onAdd: AddFn;
};
const PlusButton = ({ onAdd }: PlusProps) => {
  return (
    <button className="btn btn-warning gap-2" onClick={onAdd}>
      <GoPlus /> ADD 1
    </button>
  );
};

export default memo(PlusButton, () => true);
