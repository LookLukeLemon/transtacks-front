import { recipientAndFTPairsAtom } from "common/store";
import { useAtomValue } from "jotai";
import React from "react";
import AddFtButton from "./AddFtButton";
import AddFtTenButton from "./AddFtTenButton";
import RecipientAndFTPairDisplay from "./RecipientAndFTPairDisplay";
import SelectTokenGroup from "./SelectTokenGroup";

const FungibleTokenRegion = ({
  onAdd,
  onAddTen,
  onRemove,
  isAvailableFTLimit,
}) => {
  const recipientAndFTPairs = useAtomValue(recipientAndFTPairsAtom);

  return (
    <div className="card card-compact md:card-normal bg-base-100 shadow-xl h-full xl:col-span-2">
      <div className="card-body gap-8">
        <h2 className="card-title ">
          <div className="flex flex-col sm:flex-row sm:items-center w-full gap-4">
            <span>TOKENS</span>
            <div className="flex flex-1">
              <div className="flex-1">
                <SelectTokenGroup />
              </div>

              <div className="flex gap-4">
                <AddFtButton onAdd={onAdd} />
                <AddFtTenButton onAddTen={onAddTen} />
              </div>
            </div>
          </div>
        </h2>

        {recipientAndFTPairs?.length === 0 ? (
          <div className="bg-base-100 rounded-xl p-10 flex justify-center items-center min-h-[200px]">
            There is no items to send tokens
          </div>
        ) : (
          <div className="grid gap-2">
            {recipientAndFTPairs.map((atom, idx) => (
              <RecipientAndFTPairDisplay
                key={atom.toString()}
                idx={idx}
                atom={atom}
                onRemove={onRemove}
                isAvailableFTLimit={isAvailableFTLimit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FungibleTokenRegion;
