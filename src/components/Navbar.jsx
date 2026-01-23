"use client";


import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar({ edit, setEdit, showTim, setShowTim }) {
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchPage(1);
    // setHasMore(true);
  };

  return (
    <div className="top-0 flex bg-white px-6 py-4 opacity-100 fixed w-full text-black">
      <Image
        src="/logo.png" // gambar disimpan di folder public/images
        alt="Logo"
        width={65}
        height={65}
      />
      {/* Search */}
      <div className="w-full flex justify-center items-center relative font-bebas-neue">
        <input
          type="text"
          placeholder="Search.."
          className={`w-full flex items-center max-w-md px-4 py-2 bg-background text-[#C3C3C3] rounded-4xl transition-all duration-300 `}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setOnFocusSearch(true)}
          onBlur={() => {
            setTimeout(() => setOnFocusSearch(false), 200); // delay agar klik pada hasil bisa diproses
          }}
        ></input>
      </div>
      
    </div>
  );
}
