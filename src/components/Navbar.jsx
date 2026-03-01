"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function Navbar({ edit, setEdit, showTim, setShowTim }) {
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [filteredTim, setFilteredTim] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const SEARCH_LIMIT = 10;

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchPage(1);
    // setHasMore(true);
  };

  const loadMoreResults = async () => {
    const nextPage = searchPage + 1;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get/link?keyword=${searchQuery}&limit=${SEARCH_LIMIT}&page=${nextPage}`,
      {
        cache: "no-store",
      }
    );
    const result = await res.json();
    setFilteredTim((prev) => [...prev, ...result.data]);
    setSearchPage(nextPage);
    setHasMore(result.data.length === SEARCH_LIMIT);
  };

  useEffect(() => {
    setLoadingSearch(true);
    if (searchQuery.trim() === "") {
      setFilteredTim([]);
      setLoadingSearch(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoadingSearch(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get/link?keyword=${searchQuery}&limit=${SEARCH_LIMIT}&page=1`,
        {
          cache: "no-store",
        }
      );
      const result = await res.json();
      setFilteredTim(result.data);

      setHasMore(result.data.length === SEARCH_LIMIT);
      setLoadingSearch(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="top-0 flex bg-white md:px-6 px-4 py-4 opacity-100 fixed w-full text-black z-50">
      <Image
        src="/logo.png" // gambar disimpan di folder public/images
        alt="Logo"
        width={50}
        height={50}
      />
      {/* Search */}
      <div className="w-full flex justify-center items-center relative font-bebas-neue">
        <input
          type="text"
          placeholder="Search.."
          className={`w-full flex items-center max-w-md px-4 py-2 bg-background text-[#C3C3C3] rounded-4xl transition-all duration-300 focus:text-primary`}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setOnFocusSearch(true)}
          onBlur={() => {
            setTimeout(() => setOnFocusSearch(false), 200); // delay agar klik pada hasil bisa diproses
          }}
        ></input>
        {loadingSearch ? (
          <div className="bg-white p-4 rounded-lg shadow-md mt-2 mb-8 absolute top-12 z-50">
            <Loading w={10} h={10} />
          </div>
        ) : (
          <>
            {searchQuery && onFocusSearch && searchQuery.trim() !== "" && (
              <div className="bg-white p-4 rounded-lg shadow-md top-12 mb-8 absolute z-50">
                {filteredTim.length > 0 ? (
                  <>
                    {filteredTim.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-center border-b-2 border-gray-100 py-1 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                      >
                        {
                          <a
                            href={item.link}
                            key={idx}
                            target="_blank"
                            className=""
                          >
                            <div>{item.detail}</div>
                            <div className="text-xs text-gray-500">
                              Tim : {item.tim.nama}
                            </div>
                          </a>
                        }
                      </div>
                    ))}
                    {/* {hasMore && (
                      <button
                        className="mt-2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition"
                        onClick={loadMoreResults}
                      >
                        Load More
                      </button>
                    )} */}
                    <p className="text-gray-500 mt-1">
                      {" "}
                      Hasil pencarian ditemukan:{" "}
                      <span className="font-semibold">
                        {filteredTim.length}
                      </span>{" "}
                      tim
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">Tidak ada hasil ditemukan</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
