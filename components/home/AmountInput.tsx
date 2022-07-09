import Image from "next/image";
import React from "react";
import StxLogo from "public/images/stx.svg";
import MiaLogo from "public/images/mia.svg";
import NycLogo from "public/images/nyc.svg";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { RecipientAndAmountPair, selectedTokenAtom } from "common/store";

export type AmountInputProps = {
  atom: PrimitiveAtom<RecipientAndAmountPair>;
};

const TokenImageDisplay = () => {
  const selectedToken = useAtomValue(selectedTokenAtom);

  const tokenLogo =
    selectedToken === "stx"
      ? StxLogo
      : selectedToken === "mia-v2"
      ? MiaLogo
      : NycLogo;

  return (
    <span className="flex gap-x-2">
      Amount
      <div className="relative h-5 w-5">
        <Image src={tokenLogo} alt="" layout="fill" objectFit="cover" />
      </div>
    </span>
  );
};

const TokenSymbolDisplay = () => {
  const selectedToken = useAtomValue(selectedTokenAtom);

  const tokenLogo =
    selectedToken === "stx"
      ? "STX"
      : selectedToken === "mia-v2"
      ? "MIA"
      : "NYC";

  return <span>{tokenLogo}</span>;
};

const AmountInput = ({ atom }: AmountInputProps) => {
  const [item, setItem] = useAtom(atom);

  const handleChangeAmount = (e) => {
    setItem({ ...item, amount: e.target.value });
  };

  return (
    <label className="input-group input-group-md">
      <TokenImageDisplay />
      <input
        type="number"
        min={1}
        placeholder="0.000000"
        className="input input-bordered input-md w-full"
        value={item.amount}
        onChange={handleChangeAmount}
      />
      <TokenSymbolDisplay />
    </label>
  );
};

export default AmountInput;
