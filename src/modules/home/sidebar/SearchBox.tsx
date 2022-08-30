import React from "react";

import { MdOutlineFlashOn } from "react-icons/md";


export default function SearchBox() {
  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder="search"
        className="flex-1 rounded-md bg-gray-100 p-1 px-2 m-2"
      />
      <button className="bg-gray-100 p-2 w-8 h-8 m-2 ml-0 rounded-md">
        <MdOutlineFlashOn />
      </button>
    </div>
  );
}
