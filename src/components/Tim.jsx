"use client";

// Halaman per tim, ditandai dengan id

import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import PasswordModal from "@/components/PasswordModal";
import LinkBox from "./LinkBox";

export default function Tim({ id }) {
  const [tim, setTim] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [namaTim, setNamaTim] = useState("");

  const onHapusClick = async (id) => {
    setLinkId(id);
    setPasswordModal(true);
  };

  const onEditLinkClick = (id) => {
    router.push("/edit/" + id);
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
    // Fetch data tim dari API saat komponen dimuat
    const fetchTim = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get/link_tim?id=${id}`,
          {
            cache: "no-store",
          }
        );

        const result = await res.json();

        const data = await result;

        if (data.success) {
          setTim(data.data);
          setNamaTim(data.tim.nama);
        } else {
          console.error("Gagal mengambil data tim:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tim data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTim();
  }, [id, isDelete]);

  return (
    <div className="tim">
      <PasswordModal
        isOpen={passwordModal}
        onClose={onClose}
        onSuccess={onSuccess}
      />
      <h1 className="text-primary font-bebas-neue text-4xl">
        {
          !loading && (
            (
              namaTim
            )
          ) 
        }
      </h1>
      {loading ? (
        <div className="col-span-6 flex justify-center items-center w-full h-40">
          {/* tambahkan skeleton kalo bisa */}
          <Loading w={10} h={10} />
        </div>
      ) : (
        <div className="mb-10 grid lg:grid-cols-6 gap-4 mt-4">
          {tim
            // .filter((item) => item.tim.nama.toLowerCase() === "semua")
            .map((link, idx) => (
              <LinkBox
                key={idx}
                id={link.id}
                link={link.link}
                title={link.detail}
                detail={link.details}
                onHapusClick={onHapusClick}
                onEditLinkClick={onEditLinkClick}
              />
            ))}
        </div>
      )}
    </div>
  );
}
