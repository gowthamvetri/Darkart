import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";

function Footer() {
  return (
    <footer className="border-t border-gray-300">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-3">
        <p> © All copyrights from 2024 </p>
        <div className="flex justify-center gap-5 text-3xl fon">
          <a href="" className="hover:text-yellow-500 ">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-yellow-500 ">
            <AiFillInstagram />
          </a>
          <a href="" className="hover:text-yellow-500 ">
            <IoLogoLinkedin />
          </a>
        </div>  
      </div>
    </footer>
  );
}

export default Footer;
