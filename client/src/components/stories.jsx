import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';
import React from 'react'
import { Button } from './ui/button';

const Stories = () => {

  const {currentUser} = useContext(AuthContext);


    //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Ahmed",
      img: "https://cdn.pixabay.com/photo/2020/02/11/10/24/sea-4839056_1280.jpg",
    },
    {
      id: 2,
      name: "Ahmed",
      img: "https://cdn.pixabay.com/photo/2016/10/26/22/02/dog-1772759_1280.jpg",
    },
    {
      id: 3,
      name: "Ahmed",
      img: "https://cdn.pixabay.com/photo/2024/04/25/06/50/banana-8719086_1280.jpg",
    },
  ];

  return (
    <div className='flex gap-[10px] h-[250px] mb-[30px]'>

       <div className="flex-[1] rounded-md overflow-hidden relative">
          <img className='w-[100%] h-[100%] object-cover' src={currentUser.profilePic} alt="" />
          <span className=' absolute bottom-[10px] left-[10px] text-white text-sm'>{currentUser.name}</span>
          <Button size="icon" className="absolute bottom-[40px] left-[10px] rounded-full bg-gradient-to-tl from-violet-600 to-indigo-600 border-none flex items-center justify-center"><span className='text-xl'>+</span></Button>
        </div>
        
        {stories.map(story=>(
        <div className="flex-[1] rounded-md overflow-hidden relative">
          <img className='w-[100%] h-[100%] object-cover' src={story.img} alt="" />
          <span className=' absolute bottom-[10px] left-[10px] text-white text-sm'>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories