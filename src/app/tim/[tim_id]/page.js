"use client";

import { useEffect, useState } from "react";
import React from "react";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
// app/tim/[tim_id]/page.jsx

export default function TimDetail({ params }) {
  const { tim_id } = React.use(params);
  const [tim, setTim] = useState();
  const [link, setLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get/link_tim?id=${tim_id}`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();
        console.log(json);

        setLink(json.data);
        setTim(json.tim);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // panggil fungsi async
  }, []);

  return (
    <>
      <Navbar edit={edit} setEdit={setEdit} />
      <div className="text-black bg-gray-200  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* <Navbar/> */}
        {!loading && (
          <>
            {}
            <div className="text-center text-3xl md:mt-10 font-bold">
              {tim ? tim.nama : tim}
            </div>
          </>
        )}

        <div className="w-full px-1 gap-3 justify-items-center">
          {loading ? (
            <div className="p-4 rounded-lg mt-2 mb-8 absolute z-50 bg-white">
              <Loading w={10} h={10} />
            </div>
          ) : (
            <></>
          )}
          <div className="w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.isArray(link) &&
              link
                // .filter((item) => item.id == tim_id)
                .map((item, idx) => {
                  return (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full min-w-36 max-w-72 hover:animate-none ${
                        edit ? "animate-pulse grid grid-cols-2" : ""
                      }`}
                    >
                      <div className={"link-satuan cursor-pointer flex relative overflow-hidden w-full bg-emerald-400 border-4 group border-emerald-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24"}>
                        <p className="transition-all duration-500 font-normal text-md ">
                          {item.detail}
                        </p>
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
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}
