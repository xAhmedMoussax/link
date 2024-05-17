import Posts from '@/components/posts'
import Stories from '@/components/stories'
import React from 'react'

export const Home = () => {
  return (
    <>
    <div className='py-7 pl-3 pr-5'>
      <Stories />
      <Posts />
    </div>
    </>
  )
}
