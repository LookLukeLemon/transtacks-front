import React from "react";
import UserConnectButton from "./UserConnectButton";

const Header = () => {
  return (
    <header className="sticky top-0 z-40">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Multi Sender</a>
        </div>
        <div className="flex-none">
          <UserConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
