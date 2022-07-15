import {
  TOKEN_MIA_V2,
  TOKEN_MIA_V2_DISPLAY,
  TOKEN_NYC_V2,
  TOKEN_NYC_V2_DISPLAY,
  TOKEN_STX,
  TOKEN_STX_DISPLAY,
} from "common/Constants";
import { selectedTokenAtom } from "common/store";
import { useAtom } from "jotai";
import React from "react";
import { useMemo } from "react";
import { classNames } from "utils";
import StxLogo from "public/images/stx.svg";
import MiaLogo from "public/images/mia.svg";
import NycLogo from "public/images/nyc.svg";
import Image from "next/image";

const SelectTokenGroup = () => {
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);

  return useMemo(
    () => (
      <div className="btn-group">
        <button
          className={classNames(
            "btn btn-sm md:btn-md gap-4 bg-base-200",
            selectedToken === TOKEN_STX && "!btn-warning text-white"
          )}
          onClick={(e) => {
            e.preventDefault();
            setSelectedToken(TOKEN_STX);
          }}
        >
          <div className="relative h-5 w-5">
            <Image src={StxLogo} alt="" layout="fill" objectFit="cover" />
          </div>

          <div className="hidden md:flex">{TOKEN_STX_DISPLAY}</div>
        </button>
        <button
          className={classNames(
            "btn btn-sm md:btn-md gap-4 bg-base-200",
            selectedToken === TOKEN_MIA_V2 && "!btn-warning text-white"
          )}
          onClick={(e) => {
            e.preventDefault();
            setSelectedToken(TOKEN_MIA_V2);
          }}
        >
          <div className="relative h-5 w-5">
            <Image src={MiaLogo} alt="" layout="fill" objectFit="cover" />
          </div>

          <div className="hidden md:flex">{TOKEN_MIA_V2_DISPLAY}</div>
        </button>
        <button
          className={classNames(
            "btn btn-sm md:btn-md gap-4 bg-base-200",
            selectedToken === TOKEN_NYC_V2 && "!btn-warning text-white"
          )}
          onClick={(e) => {
            e.preventDefault();
            setSelectedToken(TOKEN_NYC_V2);
          }}
        >
          <div className="relative h-5 w-5">
            <Image src={NycLogo} alt="" layout="fill" objectFit="cover" />
          </div>

          <div className="hidden md:flex">{TOKEN_NYC_V2_DISPLAY}</div>
        </button>
      </div>
    ),
    [selectedToken, setSelectedToken]
  );
};

export default SelectTokenGroup;
