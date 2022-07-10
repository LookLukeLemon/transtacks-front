import React from "react";
import { FiSend } from "react-icons/fi";
const SendAction = () => {
  return (
    <div className="flex justify-end">
      <button className="btn btn-warning gap-2 btn-sm md:btn-md ">
        <FiSend className="h-3 w-3 md:h-4 md:w-4" />
        Send All
      </button>
    </div>
  );
};

export default SendAction;
