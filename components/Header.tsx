import Image from "next/image";
import React from "react";
import UserConnectButton from "./UserConnectButton";
import LogoImage from "public/images/send.svg";

const Header = () => {
  return (
    <header className="sticky top-0 z-40">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl gap-5">
            <div className="relative h-5 w-5">
              <Image src={LogoImage} alt="" layout="fill" objectFit="cover" />
            </div>
            Multi Sender
          </a>
        </div>
        <div className="flex-none">
          <UserConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
