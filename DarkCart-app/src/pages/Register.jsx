import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosTostError from "../utils/AxiosTostError";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const checkAllFields = () => {
    if(userInfo.name === "" || userInfo.email === "" || userInfo.password === "" || userInfo.confirmPassword === ""){
      return false;
    }
    return true;
    }


  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
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
    
    if(userInfo.password !== userInfo.confirmPassword){
      toast.error("Password and Confirm Password should be same");
      return;
    }

    try {
      const response = await Axios({
        url: SummaryApi.register.url,
        method: SummaryApi.register.method,
        data: userInfo,
      });

      console.log(response.data);

      if(response.data.error){
        toast.error(response.data.message);
      }

      if(response.data.success){
        toast.success(response.data.message);
        setUserInfo({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }

    } catch (error) {
      AxiosTostError(error);
    }
  }

  return (
    <section className="w-full container mx-auto p-2">
      <div className="bg-white my-3 w-full max-w-lg mx-auto p-8 rounded">
        Welcome to Register Page
        <form method="POST" action="" className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="name">Name:</label>
            <input
              autoFocus
              id="name"
              className="w-full bg-blue-50 p-2 border rounded border-gray-300 outline-none focus:border-yellow-500"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
            />
          </div>
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
          </div>
          <div className="grid gap-2">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="w-full bg-blue-50 p-2 rounded border-gray-300 flex items-center focus-within:border-yellow-500 border-2">
              <input
                id="confirmPassword"
                className="w-full  outline-none"
                name="confirmPassword"
                value={userInfo.confirmPassword}
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
              />
              <div>
                <div
                  onClick={handleShowConfirmPassword}
                  className="text-2xl cursor-pointer"
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </div>
          </div>

          <button disabled={!checkAllFields()} className={`w-full ${ checkAllFields() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white px-4 py-3 rounded-sm cursor-pointer`}>
            Register
          </button>
        </form>

        <p className="text-center mt-4">Already have an account? <Link className="text-green-700" to={"/login"}>Login</Link></p>
      </div>
    </section>
  );
}

export default Register;
