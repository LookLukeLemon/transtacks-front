import { TOKEN_MIA_V2, TOKEN_NYC_V2, TOKEN_STX } from "common/Constants";
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
            selectedToken === TOKEN_STX && "btn-warning "
          )}
          onClick={() => {
            setSelectedToken(TOKEN_STX);
          }}
        >
          STX
        </button>
        <button
          className={classNames(
            "btn",
            selectedToken === TOKEN_MIA_V2 && "btn-warning"
          )}
          onClick={() => {
            setSelectedToken(TOKEN_MIA_V2);
          }}
        >
          MIA-v2
        </button>
        <button
          className={classNames(
            "btn",
            selectedToken === TOKEN_NYC_V2 && "btn-warning"
          )}
          onClick={() => {
            setSelectedToken(TOKEN_NYC_V2);
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
