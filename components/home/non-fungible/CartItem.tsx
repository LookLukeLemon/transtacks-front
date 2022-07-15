import { RecipientAndNFTPair, RemoveNonFungibleFn } from "common/store";
import BaseImage from "components/common/BaseImage";
import { PrimitiveAtom, useAtom } from "jotai";
import React from "react";
import RemoveNftButton from "./RemoveNFtButton";

type CartItemProps = {
  atom: PrimitiveAtom<RecipientAndNFTPair>;
  onRemove: RemoveNonFungibleFn;
};

const CartItem = ({ atom, onRemove }: CartItemProps) => {
  const [item, setItem] = useAtom(atom);
  const { image, name, tokenId } = item;

  const handleChangeRecipient = (e) => {
    setItem({ ...item, recipient: e.target.value });
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="w-8 md:w-12 aspect-square rounded-lg relative bg-base-200 mr-1 overflow-hidden">
        <BaseImage src={image} alt="" layout="fill" objectFit="cover" />
      </div>

      <h2 className="text-xs flex flex-col w-20 justify-center md:justify-between h-8 md:h-12">
        <span className="hidden md:flex truncate">{name}</span>
        <div className="badge badge-warning">#{tokenId}</div>
      </h2>

      <input
        type="text"
        required
        placeholder="Recipient"
        className="flex-1 input w-full input-sm md:input-md bg-base-200"
        value={item.recipient}
        onChange={handleChangeRecipient}
      />

      <RemoveNftButton atom={atom} onRemove={onRemove} />
    </div>
  );
};

export default CartItem;
