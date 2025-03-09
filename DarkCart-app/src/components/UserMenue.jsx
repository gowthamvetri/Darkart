import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosTostError from '../utils/AxiosTostError'
import { FiExternalLink } from "react-icons/fi";

function UserMenue({close}) {
    const user = useSelector((state)=> state?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async()=>{
        try {
            const response = await Axios({...SummaryApi.userLogOut})
            
            if(response.data.success){
                if(close){
                    close()
                }
                toast.success("LogOut Successful")
                dispatch(logout())
                localStorage.clear()
                navigate("/")
            }
        } catch (error) {
            AxiosTostError(error)       
        }
    }

    
  const handleClose = () =>{
    if(close){
        close()
    }
  }

  return (
    <div >
        <div className='text-md font-semibold'>
            My Account
        </div>
        <div className='text-sm mt-1 flex gap-3'>
            <span className='max-w-52 text-ellipsis line-clamp-1'>{user ?. name || user ?. email}</span>
            <Link to={"/dashboard/profile"} onClick={handleClose}>
                <FiExternalLink size={15} className='font-extralight hover:text-yellow-400'/>
            </Link>
        </div>

        <Divider/>

        <div className='text-sm grid gap-4'>
            <Link onClick={handleClose} to="/dashboard/myorders" className='p-2 hover:bg-red-100'>My Order</Link>
            <Link onClick={handleClose} to="/dashboard/address" className='p-2 hover:bg-red-100'>Save Address</Link>

            <button onClick={handleLogOut} className='text-red-500 text-left p-2 cursor-pointer hover:bg-red-100'>
                Logout
            </button>
        </div>
    </div>
  )
}

export default UserMenue