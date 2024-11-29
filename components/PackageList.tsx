"use client";
import React from "react";
import PackageCard from "./card/PacakgeCard";
import { usePackageContext } from "@/context/PackageContext";

const PackageList = () => {
  const { packages } = usePackageContext();

  return (
    <div className="mt-5 flex flex-col gap-5">
      {packages && packages.length > 0 ? (
        packages.map((pkg, index) => (
          <PackageCard key={index} packageData={pkg} />
        ))
      ) : (
        <p>No packages available.</p>
      )}
    </div>
  );
};

export default PackageList;
