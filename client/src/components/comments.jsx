import { AuthContext } from '@/context/authContext';
import React, { useContext } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';
import { PaperPlaneRight } from '@phosphor-icons/react/dist/ssr';
import { PaperPlaneTilt } from '@phosphor-icons/react';

const Comments = () => {

    const {currentUser} = useContext(AuthContext)
    //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className='comments '>
        <div className='flex items-center justify-center gap-5 my-5'>
        <img src={currentUser.profilePic} alt="" className='w-10 h-10 rounded-full object-cover' />
        <Input className="border rounded-md focus-visible:rounded-md h-10 flex-[5]" placeholder="write a comment" />
        <Button size="sm" className="mr-1  px-4" ><PaperPlaneTilt weight='bold' className='w-[17px] h-[17px]' /></Button>

        </div>
        {
            comments.map(comment =>(
                <div className='flex justify-between my-[30px] mx-0 gap-5'>
                    <img src={comment.profilePicture} alt="" className='w-10 h-10 rounded-full object-cover' />
                    <div className=' flex-[5] flex flex-col gap-[3px]'>
                        <span>{comment.name}</span>
                        <p className='text-sm'>{comment.desc}</p>
                    </div>
                    <div className='flex-[1] text-xs self-center text-slate-500'>1 hour ago</div>
                </div>
            ))
        }

    </div>
  )
}

export default Comments