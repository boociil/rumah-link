import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  if (!isOpen) return null;

  const onConfrim = () => {
    console.log(password);
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      onSuccess();
      onClose();
    } else {
      alert("Password salah", password);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-100/60  flex items-center justify-center z-50">
      <div className="bg-gray-200 w-full max-w-sm rounded-3xl shadow-lg pt-6 px-6 relative">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl cursor-pointer font-semibold"
        >
          X
        </div>
        {/* Logo */}

        <div className="text-2xl font-bold text-center text-black mt-4 mb-4">
          Password
        </div>

        <div>
          <input
            type="password"
            className="bg-white rounded-lg w-full h-8 text-black px-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div onClick={onConfrim} className="place-button flex justify-center hover:font-semibold cursor-pointer items-center gap-2 mt-5 text-black border-t-1 border-gray-400 pb-2 text-center h-12">
          <div>Confirm</div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
