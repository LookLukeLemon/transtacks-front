import { AddFungibleFn } from "common/store";
import React, { memo } from "react";

type PlusProps = {
  onAdd: AddFungibleFn;
};
const AddFtButton = ({ onAdd }: PlusProps) => {
  return (
    <button
      className="btn btn-warning gap-2 btn-sm md:btn-md"
      onClick={(e) => {
        e.preventDefault();
        onAdd();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
};

export default memo(AddFtButton);
