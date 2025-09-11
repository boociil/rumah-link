// import React, { useState, useEffect } from "react";
import { GoHome } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineTeam } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar({ edit, setEdit, showTim, setShowTim }) {
  const router = useRouter();
  // const [showTim, setShowTim] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tim, setTim] = useState([]);
  // const [edit, setEdit] = useState(false);

  const onHomeClick = () => {
    router.push("/");
  };

  const onTambahClick = () => {
    router.push("/tambah");
  };

  const onTimClick = () => {
    setShowTim(!showTim);
  };

  const onTimClickDirect = (id) => {
    router.push("/tim/" + id);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get/tim`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();
        const tim = json.data.filter((item) => item.nama !== "semua");
        setTim(tim);
        // console.log(tim);

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
      <div className="md:hidden fixed bottom-10 w-full flex justify-center items-center z-50">
        <div className="grid relative grid-cols-3 opacity-100 bg-gradient-to-tr min-w-96 bg-white max-h-15 shadow-lg px-2 py-1 mx-4 max-w-lg rounded-xl">
          <div
            onClick={onHomeClick}
            className="home cursor-pointer flex hover:-translate-y-2 flex-col -translate-y-1 justify-center text-gray-500 hover:text-[#f79039] items-center transition-all duration-300"
          >
            <GoHome className="text-2xl " />
            <p className="text-xs ">Home</p>
          </div>
          <div
            onClick={onTambahClick}
            className="home cursor-pointer hover:scale-105 -translate-y-5 flex justify-center items-center transition-all duration-300"
          >
            <div className="w-15 h-15  bg-[#f79039] shadow-xl rounded-full flex justify-center items-center">
              <IoMdAdd className="text-4xl text-white" />
            </div>
          </div>
          <div
            onClick={onTimClick}
            className={`home cursor-pointer flex flex-col hover:-translate-y-2 -translate-y-1 justify-center hover:text-[#f79039] items-center ${
              showTim ? `text-[#f79039]` : `text-gray-500`
            }  transition-all duration-300`}
          >
            <AiOutlineTeam className="text-2xl " />
            <p className="text-xs ">Tim</p>
          </div>
          <div
            className={`${
              showTim ? `absolute` : `hidden`
            } text-black bg-white rounded-lg -top-76 right-1 w-48 px-4 py-2`}
          >
            {tim.map((item, idx) => {
              return (
                <div key={idx}>
                  <div
                    className="text-center border-b-2 border-gray-100 py-1 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                    key={idx}
                    onClick={() => onTimClickDirect(item.id)}
                  >
                    {item.nama}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden md:fixed top-10 w-full md:flex justify-center items-center z-50">
        <div className="relative flex justify-between gap-2 opacity-100 bg-gradient-to-tr min-w-96 bg-white max-h-15 shadow-lg px-2 py-2 mx-4 max-w-lg rounded-xl">
          <div
            className="bg-gray-100 cursor-pointer w-fit px-1 py-2 rounded-lg"
            onClick={onHomeClick}
          >
            <Image
              src="/logo.png" // gambar disimpan di folder public/images
              alt="Logo"
              width={25}
              height={25}
            />
          </div>
          <div className="grid grid-cols-3 text-black  flex-grow">
            <div
              onClick={onTambahClick}
              className="cursor-pointer flex flex-col justify-center items-center hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              Tambah
            </div>
            <div
              onClick={onTimClick}
              className="cursor-pointer flex flex-col justify-center items-center hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              Tim
            </div>
            <div
              className={`${
                showTim ? `absolute` : `hidden`
              } text-black bg-white rounded-lg -bottom-74 right-18 w-48 px-4 py-2`}
            >
              {tim
                .filter((item) => item.nama !== "Semua")
                .map((item, idx) => {
                return (
                  <div key={idx}>
                    <div
                      className="text-center border-b-2 border-gray-100 py-1 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                      key={idx}
                      onClick={() => onTimClickDirect(item.id)}
                    >
                      {item.nama}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => {
                setEdit(!edit);
              }}
              className={`cursor-pointer flex flex-col justify-center items-center hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                edit ? "text-red-500" : ""
              }`}
            >
              {edit ? (
                <div className="font-semibold">Batalkan</div>
              ) : (
                <div>Edit</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
