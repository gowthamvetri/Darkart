import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosTostError from "../utils/AxiosTostError";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAllFields = () => {
    if( userInfo.email === "" || userInfo.password === ""){
      return false;
    }
    return true;
    }


  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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
    console.log(userInfo);
    try {
      const response = await Axios({
        url: SummaryApi.resetPassword.url,
        method: SummaryApi.resetPassword.method,
        data: userInfo,
      });


      if(response.data.error){
        toast.error(response.data.message);
      }

      if(response.data.success){
        toast.success(response.data.message);
        setUserInfo({
          email: "",
          newPassword: "",
          confirmPassword: ""
        });
        navigate("/login");
      }

    } catch (error) {
      AxiosTostError(error);
    }
  }

  useEffect(() => {
    console.log(location?.state?.email);

    if (!(location?.state?.email)) {
      navigate("/forgot-password");
    }

    if(location?.state?.email){
        setUserInfo((prev) => {
            return {
            ...prev,
            email: location?.state?.email
            }
        });
    }
  },[])


  return (
    <section className="w-full container mx-auto p-2">
      <div className="bg-white my-3 w-full max-w-lg mx-auto p-8 rounded">
        Reset Your Password
        <form method="POST" action="" className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="password">Password:</label>
            <div className="w-full bg-blue-50 p-2 rounded border-gray-300 flex items-center focus-within:border-yellow-500 border-2">
              <input
                id="password"
                className="w-full outline-none"
                name="newPassword"
                value={userInfo.newPassword}
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
          </div>

          <div className="grid gap-2">
            <label htmlFor="password">Confirm Password:</label>
            <div className="w-full bg-blue-50 p-2 rounded border-gray-300 flex items-center focus-within:border-yellow-500 border-2">
              <input
                id="confirmPassword"
                className="w-full outline-none"
                name="confirmPassword"
                value={userInfo.confirmPassword}
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

              <div
                onClick={handleConfirmPassword}
                className="text-2xl cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>
          

          <button disabled={!checkAllFields()} className={`w-full ${ checkAllFields() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white px-4 py-3 rounded-sm cursor-pointer mt-2`}>
            Confirm Password
          </button>
        </form>

        <p className="text-center mt-4">Create an account? <Link className="text-green-700" to={"/register"}>Register</Link></p>
      </div>
    </section>
  );
}

export default ResetPassword;
