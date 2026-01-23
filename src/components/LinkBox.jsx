"use client";

import { useState } from "react";
import Image from "next/image";

export default function LinkBox({
  link,
  id,
  title,
  detail,
  onHapusClick,
  onEditLinkClick,
}) {
  const [hoveredBox, setHoveredBox] = useState(false);
  const [hoveredEdit, setHoveredEdit] = useState(false);
  const [hoveredDelete, setHoveredDelete] = useState(false);

  const handleDivClick = () => {
    window.open(link.url ?? link, "_blank");
  };

  return (
    <div
      className={`
            ${hoveredBox ? "shadow-md" : ""}
        link-box bg-white min-w-56 min-h-32 rounded-3xl p-4 cursor-pointer flex overflow-hidden transition-all duration-300 relative`}
      onMouseEnter={() => setHoveredBox(true)}
      onMouseLeave={() => setHoveredBox(false)}
      onClick={handleDivClick}
    >
      {/* LEFT CONTENT */}
      <div
        className={`${
          hoveredBox ? "" : "translate-x-4"
        } transition-all duration-300 flex flex-col justify-center gap-2 h-full mr-1`}
      >
        <h2 className="font-bebas-neue text-primary text-2xl">{title}</h2>
        <p className="font-archivo text-xs">{detail}</p>
      </div>

      {/* RIGHT ACTIONS */}
      <div
        className={`${
          hoveredBox ? "" : "translate-x-12"
        } ml-auto flex flex-col justify-between min-w-8 transition-all duration-300`}
      >
        {/* DELETE */}
        <div
          className="hover:bg-red-500 rounded-lg p-1 flex justify-center h-full w-full transition-all duration-500 mb-1"
          onMouseEnter={() => setHoveredDelete(true)}
          onMouseLeave={() => setHoveredDelete(false)}
          onClick={(e) => {
            e.stopPropagation();
            onHapusClick(id);
          }}
        >
          <Image
            src={hoveredDelete ? "/delete-white.svg" : "/delete.svg"}
            alt="Delete"
            width={17}
            height={17}
          />
        </div>

        {/* EDIT */}
        <div
          className="hover:bg-primary rounded-lg p-1 flex justify-center h-full w-full transition-all duration-500"
          onMouseEnter={() => setHoveredEdit(true)}
          onMouseLeave={() => setHoveredEdit(false)}
          onClick={(e) => {
              e.stopPropagation();
            onEditLinkClick(link.id);
          }}
        >
          <Image
            src={hoveredEdit ? "/edit-white.svg" : "/edit.svg"}
            alt="Edit"
            width={17}
            height={17}
          />
        </div>
      </div>
      {/* HOVER TEXT */}
      <div
        className={`
    absolute bottom-3 left-1/2 -translate-x-1/2
    text-xs font-archivo text-white bg-primary
    px-3 py-1 rounded-full
    transition-all duration-300 ease-out
    ${hoveredBox ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
  `}
      >
        <Image
          src="arrow-white.svg"
          alt="Edit"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
}
