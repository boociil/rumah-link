// import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export default async function Home() {

  let tim = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get/link`, {
      cache: "no-store",
    });

    const json = await res.json();
    tim = json.data ?? []; // fallback kosong jika json.data undefined
    console.log(tim);
    
  } catch (err) {
    console.error("Gagal fetch data:", err);
    tim = [];
  }

  return (
    <div className="text-black bg-gray-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Navbar/> */}

      <h1 className="w-full font-semibold text-3xl mb-10 text-center">
        Rumah Link Majene
      </h1>

      <div className="mb-10 flex justify-center items-center">
        {Array.isArray(tim) &&
          tim
            .filter((item) => item.nama.toLowerCase() === "semua")
            .map((tim, idx) => (
              <div key={idx} className="flex justify-center items-center gap-2">
                {Array.isArray(tim.links) &&
                  tim.links.length > 0 &&
                  tim.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full min-w-36 max-w-72"
                    >
                      <div className="link-satuan cursor-pointer flex relative overflow-hidden w-full bg-green-500 border-4 group border-green-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                        <p className="transition-all duration-500 font-semibold text-lg">
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
            ))}
      </div>

      <h1 className="w-full font-semibold text-xl text-center">Per Tim</h1>

      <div className="w-full px-1 md:flex gap-3">
        {tim
          .filter((item) => item.nama.toLowerCase() !== "semua")
          .map((tim, idx) => {
            return (
              <div className="w-full SECTION" key={idx}>
                <div className="nama-tim flex relative overflow-hidden justify-center w-full bg-sky-400 border-4 group border-sky-200  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                  <p className=" transition-all duration-500 text-xl">
                    {tim.nama}
                  </p>
                </div>
                <div className="link">
                  <div className="grid grid-cols-2 gap-1">
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

        {/* <div className="w-full SECTION">
          <div className="nama-tim flex relative overflow-hidden justify-center w-full bg-sky-400 border-4 group border-sky-200  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
            <p className=" transition-all duration-500 text-xl">Umum</p>
          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  SIAKIP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  KIPAPP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Database Pegawai
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Surat 2025
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full SECTION text-white">
          <div className="nama-tim flex relative overflow-hidden justify-center w-full bg-[#085329] border-4 group border-[#aacdba] transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
            <p className=" transition-all duration-500 text-x ">Produksi</p>
          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#085329] border-4 group border-[#aacdba] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  SIAKIP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined text-black">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#085329] border-4 group border-[#aacdba] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  KIPAPP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined text-black">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full SECTION">
          <div className="nama-tim flex relative overflow-hidden justify-center w-full bg-[#f79039] border-4 group border-[#f6ccaa] transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
            <p className=" transition-all duration-500 text-xl">Distribusi</p>
          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#f79039] border-4 group border-[#f6ccaa] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  SIAKIP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#f79039] border-4 group border-[#f6ccaa] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  KIPAPP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#f79039] border-4 group border-[#f6ccaa] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Database Pegawai
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#f79039] border-4 group border-[#f6ccaa] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Surat 2025
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full SECTION">
          <div className="nama-tim flex relative overflow-hidden justify-center w-full bg-sky-400 border-4 group border-sky-200  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
            <p className=" transition-all duration-500 text-xl">IPDS</p>
          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  SIAKIP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  KIPAPP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Database Pegawai
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Surat 2025
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full SECTION">
          <div className="nama-tim flex relative overflow-hidden justify-center w-full bg-sky-400 border-4 group border-sky-200  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
            <p className=" transition-all duration-500 text-xl">Neraca</p>
          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  SIAKIP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  KIPAPP
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
            <div className="row flex gap-1">
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Database Pegawai
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
              <div className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
                <p className=" transition-all duration-500 font-normal text-md ">
                  Surat 2025
                </p>
                <div className="bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full">
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <a href="/tambah">
        <div className="fixed group right-5 bottom-5 shadow-xl transition-all duration-500 border-b-15 border-blue-300 hover:border-b-0 hover:border-t-15 cursor-pointer overflow-hidden text-4xl text-white font-bold flex flex-col items-center justify-center bg-blue-500 rounded-full px-2 py-2 w-15 h-15 text-center">
          <p className="group-hover:translate-y-5 -translate-y-15 text-xs transition-all duration-500">
            Tambah
          </p>
          <p className="group-hover:translate-y-10 -translate-y-2 transition-all duration-500">
            +
          </p>
        </div>
      </a>
    </div>
  );
}
