import {
  Heart,
  MessageSquareMore,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./comments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BookmarkSimple, LinkSimpleHorizontal, Warning } from "@phosphor-icons/react/dist/ssr";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  //TEMPORARY
  const liked = true;

  return (
    <div className=" rounded-md shadow-right">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <img
              src={post.profilePic}
              alt=""
              className=" w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <Link to={`/profile/${post.userId}`}>
                <span>{post.name}</span>
              </Link>
              <span className="text-xs">1 min ago</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className=" cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><LinkSimpleHorizontal weight="bold" className="w-5 h-5 mr-3" />Copy Link</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><BookmarkSimple weight="bold" className="w-5 h-5 mr-3" />Save Post</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Warning weight="bold" className="w-5 h-5 mr-3 text-red-500" />Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" my-5 mx-0">
          <p>{post.desc}</p>
          <img
            src={post.img}
            alt=""
            className="w-full max-h-[500px] object-cover mt-5"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[10px] text-sm cursor-pointer">
            {liked ? <Heart fill /> : <Heart />}
            10 Likes
          </div>
          <div
            className="flex items-center gap-[10px] text-sm cursor-pointer transition"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <MessageSquareMore />
            10 Comments
          </div>
          <div className="flex items-center gap-[10px] text-sm cursor-pointer">
            <Share2 />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
