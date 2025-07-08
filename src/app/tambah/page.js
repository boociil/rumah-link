"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahLink() {
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [tim, setTim] = useState("");
  const router = useRouter();

  const onBackClick = () => {
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan url, detail, dan tim
    console.log("URL:", url);
    console.log("Detail:", detail);
    console.log("Tim:", tim);
  };

  return (
    <div className="text-black flex justify-center bg-gray-200 min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="form max-w-2xl shadow-lg p-5 rounded-lg bg-white max-h-fit">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h1 className="font-semibold text-3xl">Kami siap membantu anda</h1>
            <h3 className="text-gray-600">Simpan URL anda di sini</h3>
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
                <option value="1">Umum</option>
                <option value="2">IPDS</option>
                <option value="3">Produksi</option>
                <option value="4">Distribusi</option>
                <option value="5">Neraca</option>
                <option value="6">Sosial</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
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
