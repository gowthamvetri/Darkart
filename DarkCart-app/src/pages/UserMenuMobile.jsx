import React, { useState } from 'react'
import UserMenue from '../components/UserMenue'
import { IoClose } from "react-icons/io5";

function UserMenuMobile() {

  const [openUserMenu,setOpenUserMenu] = useState()

  const handleClose = ()=>{
    setOpenUserMenu(false);
  }



  return (
     <section className='bg-white py-4 h-full w-full'>
      <div className='w-fit block ml-auto px-10 cursor-pointer'>
        <IoClose size={25} onClick={()=>window.history.back()}/>
      </div>
      <div className='container mx-auto p-6'>
        <UserMenue close={handleClose}/>
      </div>
    </section>
  )
}

export default UserMenuMobile