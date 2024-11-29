"use client";
import { usePackageContext } from "@/context/PackageContext";
import React from "react";
const SubmitButton = () => {
  const { packages } = usePackageContext();
  const handleSubmit = () => {
    console.log("packages", packages);
  };
  return (
    <div className="flex justify-end mt-5">
      <button
        onClick={handleSubmit}
        className="bg-[#E0F7FA] outline-none shadow-sm px-10 py-1.5 text-black"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;
