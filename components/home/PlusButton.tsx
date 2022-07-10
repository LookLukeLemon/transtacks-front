import { AddFn } from "common/store";
import React, { memo } from "react";
import { GoPlus } from "react-icons/go";

type PlusProps = {
  onAdd: AddFn;
};
const PlusButton = ({ onAdd }: PlusProps) => {
  return (
    <button className="btn btn-warning gap-2 btn-sm md:btn-md" onClick={onAdd}>
      <GoPlus />
      <div className="hidden md:flex">ADD</div>1
    </button>
  );
};

export default memo(PlusButton, () => true);
