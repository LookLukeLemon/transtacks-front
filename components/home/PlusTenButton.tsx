import { AddTenFn } from "common/store";
import React, { memo } from "react";
import { GoPlus } from "react-icons/go";

type PlusTenProps = {
  onAddTen: AddTenFn;
};

const PlusTenButton = ({ onAddTen }: PlusTenProps) => {
  return (
    <button className="btn btn-warning gap-2" onClick={onAddTen}>
      <GoPlus />
      ADD 10
    </button>
  );
};

export default memo(PlusTenButton, () => true);
