import { destructuredNFTCacheAtom, isModalOpenAtom } from "common/store";
import { useAtom, useAtomValue } from "jotai";
import { userAddressAtom } from "lib/auth";
import React from "react";
import { classNames } from "utils";
import NftCardList from "./NftCardList";

const MyNFTs = ({ onAddAll }) => {
  const myAddress = useAtomValue(userAddressAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const destructuredNFTCache = useAtomValue(destructuredNFTCacheAtom);

  return (
    <>
      <label
        htmlFor="search-nft-modal"
        className={classNames(
          "modal cursor-pointer modal-bottom px-4 md:px-6 lg:px-12 xl:px-20",
          isModalOpen && "modal-open"
        )}
      >
        <label className="modal-box min-w-full relative flex flex-col modal-content-wrapper p-0">
          <h3 className="sticky top-0 z-10 py-4 flex bg-base-100 items-center text-lg font-bold border-b border-base-300 px-8 gap-4">
            <span className="flex-1 truncate">
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-base font-normal truncate">
                  Select the NFTs you want to transfer.
                </span>
              </div>
            </span>
            <div className="flex gap-4 justify-end">
              <div className="flex items-center">
                {destructuredNFTCache.length} items
              </div>
              <div
                className="btn btn-warning"
                onClick={() => {
                  onAddAll(destructuredNFTCache);
                  setIsModalOpen(false);
                }}
              >
                ADD
              </div>
              <div
                className="btn border-base-200 bg-base-200"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                CANCEL
              </div>
            </div>
          </h3>
          <div className="bg-base-100 p-4">
            <NftCardList address={myAddress} />
          </div>
        </label>
      </label>
    </>
  );
};

export default MyNFTs;
