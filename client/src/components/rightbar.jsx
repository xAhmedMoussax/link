import React from "react";
import { Button } from "./ui/button";

const RightBar = () => {
  return (
    <div
      id="scrollbar"
      className="flex flex-[3] sticky top-[70px] h-[calc(100vh-70px)] overflow-scroll justify-end"
    >
      <div className="py-7 pl-2 pr-6">
        <div className="flex flex-col pt-[10px] rounded-md shadow-right mb-5 bg-white">
          <span className="text-sm text-slate-500 mx-5 mb-3 select-none">
            Suggestions For You
          </span>
          <div className="flex justify-between mb-[20px] mx-5 gap-[45px]">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <span className="text-sm">Ahmed Moussa</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-indigo-600"
              >
                Follow
              </Button>
              <Button size="sm" variant="outline">
                dismiss
              </Button>
            </div>
          </div>
          <div className="flex justify-between mb-[20px] mx-5 gap-[45px]">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <span className="text-sm">Ahmed Moussa</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-indigo-600"
              >
                Follow
              </Button>
              <Button size="sm" variant="outline">
                dismiss
              </Button>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col pt-[10px] rounded-md shadow-right mb-5 bg-white"
          id="item"
        >
          <span className="text-sm text-slate-500 mx-5 mb-3 select-none">
            Latest Activities
          </span>
          <div className="flex justify-between mb-[20px] mx-5 gap-[20px]">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <p className="gap-2 flex text-sm">
                <span className="text-sm">Ahmed Moussa</span>changed their cover
                picture
              </p>
            </div>
            <span className="text-sm">1 min</span>
          </div>
          <div className="flex justify-between mb-[20px] mx-5">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <p className="gap-2 flex text-sm">
                <span className="text-sm">Ahmed Moussa</span>changed their cover
                picture
              </p>
            </div>
            <span className="text-sm">1 min</span>
          </div>
          <div className="flex justify-between mb-[20px] mx-5">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <p className="gap-2 flex text-sm">
                <span className="text-sm">Ahmed Moussa</span>changed their cover
                picture
              </p>
            </div>
            <span className="text-sm">1 min</span>
          </div>
        </div>

        <div
          className="flex flex-col pt-[10px] rounded-md shadow-right mb-5 bg-white"
          id="item"
        >
          <span className="text-sm text-slate-500 mx-5 mb-3 select-none">
            Online Friends
          </span>
          <div className="flex justify-between mb-[20px] mx-5 gap-[20px] relative">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />

              <div className="w-[11px] h-[11px] rounded-full bg-green-500 absolute top-0 left-[26px]" />

              <span className="text-sm">Ahmed Moussa</span>
            </div>
          </div>
          <div className="flex justify-between mb-[20px] mx-5 relative">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <div className="w-[11px] h-[11px] rounded-full bg-green-500 absolute top-0 left-[26px]" />

              <span className="text-sm">Ahmed Moussa</span>
            </div>
          </div>
          <div className="flex justify-between mb-[20px] mx-5 relative">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <div className="w-[11px] h-[11px] rounded-full bg-green-500 absolute top-0 left-[26px]" />
              <span className="text-sm">Ahmed Moussa</span>
            </div>
          </div>
          <div className="flex justify-between mb-[20px] mx-5 relative">
            <div className=" flex gap-3 items-center">
              <img
                src="/src/assets/Ahmed-Moussa.png"
                alt=""
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <div className="w-[11px] h-[11px] rounded-full bg-green-500 absolute top-0 left-[26px]" />
              <span className="text-sm">Ahmed Moussa</span>
            </div>
          </div>
        </div>
        <div className="p-1" />
      </div>
    </div>
  );
};

export default RightBar;
