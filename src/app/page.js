// import Image from "next/image";
import { prisma } from '@/lib/prisma';


export default async function Home() {

  const link = await prisma.tim.findMany({
    select : {
      id: true,
      nama: true,
      links : {
        select :{
          detail: true,
          link: true,
        }
      }
    }
  });

  console.log(link);
  

  return (
    <div className="text-black bg-white items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <h1 className="w-full font-semibold text-3xl mb-10 text-center">
        Rumah Link Majene
      </h1>
      
      <div className="w-full px-1 md:flex gap-3">
        <div className="w-full SECTION">
          <div className="nama-tim flex relative overflow-hidden justify-center w-full bg-sky-400 border-4 group border-sky-200  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
            <p className=" transition-all duration-500 text-xl">
              Umum
            </p>

          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
            <p className=" transition-all duration-500 text-x ">
              Produksi
            </p>

          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#085329] border-4 group border-[#aacdba] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
            <p className=" transition-all duration-500 text-xl">
              Distribusi
            </p>

          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#f79039] border-4 group border-[#f6ccaa] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-[#f79039] border-4 group border-[#f6ccaa] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
            <p className=" transition-all duration-500 text-xl">
              IPDS
            </p>

          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
            <p className=" transition-all duration-500 text-xl">
              Neraca
            </p>

          </div>
          <div className="link">
            <div className="row flex gap-1">
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
              <div 
                
                className="link-satuan cursor-pointer flex relative overflow-hidden w-1/2 bg-sky-400 border-4 group border-sky-200 hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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

      </div>
    </div>
  );
}
