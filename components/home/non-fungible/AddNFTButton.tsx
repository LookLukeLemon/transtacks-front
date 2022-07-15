import { isModalOpenAtom } from "common/store";
import { useSetAtom } from "jotai";
import React from "react";

const AddNFTButton = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom);
  return (
    <div
      className="btn modal-button btn-warning btn-sm md:btn-md"
      onClick={() => setIsModalOpen(true)}
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
    </div>
  );
};

export default AddNFTButton;
