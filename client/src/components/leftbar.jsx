import { AuthContext } from "@/context/authContext";
import {
  CalendarDays,
  Clapperboard,
  Clock,
  Gamepad2,
  GraduationCap,
  Group,
  Images,
  Mail,
  Play,
  Store,
  Tv2,
  Users,
  UsersRound,
} from "lucide-react";
import React from "react";
import { useContext } from "react";

const LeftBar = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <>
      <div
        id="scrollbar"
        className="py-7 px-6 flex-[2] sticky top-[70px] h-[calc(100vh-70px)] overflow-scroll"
      >
        <div>
          <div className="flex flex-col">
            <ul className=" flex flex-col gap-3">
              <li className=" cursor-pointer">
                <div className="flex items-center gap-3">
                  <img
                    className="w-[35px] h-[35px] rounded-full object-cover"
                    src={currentUser.profilePic}
                    alt=""
                  />
                  <span className="text-sm">{currentUser.name}</span>
                </div>
              </li>

              <li className=" cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Users />
                  <span className="text-sm">Friends</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Group />
                  <span className="text-sm">Group</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Store />
                  <span className="text-sm">MarketPlace</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Tv2 />
                  <span className="text-sm">Watch</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Clock />
                  <span className="text-sm">Memories</span>
                </div>
              </li>
            </ul>
            <hr className="mt-3 mb-2" />
            <ul className="flex flex-col gap-3">
              <span className="text-sm px-1 text-slate-500 select-none">
                Your Shortcuts
              </span>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <CalendarDays />
                  <span className="text-sm">Events</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Gamepad2 />
                  <span className="text-sm">Gaming</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Images />
                  <span className="text-sm">Gallary</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Clapperboard />
                  <span className="text-sm">Videos</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Mail />
                  <span className="text-sm">Messages</span>
                </div>
              </li>
            </ul>
            <hr className="mt-3 mb-2" />
            <ul className="flex flex-col gap-3">
              <span className="text-sm px-1 text-slate-500 select-none">Other</span>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <GraduationCap />
                  <span className="text-sm">Courses</span>
                </div>
              </li>
              <li className="cursor-pointer">
                <div className="flex items-center gap-3 px-1">
                  <Play />
                  <span className="text-sm">Tutorials</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
