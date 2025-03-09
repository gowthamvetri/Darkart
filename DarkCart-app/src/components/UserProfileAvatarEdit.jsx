import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi";
import AxiosTostError from "../utils/AxiosTostError.js";
import { updateAvatar } from "../store/userSlice.js";
import { IoClose } from "react-icons/io5";

function UserProfileAvatarEdit({close}) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];

    if(!file){
      return
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const {data : responseData} = response
      dispatch(updateAvatar(responseData.data.avatar))
    } catch (error) {
      AxiosTostError(error);
    }
    finally{
      setLoading(false)
      console.log(response);
    }
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 opacity-70 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col justify-center items-center gap-3">
        {/* Profile upload and display */}
        <button className="ml-auto cursor-pointer" onClick={close} ><IoClose size={20}/></button>

        <div className="w-20 h-20 bg-red-500 rounded-full flex justify-center items-center overflow-hidden">
          {user.avatar ? (
            <img alt={user.name} src={user.avatar} className="h-full w-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadAvatar">
            <div className="border px-3 py-1 rounded-lg border-yellow-400 hover:bg-yellow-300 cursor-pointer">
              {loading ? "Loading...." : "Upload"}
            </div>
          </label>
          <input
            type="file"
            id="uploadAvatar"
            className="hidden"
            onChange={handleUploadAvatar}
          />
        </form>

      </div>
    </section>
  );
}

export default UserProfileAvatarEdit;
