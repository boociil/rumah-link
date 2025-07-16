"use client";

import { useEffect, useState } from "react";
import React from "react";
import Navbar from "@/components/Navbar";
// app/tim/[tim_id]/page.jsx

export default function TimDetail({ params }) {
  const { tim_id } = React.use(params);
  const [tim, setTim] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get/link`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();
        console.log(json.data);

        setTim(json.data);
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
      <Navbar />
      <div className="text-black bg-gray-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* <Navbar/> */}
        <div className="w-full px-1 gap-3">
            {Array.isArray(tim) &&
              tim
                .filter((item) => item.id == tim_id)
                .map((tim, idx) => {
                  return (
                    <div className="w-full flex justify-center flex-col items-center SECTION" key={idx}>
                      <div className="nama-tim flex relative max-w-sm overflow-hidden justify-center w-full bg-sky-400 border-4 group border-sky-200  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                        <p className=" transition-all duration-500 text-xl">
                          {tim.nama}
                        </p>
                      </div>
                      <div className="link">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                          {Array.isArray(tim.links) &&
                            tim.links.length > 0 &&
                            tim.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                              >
                                <div className="link-satuan cursor-pointer flex relative overflow-hidden w-full bg-emerald-400 border-4 group border-emerald-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                                  <p className="transition-all duration-500 font-normal text-md ">
                                    {link.detail}
                                  </p>
                                  <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                                    <span className="material-symbols-outlined">
                                      arrow_upward
                                    </span>
                                  </div>
                                </div>
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
      </div>
    </>
  );
}
