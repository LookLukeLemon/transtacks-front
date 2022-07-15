import { recipientAndNFTPairsAtom } from "common/store";
import { useAtomValue } from "jotai";
import React from "react";
import CartItem from "./CartItem";

const MyNftCart = ({ onRemove }) => {
  const recipientAndNFTPairs = useAtomValue(recipientAndNFTPairsAtom);

  return (
    <div className="flex flex-col gap-2">
      {recipientAndNFTPairs?.length === 0 ? (
        <div className="justify-center items-center flex min-h-[200px]">
          There is no NFTs
        </div>
      ) : (
        recipientAndNFTPairs.map((atom) => (
          <CartItem key={atom.toString()} atom={atom} onRemove={onRemove} />
        ))
      )}
    </div>
  );
};

export default MyNftCart;
