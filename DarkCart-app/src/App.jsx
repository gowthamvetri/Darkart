  import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import FetchUserInfo from './utils/FetchUserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './store/userSlice';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state?.user)

  const fetchUser = async () => {
      const response = await FetchUserInfo();
      dispatch(setUserDetails(response.data));
  }
    useEffect(()=>{
      if(localStorage.getItem("accessToken")){
        fetchUser();
      }
  },[])

  return (
    <>
      <Header/>
      <main className='min-h-[78vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </>
  );
}
