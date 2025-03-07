import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { use } from 'react';

function Profile() {
  const user = useSelector(state=>state.user)
  console.log(user)
  return (
    <div>
      <div className='w-20 h-20 bg-red-500 rounded-full flex justify-center items-center overflow-hidden'>
        {user.avatar ? 
        <img
        alt = {user.name}
        src={user.avatar}
        className='h-full w-full'
        /> : 
          <FaRegUserCircle size={80}/>
        }
      </div>
      <button className='mt-5 text-sm border border-yellow-300 px-3 py-1 min-w-[80px] rounded-full hover:border-yellow-400 hover:bg-yellow-400 cursor-pointer'>Edit </button>
    </div>
  )
}

export default Profile