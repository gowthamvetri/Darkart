import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosTostError from "../utils/AxiosTostError";
import { Link, useNavigate } from "react-router-dom";
import FetchUserInfo from '../utils/FetchUserInfo'
import { useDispatch } from "react-redux"
import { setUserDetails } from '../store/userSlice'

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const checkAllFields = () => {
    if( userInfo.email === "" || userInfo.password === ""){
      return false;
    }
    return true;
    }


  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => { 
    e.preventDefault();

    try {
      const response = await Axios({
        url: SummaryApi.login.url,
        method: SummaryApi.login.method,
        data: userInfo,
      });


      if(response.data.error){
        toast.error(response.data.message);
      }

      if(response.data.success){
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await FetchUserInfo()
        dispatch(setUserDetails(userDetails.data))

        setUserInfo({
          email: "",
          password: ""
        });
        navigate("/");
      }

    } catch (error) {
      AxiosTostError(error);
    }
  }

  return (
    <section className="w-full container mx-auto p-2">
      <div className="bg-white my-3 w-full max-w-lg mx-auto p-8 rounded">
        Welcome to Login Page
        <form method="POST" action="" className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          
          <div className="grid gap-2">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              className="w-full bg-blue-50 p-2 border rounded border-gray-300 outline-none focus:border-yellow-500"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password:</label>
            <div className="w-full bg-blue-50 p-2 rounded border-gray-300 flex items-center focus-within:border-yellow-500 border-2">
              <input
                id="password"
                className="w-full outline-none"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

              <div
                onClick={handleShowPassword}
                className="text-2xl cursor-pointer"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <Link to={"/forget-password"} className="block ml-auto text-green-800 hover:text-yellow-500">Forget Password?</Link>
          </div>
          

          <button disabled={!checkAllFields()} className={`w-full ${ checkAllFields() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white px-4 py-3 rounded-sm cursor-pointer`}>
            Login
          </button>
        </form>

        <p className="text-center mt-4">Create an account? <Link className="text-green-700" to={"/register"}>Register</Link></p>
      </div>
    </section>
  );
}

export default Login;
