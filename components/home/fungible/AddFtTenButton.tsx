import { AddTenFungibleFn } from "common/store";
import React, { memo } from "react";

type PlusTenProps = {
  onAddTen: AddTenFungibleFn;
};

const AddFtTenButton = ({ onAddTen }: PlusTenProps) => {
  return (
    <button
      className="btn btn-warning gap-2 btn-sm md:btn-md"
      onClick={(e) => {
        e.preventDefault();
        onAddTen();
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
      <span className="text-lg">10</span>
    </button>
  );
};

export default memo(AddFtTenButton);
