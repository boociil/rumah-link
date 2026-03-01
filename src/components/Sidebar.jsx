"use client";

// import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, act } from "react";

import Image from "next/image";

export default function Navbar({
  onSideBarClick,
  active,
  onTimClick,
  timActive,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tim, setTim] = useState([]);
  const [hover, setHover] = useState("");
  const [show, setShow] = useState(false);



  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get/tim`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();
        const tim = json.data.filter((item) => item.nama !== "semua");
        setTim(tim);
        // console.log(tim);

        setTim(json.data);
      } catch (err) {
        // fetchData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Sidebar jika dibuka untuk laptop or tab */}
      <div className="bg-white hidden md:block side-bar ml-4 mb-4 rounded-4xl p-8">
        <Image
          src="/logo2.svg" // gambar disimpan di folder public/images
          alt="Logo"
          width={180}
          height={180}
        />
        <div className="menu mt-20  w-full flex flex-col gap-4 items-center font-archivo">
          <div
            className={`${
              active === "Beranda" ? "bg-primary text-white" : "bg-white"
            } hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 w-full flex items-center gap-1 py-1 px-4 rounded-xl`}
            onMouseEnter={() => setHover("Beranda")}
            onMouseLeave={() => setHover("")}
            onClick={() => onSideBarClick("Beranda")}
          >
            <Image
              src={
                active === "Beranda"
                  ? "/Beranda-white.svg"
                  : hover === "Beranda"
                  ? "/Beranda-white.svg"
                  : "/Beranda.svg"
              } // gambar disimpan di folder public/images
              alt="beranda"
              width={18}
              height={18}
            />
            Beranda
          </div>
          <div
            className={`${
              active === "Tim" ? "bg-primary text-white" : "bg-white"
            } hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 w-full flex items-center gap-1 py-1 px-4 rounded-xl`}
            onMouseEnter={() => setHover("Tim")}
            onMouseLeave={() => setHover("")}
            onClick={() => {
              onSideBarClick("Tim");
              if (active !== "Tim") onTimClick(0);
            }}
          >
            <Image
              src={
                active === "Tim"
                  ? "/Tim-white.svg"
                  : hover === "Tim"
                  ? "/Tim-white.svg"
                  : "/Tim.svg"
              }
              alt="beranda"
              width={18}
              height={18}
            />
            Tim
          </div>

          <div className={`${active === "Tim" ? "block" : "hidden"} `}>
            {!loading &&
              tim
                .filter((item) => item.nama !== "Semua")
                .map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      timActive === item.id ? "bg-primary text-white" : ""
                    } mt-1 cursor-pointer hover:bg-primary hover:text-white px-2 py-1 rounded-lg transition-all duration-300 ml-3`}
                    onClick={() => onTimClick(item.id)}
                  >
                    {item.nama}
                  </div>
                ))}
          </div>
          <div
            className={`${
              active === "Tambah" ? "bg-primary text-white" : "bg-white"
            } hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 w-full flex items-center gap-1 py-1 px-4 rounded-xl`}
            onMouseEnter={() => setHover("Tambah")}
            onMouseLeave={() => setHover("")}
            onClick={() => onSideBarClick("Tambah")}
          >
            <Image
              src={
                active === "Tambah"
                  ? "/Tambah-white.svg"
                  : hover === "Tambah"
                  ? "/Tambah-white.svg"
                  : "/Tambah.svg"
              } // gambar disimpan di folder public/images
              alt="beranda"
              width={16}
              height={16}
            />
            Tambah
          </div>
        </div>
      </div>

      {/* Sidebar jika dibuka untuk mobile */}
      <div className="bg-white md:hidden shadow-md side-bar-mobile fixed bottom-0 w-full px-6 py-2 flex justify-between items-center text-black font-archivo z-50">
        <div
          className={`flex flex-col items-center p-2 rounded-2xl ${
            active === "Beranda" ? "font-semibold bg-primary text-white" : ""
          }`}
          onClick={() => {
            onSideBarClick("Beranda");
            onTimClick(0);
          }}
        >
          <Image
            src={active === "Beranda" ? "/Beranda-white.svg" : "/Beranda.svg"} // gambar disimpan di folder public/images
            alt="beranda"
            width={18}
            height={18}
          />
          <span className="text-xs">Beranda</span>
        </div>


        <div
          className={`flex flex-col items-center p-2 rounded-2xl ${
            active === "Tim" ? "font-semibold bg-primary text-white" : ""
          }`}
          onClick={() => {
            onSideBarClick("Tim");
            !tim ? onTimClick(0) : null;
            setShow(!show);
          }}
        >
          <Image
            src={active === "Tim" ? "/Tim-white.svg" : "/Tim.svg"} // gambar disimpan di folder public/images
            alt="beranda"
            width={18}
            height={18}
          />
          <span className="text-xs">
            {
              active === "Tim" && timActive !== 0
                ? tim.find((item) => item.id === timActive)?.nama
                : "Tim"
            }
          </span>
        </div>
        <div
          className={`flex flex-col items-center p-2 rounded-2xl ${
            active === "Tambah" ? "font-semibold bg-primary text-white" : ""
          }`}
          onClick={() => {
            onSideBarClick("Tambah");
            onTimClick(0);
          }}
        >
          <Image
            src={active === "Tambah" ? "/Tambah-white.svg" : "/Tambah.svg"} // gambar disimpan di folder public/images
            alt="beranda"
            width={16}
            height={16}
          />
          <span className="text-xs">Tambah</span>
        </div>
      </div>
      {/* <div className={`${(active === "Tim" && timActive === 0) ? "block" : "hidden"} md:hidden shadow-lg fixed bottom-16 left-1/2 py-3 -translate-x-1/2 z-50 bg-white rounded-xl `}> */}
      <div className={`${show ? "block" : "hidden"} md:hidden shadow-lg fixed bottom-16 left-1/2 py-3 -translate-x-1/2 z-50 bg-white rounded-xl `}>
          {!loading &&
            tim
              .filter((item) => item.nama !== "Semua")
              .map((item) => (
                <div
                  key={item.id}
                  className={`${
                    timActive === item.id ? "bg-primary text-white" : ""
                  } mt-1 cursor-pointer hover:bg-primary hover:text-white px-2 py-1 transition-all duration-300`}
                  onClick={() => {
                    onTimClick(item.id);
                    setShow(false);
                  }}
                >
                  {item.nama}
                </div>
              ))}
        </div>
    </>
  );
}
