"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import PasswordModal from "@/components/PasswordModal";
import LinkBox from "@/components/LinkBox";

export default function Beranda() {
  const [loading, setLoading] = useState(false);
  const [tim, setTim] = useState([]);
  const [showTim, setShowTim] = useState(false);
  const [link, setLink] = useState([]);
  const [edit, setEdit] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [linkId, setLinkId] = useState(null);

  const router = useRouter();

  const onHapusClick = async (id) => {
    setLinkId(id);
    setPasswordModal(true);
  };

  const onClose = () => {
    setPasswordModal(false);
  };

  const onEditLinkClick = (id) => {
    router.push("/edit/" + id);
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
        // console.log(json.data);

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
        // console.log(json.data);

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
      <PasswordModal
        isOpen={passwordModal}
        onClose={onClose}
        onSuccess={onSuccess}
      />
      <div className="beranda">
        {loading ? (
          <div className="col-span-6 flex justify-center items-center w-full h-40">
            {/* tambahkan skeleton kalo bisa */}
            <Loading w={10} h={10} />
          </div>
        ) : (
          <div className="mb-10 grid lg:grid-cols-6 gap-4">
            {Array.isArray(link) &&
              link
                .filter((item) => item.tim.nama.toLowerCase() === "semua")
                .map((link, idx) => (
                    <LinkBox   
                        key={idx}
                        id={link.id}
                        link={link.link}
                        title={link.detail}
                        detail={"Detail yang menjelaskan tentang link ini."}
                        onHapusClick={onHapusClick}
                        onEditLinkClick={onEditLinkClick}
                    />
                //   <div key={idx} className="">
                //     <div
                //       // key={idx}
                //       href={link.link}
                //       target="_blank"
                //       rel="noopener noreferrer"
                //       className={`block w-full min-w-36 max-w-72 hover:animate-none ${
                //         edit ? "animate-pulse" : ""
                //       }`}
                //       onClick={edit ? (e) => e.preventDefault() : undefined}
                //     >
                //       <div
                //         className={`link-satuan cursor-pointer ${
                //           edit
                //             ? ""
                //             : "flex hover:scale-105 hover:border-0 hover:-translate-y-2"
                //         }  relative overflow-hidden w-full bg-[#f79039] border-4 group border-[#e8cab2]  transition-all duration-500  px-2 py-1 rounded-3xl mt-4 font-semibold items-center shadow-lg h-24`}
                //       >
                //         <p className="transition-all duration-500 font-semibold text-lg">
                //           {link.detail}
                //         </p>
                //         <div
                //           className={`${
                //             edit ? "block" : "hidden"
                //           } rounded-lg w-full min-h-6 grid grid-cols-2 font-normal gap-2 bg-white px-2`}
                //         >
                //           <div
                //             className="text-center cursor-pointer hover:bg-gray-200 px-1"
                //             onClick={onEditLinkClick.bind(this, link.id)}
                //           >
                //             Edit
                //           </div>
                //           <div
                //             className="text-center cursor-pointer hover:bg-red-500 hover:text-white px-1"
                //             onClick={onHapusClick.bind(this, link.id)}
                //           >
                //             Hapus
                //           </div>
                //         </div>
                //         <div
                //           className={`bg-gray-100 absolute flex justify-center items-center group-hover:rotate-45 -right-3 -top-3 group-hover:top-0 group-hover:right-0 group-hover:scale-110 transition-all duration-500 opacity-30 group-hover:opacity-70 w-10 h-10 rounded-full ${
                //             edit ? "hidden" : ""
                //           }`}
                //         >
                //           <span className="material-symbols-outlined">
                //             arrow_upward
                //           </span>
                //         </div>
                //       </div>
                //     </div>
                //     {/* ))} */}
                //   </div>
                ))}
          </div>
        )}
      </div>
    </>
  );
}
