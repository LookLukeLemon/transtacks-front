import Image from "next/image";
import React from "react";
import StxLogo from "public/images/stx.svg";
import MiaLogo from "public/images/mia.svg";
import NycLogo from "public/images/nyc.svg";
import { PrimitiveAtom, useAtom } from "jotai";
import { getDefaultPair, RecipientAndFTPair } from "common/store";
import {
  LIMIT_FOR_FT_MSG,
  SUPPORT_TOKENS,
  TOKEN_MIA_V2,
  TOKEN_STX,
} from "common/Constants";
import { toast } from "react-toastify";

export type AmountInputProps = {
  atom: PrimitiveAtom<RecipientAndFTPair>;
  isAvailableFTLimit: (tokenToAdd: string) => boolean;
};

const TokenImageDisplay = ({ token, onChange }) => {
  return (
    <select
      className="select select-sm md:select-md bg-base-200"
      value={token}
      onChange={onChange}
    >
      {SUPPORT_TOKENS.map((t) => (
        <option key={t.value} value={t.value}>
          {t.display}
        </option>
      ))}
    </select>
  );
};

const AmountInput = ({ atom, isAvailableFTLimit }: AmountInputProps) => {
  const [item, setItem] = useAtom(atom);

  const handleChangeAmount = (e) => {
    setItem({ ...item, amount: e.target.value });
  };

  const handleChangeToken = (e) => {
    if (!isAvailableFTLimit(e.target.value)) {
      toast.error(LIMIT_FOR_FT_MSG);
      return;
    }

    const defaultPair = getDefaultPair(e.target.value);
    setItem({ ...item, token: e.target.value, order: defaultPair.order });
  };

  const tokenLogo =
    item.token === TOKEN_STX
      ? StxLogo
      : item.token === TOKEN_MIA_V2
      ? MiaLogo
      : NycLogo;

  return (
    <label className="input-group input-group-sm md:input-group-md gap-x-1">
      <TokenImageDisplay token={item.token} onChange={handleChangeToken} />
      <span className="hidden md:flex bg-base-200">
        <div className="relative w-5 h-5">
          <Image src={tokenLogo} layout="fill" objectFit="cover" alt="" />
        </div>
      </span>

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
  );
};

export default AmountInput;
