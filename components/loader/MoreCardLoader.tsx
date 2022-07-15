import React from "react";

const MoreCardLoader = () => {
  return (
    <div className="card card-compact bg-base-100 flex h-full w-full animate-pulse ring-1 ring-base-200 flex-col">
      <div className="relative m-3">
        <div className="aspect-square flex-1 rounded-xl bg-base-200"></div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-y-3 px-3 py-3">
        <div className="mr-10 h-3 rounded-md bg-base-200"></div>
        <div className="h-3 rounded-md bg-base-200"></div>
      </div>
    </div>
  );
};

export default MoreCardLoader;
