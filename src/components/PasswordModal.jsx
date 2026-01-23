"use client";

import Image from "next/image";
import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [hoveredDelete, setHoveredDelete] = useState(false);

  if (!isOpen) return null;

  const onConfrim = () => {
    console.log(password);
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      onSuccess();
      onClose();
    } else {
      alert("Password salah", password);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/60  flex items-center justify-center z-50">
      <div className="bg-foreground w-full max-w-sm rounded-3xl shadow-lg pt-6 px-6 relative">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:bg-red-500 p-2 rounded-lg hover:text-red-600 text-xl cursor-pointer font-semibold"
          onMouseEnter={() => setHoveredDelete(true)}
          onMouseLeave={() => setHoveredDelete(false)}
        >
          <Image
            src={hoveredDelete ? "/delete-white.svg" : "/delete.svg"}
            alt="Delete"
            width={17}
            height={17}
          />
        </div>
        {/* Logo */}

        <div className="text-2xl font-bold text-center text-primary mt-4 mb-4 font-bebas-neue">
          Password
        </div>

        <div>
          <input
            type="password"
            className="bg-background rounded-2xl w-full h-8 text-black px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          onClick={onConfrim}
          className="place-button font-archivo flex justify-center hover:font-semibold cursor-pointer items-center gap-2 mt-5 text-black border-t-1 border-gray-400 pb-2 text-center h-12"
        >
          <div>Confirm</div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
