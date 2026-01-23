"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Beranda from "@/components/Beranda";
import Tim from "@/components/Tim";
import Tambah from "@/components/Tambah";

export default function Home() {
  const [tim, setTim] = useState([]);
  const [showTim, setShowTim] = useState(false);
  const [link, setLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTim, setFilteredTim] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [edit, setEdit] = useState(false);
  
  const [active, setActive] = useState("Beranda");

  const SEARCH_LIMIT = 10;

  const router = useRouter();

  // useEffect(() => {
  //   // Cek cookie is_login di client
  //   if (typeof document !== "undefined") {
  //     const cookies = document.cookie.split(";").map((c) => c.trim());
  //     const isLogin = cookies.find((c) => c.startsWith("is_login="));
  //     if (!isLogin) {
  //       router.replace("/password");
  //     }
  //   }
  // }, []);

  // const hapusCookie = () => {
  //   document.cookie =
  //     "is_login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //   window.location.reload();
  // };

  const onSideBarClick = (menu) => {
    setActive(menu);
  };

  const onTimClick = (id) => {
    router.push("/tim/" + id);
  };



  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchPage(1);
    // setHasMore(true);
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


  return (
    <>
      
      {/* Navbar Old */}
      <Navbar
        // edit={edit}
        // setEdit={setEdit}
        // showTim={showTim}
        // setShowTim={setShowTim}
      />

      <div className="text-black bg-background flex min-h-screen gap-8 pt-[88px] ">


        <Sidebar
          onSideBarClick={onSideBarClick}
          active={active}
        />

        <div className="content w-full mr-4 mb-4 rounded-4xl">
          {
            active === "Beranda" ? <Beranda /> :
            active === "Tim" ? <Tim onTimClick={onTimClick} /> :
            active === "Tambah" ? <Tambah /> :
            <Beranda />
          }
        </div>
      </div>
    </>
  );
}
