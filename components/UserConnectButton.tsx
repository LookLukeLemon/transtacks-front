import { useAtomValue } from "jotai";
import { useConnect, userAddressAtom } from "lib/auth";
import React, { useMemo } from "react";
import { BiWallet } from "react-icons/bi";
import { truncateMiddle } from "utils";

const UserConnectButton = () => {
  const { handleOpenAuth, handleSignOut } = useConnect();
  const myAddress = useAtomValue(userAddressAtom);

  return useMemo(() => {
    return myAddress ? (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn rounded-2xl">
          <div className="flex items-center space-x-2 truncate px-1 font-semibold">
            <BiWallet size={20} />
            <span>{truncateMiddle(myAddress, 4, 4)}</span>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a onClick={handleOpenAuth}>Switch Account</a>
          </li>
          <li>
            <a onClick={handleSignOut}>Logout</a>
          </li>
        </ul>
      </div>
    ) : (
      <div tabIndex={0} className="btn rounded-full" onClick={handleOpenAuth}>
        <div className="flex items-center space-x-2 truncate px-2 font-semibold">
          <span>Connect</span>
        </div>
      </div>
    );
  }, [myAddress, handleOpenAuth, handleSignOut]);
};

export default UserConnectButton;
