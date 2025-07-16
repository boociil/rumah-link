"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
// import Particles from "react-tsparticles";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [tim, setTim] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const router = useRouter();

  const onTimClick = (id) => {
    router.push("/tim/" + id);
  };

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
        // fetchData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="text-black bg-gray-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      

      <h1 className="w-full font-semibold text-3xl mb-10 text-center z-50">
        Rumah Link BPS Majene
      </h1>

      {loading ? (
        <div className="col-span-6 flex justify-center items-center w-full h-40">
          {/* tambahkan skeleton kalo bisa */}
          <Loading w={10} h={10} />
        </div>
      ) : (
        <div className="mb-10 flex justify-center items-center">
          {Array.isArray(tim) &&
            tim
              .filter((item) => item.nama.toLowerCase() === "semua")
              .map((tim, idx) => (
                <div
                  key={idx}
                  className="md:flex grid sm:grid-cols-3 grid-cols-2 justify-center items-center gap-2"
                >
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
                        <div className="link-satuan cursor-pointer flex relative overflow-hidden w-full bg-[#f79039] border-4 group border-[#e8cab2] hover:scale-105 hover:border-0 transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24">
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
      )}

      {loading ? (
        <></>
      ) : (
        // <div className="col-span-6 flex justify-center items-center w-full h-40">
        //   {/* tambahkan skeleton kalo bisa */}
        //   <Loading w={10} h={10} />
        // </div>
        <>
        
          <h1 className="w-full font-semibold text-xl text-center">Tim</h1>
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
                      {/* <div className="link">
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
                      </div> */}
                    </div>
                  );
                })}
          </div>
        </>
      )}

      {/* <div className="fixed group right-25 bottom-5 shadow-xl transition-all duration-500 border-b-15 border-blue-300 hover:border-b-0 hover:border-t-15 cursor-pointer overflow-hidden text-4xl text-white font-bold flex flex-col items-center justify-center bg-blue-500 rounded-full px-2 py-2 w-15 h-15 text-center">
        <p className="group-hover:translate-y-5 -translate-y-15 text-xs transition-all duration-500">
          Edit
        </p>
        <p className="group-hover:translate-y-10 -translate-y-2 transition-all duration-500">
          +
        </p>
      </div> */}
    </div>
    </>
  );
}
