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
import SendAction from "./SendAction";
import useContract from "./useContract";

const Orchestra = () => {
  const { handleSendAll } = useContract();
  const [recipientAndAmountPairs, setRecipientAndAmountPairs] = useAtom(
    recipientAndAmountPairsAtom
  );

  const handleAdd: AddFn = () =>
    setRecipientAndAmountPairs((prev) => [
      ...prev,
      atom<RecipientAndAmountPair>({ recipient: "", amount: "" }),
    ]);

  const handleAddTen: AddTenFn = () => {
    setRecipientAndAmountPairs((prev) => [
      ...prev,
      ...Array(10)
        .fill(null)
        .map(() => atom<RecipientAndAmountPair>({ recipient: "", amount: "" })),
    ]);
  };
  const handleRemove: RemoveFn = (recipientAndAmountPair) =>
    setRecipientAndAmountPairs((prev) =>
      prev.filter((item) => item !== recipientAndAmountPair)
    );

  return (
    <div className="gap-8 flex flex-col">
      <div className="flex">
        <div className="flex-1">
          <SelectTokenGroup />
        </div>

        <div className="flex gap-4">
          <PlusButton onAdd={handleAdd} />
          <PlusTenButton onAddTen={handleAddTen} />
        </div>
      </div>
      {recipientAndAmountPairs?.length === 0 ? (
        <div className="bg-base-100 rounded-xl p-10 flex justify-center items-center min-h-[200px]">
          There is no items to send tokens
        </div>
      ) : (
        <form
          className="h-full flex flex-col gap-8"
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleSendAll();
          }}
        >
          <div className="grid gap-2 h-full flex-1">
            {recipientAndAmountPairs.map((atom, idx) => (
              <RecipientAndAmountPairDisplay
                key={atom.toString()}
                idx={idx}
                atom={atom}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <SendAction />
        </form>
      )}
    </div>
  );
};

export default Orchestra;
