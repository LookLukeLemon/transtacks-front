import Image from "next/image";
import React from "react";
import StxLogo from "public/images/stx.svg";
import MiaLogo from "public/images/mia.svg";
import NycLogo from "public/images/nyc.svg";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { RecipientAndAmountPair, selectedTokenAtom } from "common/store";
import {
  TOKEN_MIA_V2,
  TOKEN_MIA_V2_DISPLAY,
  TOKEN_NYC_V2_DISPLAY,
  TOKEN_STX,
  TOKEN_STX_DISPLAY,
} from "common/Constants";

export type AmountInputProps = {
  atom: PrimitiveAtom<RecipientAndAmountPair>;
};

const TokenImageDisplay = () => {
  const selectedToken = useAtomValue(selectedTokenAtom);

  const tokenLogo =
    selectedToken === TOKEN_STX
      ? StxLogo
      : selectedToken === TOKEN_MIA_V2
      ? MiaLogo
      : NycLogo;

  return (
    <span className="flex gap-x-2">
      <div className="hidden md:block">Amount</div>

      <div className="relative h-5 w-5">
        <Image src={tokenLogo} alt="" layout="fill" objectFit="cover" />
      </div>
    </span>
  );
};

const AmountInput = ({ atom }: AmountInputProps) => {
  const [item, setItem] = useAtom(atom);

  const handleChangeAmount = (e) => {
    setItem({ ...item, amount: e.target.value });
  };

  return (
    <label className="input-group input-group-sm md:input-group-md">
      <TokenImageDisplay />
      <input
        type="number"
        step="any"
        min={1}
        placeholder="0.000000"
        className="input input-sm md:input-md w-full"
        value={item.amount}
        onChange={handleChangeAmount}
      />
    </label>
  );
};

export default AmountInput;
