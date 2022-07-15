import { RecipientAndFTPair } from "common/store";
import { PrimitiveAtom, useAtom } from "jotai";
import React from "react";

export type RecipientInputProps = {
  atom: PrimitiveAtom<RecipientAndFTPair>;
  idx: number;
};

const RecipientInput = ({ atom, idx }: RecipientInputProps) => {
  const [item, setItem] = useAtom(atom);

  const handleChangeRecipient = (e) => {
    setItem({ ...item, recipient: e.target.value });
  };

  return (
    <label className="input-group input-group-sm md:input-group-md">
      <div className="w-16 flex items-center justify-center bg-base-200 mr-1">
        {idx + 1}
      </div>

      <input
        type="text"
        required
        placeholder="Recipient"
        className="input w-full input-sm md:input-md bg-base-200"
        value={item.recipient}
        onChange={handleChangeRecipient}
      />
    </label>
  );
};

export default RecipientInput;
