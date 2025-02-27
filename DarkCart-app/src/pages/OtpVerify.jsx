import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosTostError from "../utils/AxiosTostError";
import { Link, useLocation, useNavigate } from "react-router-dom";

function OtpVerify() {
  const [userInfo, setUserInfo] = useState(["","","","","",""]);
  const navigate = useNavigate();
  const Inpref = useRef([])
  const location = useLocation();

  const checkAllFields = () => {
    if (userInfo.every((data) => data === "")) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        url: SummaryApi.forgetPasswordVerify.url,
        method: SummaryApi.forgetPasswordVerify.method,
        data: {
            email : location?.state?.email,
            otp: userInfo.join("")
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setUserInfo(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  })

  return (
    <section className="w-full container mx-auto p-2">
      <div className="bg-white my-3 w-full max-w-lg mx-auto p-8 rounded">
        <form
          method="POST"
          action=""
          className="grid gap-4 mt-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
                {
                    userInfo.map((data, index) => (
                        <input
                        id="otp"
                        key={index}
                        ref={(ref)=>{
                            Inpref.current[index] = ref
                            return ref
                        }}
                        value={userInfo[index]}
                        maxLength={1}
                        onChange={(e) => {
                            const value = e.target.value;
                            const data = [...userInfo];
                            data[index] = value;
                            setUserInfo(data);

                            if(value && index < 5){
                                Inpref.current[index+1]?.focus()
                            }
                        }}
                        className="w-full max-w-16 bg-blue-50 p-2 border rounded border-gray-300 outline-none focus:border-yellow-500 text-center font-semibold"
                        type="text"
                      />
                    ))
                }
            </div>
          </div>

          <button
            disabled={!checkAllFields()}
            className={`w-full ${
              checkAllFields()
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500"
            } text-white px-4 py-3 rounded-sm cursor-pointer`}
          >
            Verify OTP
          </button>
        </form>

        <p className="text-center mt-4">
          Have an account?{" "}
          <Link className="text-green-700" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default OtpVerify;
