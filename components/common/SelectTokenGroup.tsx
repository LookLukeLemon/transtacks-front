import { SUPPORT_TOKENS } from "common/Constants";
import React, { Fragment } from "react";
import { useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/solid";
import BaseImage from "components/common/BaseImage";
import { classNames } from "utils";

const SelectTokenGroup = ({ selectedToken, onChange, style = "" }) => {
  return useMemo(
    () => (
      <div className="w-20 md:w-36 text-xs md:text-sm">
        <Listbox value={selectedToken} onChange={onChange}>
          <div className="relative">
            <Listbox.Button
              className={classNames(
                "relative w-full cursor-pointer rounded-lg bg-base-200 ring-1 ring-base-300 py-2 pl-3 pr-10 text-left h-8 md:h-12",
                style && style
              )}
            >
              <div className="flex gap-2">
                <div className="relative h-4 w-4 md:h-5 md:w-5">
                  <BaseImage
                    src={selectedToken.image}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="hidden md:flex truncate">
                  {selectedToken.display}
                </span>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-4 md:h-5" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 z-10 max-h-80 w-full overflow-auto rounded-xl bg-base-100 ring-1 ring-base-300">
                {SUPPORT_TOKENS.map((token, idx) => (
                  <Listbox.Option
                    key={token.value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                        active ? "bg-warning text-base-300" : "text-white"
                      }`
                    }
                    value={token}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`flex gap-2 truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          <div className="relative h-4 w-4 md:h-5 md:w-5">
                            <BaseImage
                              src={token.image}
                              alt=""
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <span className="hidden md:flex">
                            {token.display}
                          </span>
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="h-4 md:h-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    ),
    [selectedToken, onChange]
  );
};

export default SelectTokenGroup;
