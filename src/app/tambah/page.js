"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";

export default function TambahLink() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [tim, setTim] = useState("");
  const [dataTim, setDataTim] = useState([]); // ✅ harus array
  const router = useRouter();
  const [loadingTim, setLoadingTim] = useState(false);

  const onBackClick = () => {
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("URL:", url);
    console.log("Detail:", detail);
    console.log("Tim:", tim);
    // Tambahkan post ke API jika ingin kirim data
  };

  function isValidUrl(url) {
    return /^https?:\/\/.+/.test(url);
  }

  const onSubmit = async (e) => {
    
    e.preventDefault();

    if (isValidUrl(url)){
      try {
        const response = await axios.post(`${apiUrl}/api/add/link`, {
          url: url,
          tim: tim,
          detail: detail,
        });
        if (response.data.success) {
          console.log("create success");
          router.push("/");
        }
      } catch {
        console.error("Gagal create link:", error);
      } finally {

      }
    }else{
      alert("Mohon masukkan url yang valid")
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
    <div className="text-black flex justify-center bg-gray-200 min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="form max-w-2xl shadow-lg p-5 rounded-lg bg-white max-h-fit">
        <form onSubmit={onSubmit}>
          <div className="header">
            <h1 className="font-semibold text-3xl">Rumah Link BPS Majene</h1>
            <h3 className="text-gray-600 text-cen">Simpan URL anda di sini</h3>
          </div>
          <div className="mt-10">
            <div className="mb-2">
              <label htmlFor="url" className="text-xs">
                URL/Link
              </label>
              <br />
              <input
                placeholder="https://"
                type="text"
                name="url"
                id="url"
                className="border-2 border-gray-200 rounded-md px-2 py-1 min-w-96"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="detail" className="text-xs">
                Detail
              </label>
              <br />
              <input
                type="text"
                name="detail"
                id="detail"
                className="border-2 border-gray-200 rounded-md px-2 py-1 min-w-96"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="tim" className="text-xs">
                Tim
              </label>
              <br />
              <select
                className="border-2 border-gray-200 rounded-md px-2 py-1"
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
            className="w-full bg-amber-500 hover:bg-amber-400 text-center text-white rounded-md mt-6 h-10 font-semibold cursor-pointer"
          >
            Simpan
          </button>
        </form>
        <button
          className="w-full bg-red-500 hover:bg-red-400 text-center text-white rounded-md mt-2 h-10 font-semibold cursor-pointer"
          onClick={onBackClick}
        >
          Batal
        </button>
      </div>
    </div>
  );
}
