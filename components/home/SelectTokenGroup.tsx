import { selectedTokenAtom } from "common/store";
import { useAtom } from "jotai";
import React from "react";
import { useMemo } from "react";
import { classNames } from "utils";

const SelectTokenGroup = () => {
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);

  return useMemo(
    () => (
      <div className="btn-group">
        <button
          className={classNames(
            "btn",
            selectedToken === "stx" && "btn-warning "
          )}
          onClick={() => {
            setSelectedToken("stx");
          }}
        >
          STX
        </button>
        <button
          className={classNames(
            "btn",
            selectedToken === "mia-v2" && "btn-warning"
          )}
          onClick={() => {
            setSelectedToken("mia-v2");
          }}
        >
          MIA-v2
        </button>
        <button
          className={classNames(
            "btn",
            selectedToken === "nyc-v2" && "btn-warning"
          )}
          onClick={() => {
            setSelectedToken("nyc-v2");
          }}
        >
          NYC-v2
        </button>
      </div>
    ),
    [selectedToken, setSelectedToken]
  );
};

export default SelectTokenGroup;
