"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_PASSWORD_P) {
      const expires = new Date(Date.now() + 10 * 60 * 1000).toUTCString();
      document.cookie = `is_login=true; path=/; max-age=600; expires=${expires}`;
      router.replace("/");
    } else {
      setError("Password salah!");
    }
  };

  useEffect(() => {
    // Cek cookie is_login di client
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const isLogin = cookies.find((c) => c.startsWith("is_login="));
      if (isLogin) {
        router.replace("/");
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      <div className="fixed -top-36 -right-72 sm:-right-64 lg:-right-40 w-96 h-96 bg-[#5ECFFF] opacity-70 rounded-full"></div>
      <div className="fixed -bottom-36 -left-72 sm:-left-64 lg:-left-40 w-96 h-96 bg-[#FF8CC7] opacity-70 rounded-full"></div>
      <div></div>
      <Image
        src="/logo.png"
        alt="Logo"
        width={300}
        height={300}
        className="mb-4"
      />
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Password
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-[#415E72] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition mb-2"
          >
            Login
          </button>
        </form>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </div>
      <div className="disclaimer text-gray-400 w-full text-center fixed bottom-4 left-0">
        Anda memasuki website internal BPS Kabupaten Majene, mohon maaf atas
        ketidaknyamanannya.
        <p className="text-sm leading-relaxed">
           &copy; 2025 Rumah Link - BPS Kabupaten Majene.
        </p>
      </div>
    </div>
  );
}
