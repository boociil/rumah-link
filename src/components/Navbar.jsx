// import React, { useState, useEffect } from "react";

// import { Cookies } from "react-cookie";
// import { useCookies } from "react-cookie";

// import ava from "../assets/img/picture1.jpeg";
export default function Navbar({ isLoginModal, setIsLoginModal }) {

  return (
    <main className="relative ">

      <nav className="flex justify-between px-8 items-center py-4">
        <div className="flex items-center gap-8 ">
          
        </div>
        {/* logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* <img src={Logo} alt="Logo" className="mx-auto h-10" />  */}
            Logo
        </div>
        {/* sidebar mobile menu */}
        <div
          className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transition-all z-50`}
        >
          <div className="text-black bg-white flex-col absolute left-0 top-0 h-screen px-4 gap-6 z-50 w-56 flex ">
            {/* logo */}
            <div className="flex justify-between items-center py-6">
              <div className="">
                {/* <img src={Logo} alt="Logo" className="mx-auto h-6" /> */}
              </div>

            </div>

          </div>
        </div>

        {/* last section */}
        <div className="flex items-center gap-4">
          {/* cart icon */}
          <div
            className="cursor-pointer group w-4 md:w-12 transition-all flex duration-500"
            // onClick={() => setDarkMode(!darkMode)}
          >

          </div>
=
        </div>
      </nav>
      <hr className=" " />
    </main>
  );
}