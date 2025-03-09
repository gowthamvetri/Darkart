import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCartCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenue from "./UserMenue";

function Header() {
  const ismobile = useMobile();
  const location = useLocation();
  const isSearch = location.pathname === "/search";
  const navigate = useNavigate();
  const [showUserMenue, setShowUserMenue] = useState(false);

  const user = useSelector((state) => state?.user);

  // console.log(user);

  const handleUserMenu = () =>{
    setShowUserMenue(false)
  }

  const handleLoginNavigate = () => {
    if(!user?._id){
      navigate('/login')
      return
    }
    navigate('/user-menu-mobile')
  };

  return (
    <>
      <header className="h-30 lg:h-24 lg:shadow-md sticky top-0 flex items-center justify-center flex-col lg:flex-row p-4 bg-white ">
        {!(isSearch && ismobile) && (
          <div className="container mx-auto flex justify-between items-center h-full px-4">
            {/* Header */}
            <div className="h-full flex items-center">
              <Link to={"/"} className="h-full flex items-center">
                <img
                  src={logo}
                  width={80}
                  alt=""
                  className="hidden lg:block"
                />
                <img
                  src={logo}
                  width={120}
                  alt=""
                  className="lg:hidden"
                />
              </Link>
            </div>

            {/* Search bar */}
            <div className="hidden lg:block">
              <Search />
            </div>

            {/* Login/myCart */}
            <div className="flex gap-3">
              {/* Login  mobile icon*/}
              <button
                className="text-neutral-600 lg:hidden cursor-pointer"
                onClick={handleLoginNavigate}
              >
                <FaUserCircle size={30} />
              </button>
              {/* Login  desktop */}
              <div className="hidden lg:flex items-center gap-9">
                {(user?.name) ? (
                  <div className="relative">
                    <div className="flex items-center gap-2 cursor-pointer select-none" onClick={()=>(setShowUserMenue((prev)=>!prev))}>
                      <p >Account</p>
                      {showUserMenue ?<GoTriangleUp size={20}/>:<GoTriangleDown size={20} />}
                    </div>
                    {showUserMenue && <div className="absolute top-14 right-[-1rem] bg-white lg:shadow-md w-56 py-2 rounded-md">
                      <div className="p-4">
                        <UserMenue close={handleUserMenu}/>
                      </div>
                    </div>}
                  </div>
                ) : (
                  <button
                    onClick={handleLoginNavigate}
                    className="bg-green-800 hover:bg-green-700 text-white px-4 py-3 rounded-sm cursor-pointer"
                  >
                    <p className="font-medium">Login</p>
                  </button>
                )}
                <button>
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-3 py-3 rounded-sm"
                  >
                    <div className="animate-bounce">
                      <BsCartCheckFill size={25} />
                    </div>
                    <div>
                      <p className="font-medium">My Cart</p>
                    </div>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="lg:hidden  container mx-auto px-5">
          <Search />
        </div>
      </header>
    </>
  );
}

export default Header;
