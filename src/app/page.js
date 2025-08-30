"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
// import Particles from "react-tsparticles";
import Navbar from "@/components/Navbar";
import PasswordModal from "@/components/PasswordModal";

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
  const [passwordModal, setPasswordModal] = useState(false);
  const [linkId, setLinkId] = useState(null);

  const SEARCH_LIMIT = 10;

  const router = useRouter();

  const onTimClick = (id) => {
    router.push("/tim/" + id);
  };

  const onEditLinkClick = (id) => {
    router.push("/edit/" + id);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchPage(1);
    // setHasMore(true);
  };

  const onHapusClick = async (id) => {
    setLinkId(id);
    setPasswordModal(true);
  };

  const onClose = () => {
    setPasswordModal(false);
  };

  const onSuccess = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/delete/link?id=${linkId}`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();
    // console.log(result);
    window.location.reload();
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

  useEffect(() => { 
    setPasswordModal(false);
  }, [edit]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get/link_umum`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();
        console.log(json.data);

        // console.log("Filtered Tim:", json.data.filter((item) => item.tim.nama.toLowerCase() === "semua"));

        setLink(json.data);
      } catch (err) {
        // fetchData();
      } finally {
        setLoading(false);
      }
    };
    const fetchDataTim = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get/tim`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();
        console.log(json.data);

        // console.log("Filtered Tim:", json.data.filter((item) => item.tim.nama.toLowerCase() === "semua"));

        setTim(json.data);
      } catch (err) {
        // fetchData();
      } finally {
        setLoading(false);
      }
    };
    fetchDataTim();
    fetchData();
  }, []);

  return (
    <>
      <PasswordModal isOpen={passwordModal} onClose={onClose} onSuccess={onSuccess}/>
      <div className="fixed -top-36 -right-72 sm:-right-64 lg:-right-40 w-96 h-96 bg-[#5ECFFF] opacity-70 rounded-full"></div>
      <div className="fixed -bottom-36 -left-72 sm:-left-64 lg:-left-40 w-96 h-96 bg-[#FF8CC7] opacity-70 rounded-full"></div>
      <Navbar edit={edit} setEdit={setEdit} showTim={showTim} setShowTim={setShowTim}/>
      <div className="text-black bg-gray-200  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="w-full font-semibold text-3xl md:mt-10 mb-10 text-center relative">
          Rumah Link BPS Majene
        </h1>

        {loading ? (
          <div className="col-span-6 flex justify-center items-center w-full h-40">
            {/* tambahkan skeleton kalo bisa */}
            <Loading w={10} h={10} />
          </div>
        ) : (
          <div className="mb-10 justify-center items-center lg:flex grid sm:grid-cols-3 grid-cols-2 gap-2">
            {Array.isArray(link) &&
              link
                .filter((item) => item.tim.nama.toLowerCase() === "semua")
                .map((link, idx) => (
                  <div key={idx} className="">
                    <a
                      // key={idx}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full min-w-36 max-w-72 hover:animate-none ${
                        edit ? "animate-pulse" : ""
                      }`}
                      onClick={edit ? (e) => e.preventDefault() : undefined}
                    >
                      <div
                        className={`link-satuan cursor-pointer ${
                          edit
                            ? ""
                            : "flex hover:scale-105 hover:border-0 hover:-translate-y-2"
                        }  relative overflow-hidden w-full bg-[#f79039] border-4 group border-[#e8cab2]  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24`}
                      >
                        <p className="transition-all duration-500 font-semibold text-lg">
                          {link.detail}
                        </p>
                        <div
                          className={`${
                            edit ? "block" : "hidden"
                          } rounded-lg w-full min-h-6 grid grid-cols-2 font-normal gap-2 bg-white px-2`}
                        >
                          <div
                            className="text-center cursor-pointer hover:bg-gray-200 px-1"
                            onClick={onEditLinkClick.bind(this, link.id)}
                          >
                            Edit
                          </div>
                          <div
                            className="text-center cursor-pointer hover:bg-red-500 hover:text-white px-1"
                            onClick={onHapusClick.bind(this, link.id)}
                          >
                            Hapus
                          </div>
                        </div>
                        <div
                          className={`bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full ${
                            edit ? "hidden" : ""
                          }`}
                        >
                          <span className="material-symbols-outlined">
                            arrow_upward
                          </span>
                        </div>
                      </div>
                    </a>
                    {/* ))} */}
                  </div>
                ))}
          </div>
        )}

        {loading ? (
          <></>
        ) : (
          <>
            <div className="w-full flex justify-center items-center relative">
              <input
                type="text"
                placeholder="Cari link..."
                className={`w-full max-w-md px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f79039] transition-all duration-300 ${
                  onFocusSearch ? "ring-2 ring-[#f79039] scale-110" : ""
                }`}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setOnFocusSearch(true)}
                onBlur={() => {
                  setTimeout(() => setOnFocusSearch(false), 200); // delay agar klik pada hasil bisa diproses
                }}
              ></input>
            </div>
            {loadingSearch ? (
              <div className="bg-white p-4 rounded-lg shadow-md mt-2 mb-8 absolute z-50">
                <Loading w={10} h={10} />
              </div>
            ) : (
              <>
                {searchQuery && onFocusSearch && searchQuery.trim() !== "" && (
                  <div className="bg-white p-4 rounded-lg shadow-md mt-2 mb-8 absolute z-50">
                    {filteredTim.length > 0 ? (
                      <>
                        {filteredTim.map((item, idx) => (
                          <div
                            key={idx}
                            className="text-center border-b-2 border-gray-100 py-1 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                          >
                            {
                              <a href={item.link} key={idx} target="_blank" className="">
                                <div>{item.detail}</div>
                                <div className="text-xs text-gray-500">
                                  Tim : {item.tim.nama}
                                </div>
                              </a>
                            }
                          </div>
                        ))}
                        {hasMore && (
                          <button
                            className="mt-2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition"
                            onClick={loadMoreResults}
                          >
                            Load More
                          </button>
                        )}
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

            <h1 className="w-full font-semibold text-xl text-center mt-10">
              Tim
            </h1>
            <div className="w-full px-1 md:grid md:grid-cols-6 gap-3">
              {Array.isArray(tim) &&
                tim
                  .filter((item) => item.nama.toLowerCase() !== "semua")
                  .map((tim, idx) => {
                    return (
                      <div className="w-full SECTION" key={idx}>
                        <div
                          onClick={() => onTimClick(tim.id)}
                          className="nama-tim text-center flex hover:scale-105 hover:border-0 cursor-pointer relative overflow-hidden justify-center w-full bg-sky-400 border-4 group border-sky-200  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24"
                        >
                          <p className=" transition-all duration-500 text-xl text-center">
                            {tim.nama}
                          </p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
