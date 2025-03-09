import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import SummaryApi from "../common/SummaryApi";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import AxiosTostError from "../utils/AxiosTostError";
import toast from "react-hot-toast";
import FetchUserInfo from "../utils/FetchUserInfo";
import { setUserDetails } from "../store/userSlice";

function Profile() {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios(
        {
          ...SummaryApi.UpdateUser,
          data:userData
        }
      )
      
      const {data:responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        const response = await FetchUserInfo();
        dispatch(setUserDetails(response.data));
      }
    } catch (error) {
      AxiosTostError(error)
    }
    finally{
      setLoading(false)
    }

  };
  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);
  return (
    <div>
      <div className="w-20 h-20 bg-red-500 rounded-full flex justify-center items-center overflow-hidden">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="h-full w-full" />
        ) : (
          <FaRegUserCircle size={80} />
        )}
      </div>
      <button
        onClick={() => {
          setProfileAvatarEdit(true);
        }}
        className="mt-5 text-sm border border-yellow-300 px-3 py-1 min-w-[80px] rounded-full hover:border-yellow-400 hover:bg-yellow-400 cursor-pointer"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}

      {/* User info upload and display */}
      <form className="my-4 grid gap-5" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            className="bg-blue-50 p-2 outline-none border-2 border-blue-50 focus-within:border-yellow-400 rounded"
            name="name"
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            className="bg-blue-50 p-2 outline-none border-2 border-blue-50 focus-within:border-yellow-400 rounded"
            name="email"
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Phone Number</label>
          <input
            id="mobile"
            type="text"
            placeholder="Enter Your Phone Number"
            className="bg-blue-50 p-2 outline-none border-2 border-blue-50 focus-within:border-yellow-400 rounded"
            name="mobile"
            value={userData.mobile}
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="border p-2 border-yellow-300 font-semibold  hover:bg-yellow-400 cursor-pointer hover:text-white text-yellow-400 rounded">
          {
            loading?"Loading....":"Submit"
          }
        </button>
      </form>
    </div>
  );
}

export default Profile;
