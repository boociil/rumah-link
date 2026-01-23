"use client";

// import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, act } from "react";
import Image from "next/image";

export default function Navbar({ onSideBarClick, active }) {
  const router = useRouter();
  // const [showTim, setShowTim] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tim, setTim] = useState([]);
  // const [active, setActive] = useState("Beranda");
  const [hover, setHover] = useState("");
  // const [edit, setEdit] = useState(false);

  const onHomeClick = () => {
    router.push("/");
  };

  const onTambahClick = () => {
    router.push("/tambah");
  };

  const onTimClick = () => {
    setShowTim(!showTim);
  };

  const onTimClickDirect = (id) => {
    router.push("/tim/" + id);
  };

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
      <div className="bg-white side-bar ml-4 mb-4 rounded-4xl p-8">
        <Image
          src="/logo2.svg" // gambar disimpan di folder public/images
          alt="Logo"
          width={180}
          height={180}
        />
        <div className="menu mt-20  w-full flex flex-col gap-4 items-center font-archivo">
          <div 
            className={`${active === "Beranda" ? "bg-primary text-white" : "bg-white"} hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 w-full flex items-center gap-1 py-1 px-4 rounded-xl`}
            onMouseEnter={() => setHover("Beranda")}
            onMouseLeave={() => setHover("")}
            onClick={() => onSideBarClick("Beranda")}
          >
            <Image
              src={active === "Beranda" ? "/Beranda-white.svg": hover ==="Beranda" ? "/Beranda-white.svg" : "/Beranda.svg"} // gambar disimpan di folder public/images
              alt="beranda"
              width={18}
              height={18}
            />
            Beranda
          </div>
          <div 
            className={`${active === "Tim" ? "bg-primary text-white" : "bg-white"} hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 w-full flex items-center gap-1 py-1 px-4 rounded-xl`}
            onMouseEnter={() => setHover("Tim")}
            onMouseLeave={() => setHover("")}
            onClick={() => onSideBarClick("Tim")}
          >
            <Image
              src={active === "Tim" ? "/Tim-white.svg": hover ==="Tim" ? "/Tim-white.svg" : "/Tim.svg"}
              alt="beranda"
              width={18}
              height={18}
            />
            Tim
          </div>
          
          <div className={`${active === "Tim" ? "block" : "hidden"} `}>
            <div className="mt-1">
              Umum
            </div>
            <div className="mt-1">
              IPDS
            </div>
            <div className="mt-1">
              Produksi
            </div>
            <div className="mt-1">
              Distribusi
            </div>
            <div className="mt-1">
              Neraca
            </div>
            <div className="mt-1">
              Sosial
            </div>
          </div>
          <div 
            className={`${active === "Tambah" ? "bg-primary text-white" : "bg-white"} hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 w-full flex items-center gap-1 py-1 px-4 rounded-xl`}
            onMouseEnter={() => setHover("Tambah")}
            onMouseLeave={() => setHover("")}
            onClick={() => onSideBarClick("Tambah")}
          >
            <Image
              src={active === "Tambah" ? "/Tambah-white.svg": hover ==="Tambah" ? "/Tambah-white.svg" : "/Tambah.svg"} // gambar disimpan di folder public/images
              alt="beranda"
              width={16}
              height={16}
            />
            Tambah
          </div>
        </div>
      </div>
    </>
  );
}
