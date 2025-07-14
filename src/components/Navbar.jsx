// import React, { useState, useEffect } from "react";
import { GoHome } from "react-icons/go";

// import { Cookies } from "react-cookie";
// import { useCookies } from "react-cookie";
// bg-[#f79039] border-4 group border-[#e8cab2]
// import ava from "../assets/img/picture1.jpeg";

export default function Navbar({ isLoginModal, setIsLoginModal }) {

  return (
    <div className="fixed bottom-10 text-black w-full">
      <div className="grid grid-cols-3 bg-gradient-to-tr from-[#f79003] to-[#e9bf84] shadow-lg px-2 py-1 mx-4 max-w-lg rounded-lg">
        <div className="home flex flex-col justify-center items-center">
          <GoHome className="text-2xl"/>
          <p className="text-xs text-gray-700">Home</p>
        </div>
        <div className="home flex justify-center items-center">
          <GoHome className="text-2xl"/>
        </div>
        <div className="home flex justify-center items-center">
          <GoHome className="text-2xl"/>
        </div>
      </div>
    </div>
  );
}