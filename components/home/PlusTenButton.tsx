import { AddTenFn } from "common/store";
import React, { memo } from "react";
import { GoPlus } from "react-icons/go";

type PlusTenProps = {
  onAddTen: AddTenFn;
};

const PlusTenButton = ({ onAddTen }: PlusTenProps) => {
  return (
    <button
      className="btn btn-warning gap-2 btn-sm md:btn-md"
      onClick={onAddTen}
    >
      <GoPlus />
      <div className="hidden md:flex">ADD</div>10
    </button>
  );
};

export default memo(PlusTenButton, () => true);
