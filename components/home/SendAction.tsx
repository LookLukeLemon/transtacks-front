import React from "react";
import { FiSend } from "react-icons/fi";
const SendAction = () => {
  return (
    <div className="flex justify-end">
      <button className="btn btn-warning gap-2">
        <FiSend className="h-4 w-4" />
        Send All
      </button>
    </div>
  );
};

export default SendAction;
