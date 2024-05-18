import {
  Delete,
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
import { makeRequest } from "@/axios";
import { useQuery, useQueryClient, useMutation  } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };


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
              <DropdownMenuItem><button onClick={handleDelete}><Delete weight="bold" className="w-5 h-5 mr-3" />delete</button></DropdownMenuItem>
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
            src={"./upload/"+post.img}
            alt=""
            className="w-full max-h-[500px] object-cover mt-5"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[10px] text-sm cursor-pointer">
            {isLoading ? "loading" : data.includes(currentUser.id) ? <Heart className=" fill-red-600" onClick={handleLike} /> : <Heart />}
            {data.length} Likes
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
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
