import {
  AddFn,
  AddTenFn,
  RecipientAndAmountPair,
  recipientAndAmountPairsAtom,
  RemoveFn,
} from "common/store";
import { atom, useAtom } from "jotai";
import React from "react";
import PlusButton from "./PlusButton";
import PlusTenButton from "./PlusTenButton";
import RecipientAndAmountPairDisplay from "./RecipientAndAmountPairDisplay";
import SelectTokenGroup from "./SelectTokenGroup";

const Orchestra = () => {
  const [recipientAndAmountPairs, setRecipientAndAmountPairs] = useAtom(
    recipientAndAmountPairsAtom
  );

  const handleAdd: AddFn = () =>
    setRecipientAndAmountPairs((prev) => [
      ...prev,
      atom<RecipientAndAmountPair>({ recipient: "", amount: null }),
    ]);

  const handleAddTen: AddTenFn = () => {
    setRecipientAndAmountPairs((prev) => [
      ...prev,
      ...Array(10)
        .fill(null)
        .map(() =>
          atom<RecipientAndAmountPair>({ recipient: "", amount: null })
        ),
    ]);
  };
  const handleRemove: RemoveFn = (recipientAndAmountPair) =>
    setRecipientAndAmountPairs((prev) =>
      prev.filter((item) => item !== recipientAndAmountPair)
    );

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <SelectTokenGroup />
        </div>

        <div className="flex gap-4">
          <PlusButton onAdd={handleAdd} />
          <PlusTenButton onAddTen={handleAddTen} />
        </div>
      </div>
      <form className="grid gap-2">
        {recipientAndAmountPairs.map((atom, idx) => (
          <RecipientAndAmountPairDisplay
            key={atom.toString()}
            idx={idx}
            atom={atom}
            onRemove={handleRemove}
          />
        ))}
      </form>
    </>
  );
};

export default Orchestra;
