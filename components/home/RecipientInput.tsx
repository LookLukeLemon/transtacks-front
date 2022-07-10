import { RecipientAndAmountPair } from "common/store";
import { PrimitiveAtom, useAtom } from "jotai";
import React from "react";

export type RecipientInputProps = {
  atom: PrimitiveAtom<RecipientAndAmountPair>;
  idx: number;
};

const RecipientInput = ({ atom, idx }: RecipientInputProps) => {
  const [item, setItem] = useAtom(atom);

  const handleChangeRecipient = (e) => {
    setItem({ ...item, recipient: e.target.value });
  };

  return (
    <label className="input-group input-group-md col-span-2">
      <div className="w-16 flex items-center justify-center bg-base-300 mr-1">
        {idx + 1}
      </div>
      <span>Recipient</span>
      <input
        type="text"
        required
        placeholder="e.g. ST3WD1H8FR8X5P5EHW9JV2R74RDG2YGYCY4MB0ZV6"
        className="input w-full input-bordered input-md"
        value={item.recipient}
        onChange={handleChangeRecipient}
      />
    </label>
  );
};

export default RecipientInput;
