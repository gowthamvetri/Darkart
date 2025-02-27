import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosTostError from '../utils/AxiosTostError'

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
                navigate('/')
            }
        } catch (error) {
            AxiosTostError(error)       
        }
    }

  return (
    <div >
        <div className='text-md font-semibold'>
            My Account
        </div>
        <div className='text-sm mt-1'>
            {user ?. name || user ?. email}
        </div>

        <Divider/>

        <div className='text-sm grid gap-4'>
            <Link to="/" className='p-2'>My Order</Link>
            <Link to="/" className='p-2'>Save Address</Link>

            <button onClick={handleLogOut} className='text-red-500 text-left p-2 cursor-pointer'>
                Logout
            </button>
        </div>
    </div>
  )
}

export default UserMenue