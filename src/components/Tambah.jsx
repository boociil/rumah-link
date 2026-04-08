"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function TambahLink({ setActive, setTimId }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [details, setDetails] = useState("");
  const [showTim, setShowTim] = useState(false);
  const [tim, setTim] = useState("");
  const [dataTim, setDataTim] = useState([]); // ✅ harus array
  const router = useRouter();
  const [loadingTim, setLoadingTim] = useState(false);

  const onBackClick = () => {
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("URL:", url);
    // console.log("Detail:", detail);
    // console.log("Tim:", tim);
    // Tambahkan post ke API jika ingin kirim data
  };

  function isValidUrl(url) {
    return /^https?:\/\/.+/.test(url);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isValidUrl(url)) {
      try {
        const response = await axios.post(`${apiUrl}/api/add/link`, {
          url: url,
          tim: tim,
          detail: detail,
          details: details,
        });
        if (response.data.success) {
          // console.log("create success");
          router.push("/");
        }
      } catch {
        console.error("Gagal create link:", error);
      } finally {
        {
          if (tim === 7) {
            setActive("Beranda");
          } else {
            setTimId(tim);
            setActive("Tim");
          }
        }
      }
    } else {
      alert("Mohon masukkan url yang valid");
    }
  };

  useEffect(() => {
    const fetchTim = async () => {
      setLoadingTim(true);
      try {
        const response = await axios.get(`${apiUrl}/api/get/tim`);
        if (response.data.success) {
          setDataTim(response.data.data);
        }
      } catch (error) {
        console.error("Gagal fetch tim:", error);
      } finally {
        setLoadingTim(false);
      }
    };

    fetchTim();
  }, [apiUrl]);

  return (
    <>
      <div className="form w-full md:h-full p-5 rounded-4xl bg-white flex">
        <form
          onSubmit={onSubmit}
          className="p-5 rounded-4xl h-full flex items-center"
        >
          <div>
            <div className="header">
              <h1 className="font-semibold text-3xl text-primary mb-1">
                Tambah Link
              </h1>
              <h3 className="text-gray-600 text-cen">
                Dokumentasikan tautan anda disini...
              </h3>
            </div>
            <div className="mt-10">
              <div className="mb-2">
                <label htmlFor="url" className="text-xs text-primary">
                  URL/Link
                </label>
                <br />
                <input
                  placeholder="https://"
                  type="text"
                  name="url"
                  id="url"
                  className="border-2 border-background rounded-lg px-2 py-1 w-full md:w-[500px]"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="detail" className="text-xs text-primary">
                  Judul
                </label>
                <br />
                <input
                  type="text"
                  name="detail"
                  id="detail"
                  className="border-2 border-background rounded-md px-2 py-1 w-full md:w-[500px]"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="detail" className="text-xs text-primary">
                  Detail
                </label>
                <br />
                <textarea
                  name="details"
                  id="details"
                  rows={4}
                  className="border-2 border-background rounded-md px-2 py-2 w-full md:w-[500px] resize-none"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <br />
                <select
                  className="rounded-md px-2 py-1 border-2 border-background"
                  value={tim}
                  onChange={(e) => setTim(e.target.value)}
                  name="tim"
                  id="tim"
                >
                  <option value="">-- Pilih Tim --</option>
                  {loadingTim ? (
                    <option>Loading...</option>
                  ) : (
                    dataTim.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <button
              type="submit"
              // onClick={onSubmit}
              className="w-full md:w-[500px] bg-primary  text-center text-white rounded-lg mt-6 h-10 font-semibold cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
        <div className="p-2 w-full flex items-center justify-end">
          <Image
            src="/tambah-img.png" // gambar disimpan di folder public/images
            alt="Work"
            width={1200}
            height={1200}
            className="rounded-tl-[150px] rounded-br-[70px] rounded-bl-[30px] rounded-tr-[30px] object-cover"
          />
        </div>
      </div>
    </>
  );
}
