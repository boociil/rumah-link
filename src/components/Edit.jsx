"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
// import { useRouter } from "next/navigation";  

const EditModal = ({ isOpen, onClose, linkId }) => {
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [details, setDetails] = useState("");
  const [dataTim, setDataTim] = useState([]); // ✅ harus array
  const [tim, setTim] = useState("");
  const [hoveredDelete, setHoveredDelete] = useState(false);
  const [loadingTim, setLoadingTim] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // const router = useRouter();

  const onSuccess = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/edit/link?id=${linkId}`, {
        id: linkId,
        link: url,
        detail: detail,
        details: details,
        tim: tim,
      });

      if (response.data.success) {
        // router.refresh(); // refresh halaman
        onClose();
      }
    } catch (error) {
      console.error("Gagal update link:", error);
    }
  }

  useEffect(() => {
    if (!isOpen || !linkId) return;

    const fetchLink = async () => {
      setLoadingTim(true);
      try {
        console.log("Fetching link id:", linkId);

        const response = await axios.get(`/api/get/link_id?id=${linkId}`);
        // console.log(response);

        if (response.data.success) {
          const data = response.data.data;
          console.log(data);

          setUrl(data.link);
          setDetail(data.detail);
          setDetails(data.details);
          setTim(data.timId);
        }
      } catch (error) {
        console.error("Gagal fetch link:", error);
      } finally {
        setLoadingTim(false);
      }
    };

    fetchLink();
  }, [isOpen, linkId]);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, apiUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/60  flex items-center justify-center z-50">
      <div className="form md:h-full p-5 rounded-4xl bg-foreground min-w-sm w-fit md:max-w-2xl max-h-[55vh]">
        {loadingTim ? (
          <div className="flex justify-center items-center ">
            <Loading w={10} h={10} />
          </div>
        ) : (
          <form onSubmit={onSuccess}>
            <div className="header">
              <h1 className="font-semibold text-3xl text-primary text-center">
                Edit Link{" "}
              </h1>
              <h3 className="text-gray-600 text-cen"></h3>
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
                  className="bg-background rounded-lg px-2 py-1 w-full md:w-[500px]"
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
                  className="bg-background rounded-md px-2 py-1 w-full md:w-[500px]"
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
                  className="bg-background rounded-md px-2 py-2 w-full md:w-[500px] resize-none"
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
              className="w-full bg-primary  text-center text-white rounded-2xl mt-6 h-10 font-semibold cursor-pointer"
            >
              Simpan
            </button>
            <button
              onClick={onClose}
              className="w-full bg-red-500  text-center text-white rounded-2xl mt-3 h-10 font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditModal;
