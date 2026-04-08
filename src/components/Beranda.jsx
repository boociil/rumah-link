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

  const [passwordModal, setPasswordModal] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const router = useRouter();

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
    setIsDelete(!isDelete);
  };

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
  }, [isDelete]);

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
          <div className="mb-10 grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-2 gap-4 md:grid-cols-3 grid-cols-2 mx-4">
            {Array.isArray(link) &&
              link
                .filter((item) => item.tim.nama.toLowerCase() === "semua")
                .map((link, idx) => (
                    <LinkBox   
                        key={idx}
                        id={link.id}
                        link={link.link}
                        title={link.detail}
                        detail={link.details}
                        onHapusClick={onHapusClick}
                    />
 
                ))}
          </div>
        )}
      </div>
    </>
  );
}
