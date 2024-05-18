import Posts from "@/components/posts";
import { Button } from "@/components/ui/button";
import {
  DotsThreeVertical,
  Envelope,
  InstagramLogo,
  LinkedinLogo,
  MetaLogo,
  PinterestLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import { Earth, MapPinned } from "lucide-react";
import React from "react";
import { makeRequest } from "@/axios";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Update from "@/components/update";
const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <div className="images w-full h-[300px] relative pt-5 pl-3 pr-5 rounded-md">
            <img
              src={"/upload/" + data.coverPic}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
            <img
              src={"/upload/" + data.profilePic}
              alt=""
              className="w-[150px] h-[150px] rounded-full object-fill absolute left-0 right-0 mx-auto top-[200px]"
            />
          </div>
          <div className="py-5 pl-3 pr-5">
            <div className=" h-[180px] shadow-right rounded-md p-[50px] flex items-center justify-between mb-5">
              <div className="left flex flex-[1] gap-[10px]">
                <a href="http://facebook.com">
                  <MetaLogo className="w-6 h-6" weight="bold" />
                </a>
                <a href="http://facebook.com">
                  <InstagramLogo className="w-6 h-6" weight="bold" />
                </a>
                <a href="http://facebook.com">
                  <TwitterLogo className="w-6 h-6" weight="bold" />
                </a>
                <a href="http://facebook.com">
                  <LinkedinLogo className="w-6 h-6" weight="bold" />
                </a>
                <a href="http://facebook.com">
                  <PinterestLogo className="w-6 h-6" weight="bold" />
                </a>
              </div>
              <div className="flex-[1] flex flex-col items-center gap-[10px]">
                <span>{data.name}</span>
                <div className=" flex items-center justify-around w-full">
                  <div className=" flex items-center justify-center gap-[5px]">
                    <MapPinned className="w-[17px] h-[17px]" />
                    <span className="text-sm">{data.city}</span>
                  </div>
                  <div className=" flex items-center justify-center gap-[5px]">
                    <Earth className="w-4 h-4" />
                    <span className="text-sm">{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <Button className="px-6" size="sm">
                    Update
                  </Button>
                ) : (
                  <Button className="px-6" size="sm" onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </Button>
                )}
              </div>
              <div className="flex flex-[1] items-center justify-end gap-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                  color="#000000"
                  fill="none"
                >
                  <path
                    d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.01576 13.4756C2.08114 16.5411 2.11382 18.0739 3.24495 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.755 19.2093C21.8862 18.0739 21.9189 16.5411 21.9842 13.4756C22.0053 12.4899 22.0053 11.51 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.755 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08113 7.45882 2.01576 10.5243C1.99474 11.51 1.99474 12.4899 2.01576 13.4756Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                  color="#000000"
                  fill="none"
                >
                  <path
                    d="M11.992 12H12.001"
                    stroke="currentColor"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.9842 18H11.9932"
                    stroke="currentColor"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.9998 6H12.0088"
                    stroke="currentColor"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate}/>}
    </div>
  );
};

export default Profile;
