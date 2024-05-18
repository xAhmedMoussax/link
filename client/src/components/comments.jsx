import { AuthContext } from '@/context/authContext';
import React, { useContext } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';
import { PaperPlaneRight } from '@phosphor-icons/react/dist/ssr';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import { makeRequest } from '@/axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import moment from "moment";
    

    const Comments = ({ postId }) => {
      const [desc, setDesc] = useState("");
      const { currentUser } = useContext(AuthContext);
    
      const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?postId=" + postId).then((res) => {
          return res.data;
        })
      );
    
      const queryClient = useQueryClient();
    
      const mutation = useMutation(
        (newComment) => {
          return makeRequest.post("/comments", newComment);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["comments"]);
          },
        }
      );
    
      const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
      };

 
  return (
    <div className='comments '>
        <div className='flex items-center justify-center gap-5 my-5'>
        <img src={currentUser.profilePic} alt="" className='w-10 h-10 rounded-full object-cover' />
        <Input className="border rounded-md focus-visible:rounded-md h-10 flex-[5]" placeholder="write a comment"  onChange={(e) => setDesc(e.target.value)} value={desc}  />
        <Button size="sm" className="mr-1  px-4" onClick={handleClick} ><PaperPlaneTilt weight='bold' className='w-[17px] h-[17px]' /></Button>

        </div>
        {
            isLoading ? "loading" : data.map(comment =>(
                <div className='flex justify-between my-[30px] mx-0 gap-5'>
                    <img src={comment.profilePic} alt="" className='w-10 h-10 rounded-full object-cover' />
                    <div className=' flex-[5] flex flex-col gap-[3px]'>
                        <span>{comment.name}</span>
                        <p className='text-sm'>{comment.desc}</p>
                    </div>
                    <div className='flex-[1] text-xs self-center text-slate-500'>{moment(comment.createdAt).fromNow()}</div>
                </div>
            ))
        }

    </div>
  )
}

export default Comments