import Image from "next/image";
import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import {
  getDefaultPair,
  RecipientAndFTPair,
  SelectTokenType,
} from "common/store";
import {
  getLogoByToken,
  LIMIT_FOR_FT_MSG,
  SUPPORT_TOKENS,
  TOKEN_MIA_V2,
  TOKEN_STX,
} from "common/Constants";
import { toast } from "react-toastify";
import SelectTokenGroup from "components/common/SelectTokenGroup";

export type AmountInputProps = {
  atom: PrimitiveAtom<RecipientAndFTPair>;
  isAvailableFTLimit: (tokenToAdd: string) => boolean;
};

const AmountInput = ({ atom, isAvailableFTLimit }: AmountInputProps) => {
  const [item, setItem] = useAtom(atom);

  const handleChangeAmount = (e) => {
    setItem({ ...item, amount: e.target.value });
  };

  const handleChangeToken = (token: SelectTokenType) => {
    if (!isAvailableFTLimit(token.value)) {
      toast.error(LIMIT_FOR_FT_MSG);
      return;
    }

    const defaultPair = getDefaultPair(token);
    setItem({ ...item, token, order: defaultPair.order });
  };

  return (
    <div className="flex gap-1">
      <SelectTokenGroup
        selectedToken={item.token}
        onChange={handleChangeToken}
        style="ring-0 rounded-r-none"
      />
      <label className="input-group flex-1 input-group-sm md:input-group-md gap-x-1">
        <input
          type="number"
          step="any"
          required
          min={1}
          placeholder="0.000000"
          className="input input-sm bg-base-200 md:input-md w-full"
          value={item.amount}
          onChange={handleChangeAmount}
        />
      </label>
    </div>
  );
};

export default AmountInput;
