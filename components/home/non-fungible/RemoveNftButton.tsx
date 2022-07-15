import React from "react";
import { MdRemove } from "react-icons/md";

const RemoveNftButton = ({ atom, onRemove }) => {
  return (
    <button
      className="btn bg-base-300 border-none btn-sm md:btn-md"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove(atom);
      }}
    >
      <MdRemove className="w-3 h-3 md:w-4 md:h-4" />
    </button>
  );
};

export default RemoveNftButton;
