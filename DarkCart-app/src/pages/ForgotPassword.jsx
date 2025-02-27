import React, { useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosTostError from "../utils/AxiosTostError";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const checkAllFields = () => {
    if( userInfo.email === ""){
      return false;
    }
    return true;
    }


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
        url: SummaryApi.forgetPassword.url,
        method: SummaryApi.forgetPassword.method,
        data: userInfo,
      });


      if(response.data.error){
        toast.error(response.data.message);
      }

      if(response.data.success){
        toast.success(response.data.message);
        navigate("/otp-verification",{
          state :{
            email: userInfo.email
          }
        });
        setUserInfo({
          email: "",
        });
       
      }

    } catch (error) {
      AxiosTostError(error);
    }
  }

  return (
    <section className="w-full container mx-auto p-2">
      <div className="bg-white my-3 w-full max-w-lg mx-auto p-8 rounded">

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
          

          <button disabled={!checkAllFields()} className={`w-full ${ checkAllFields() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white px-4 py-3 rounded-sm cursor-pointer`}>
            Send OTP
          </button>
        </form>

        <p className="text-center mt-4">Have an account? <Link className="text-green-700" to={"/login"}>Login</Link></p>
      </div>
    </section>
  );
}

export default ForgotPassword;
