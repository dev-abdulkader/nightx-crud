"use client";
import { usePackageContext } from "@/context/PackageContext";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import UpdatePackageModal from "../modal/UpdatePackageModal";
import useToggleState from "./../../hooks/useToggleState";

interface Photo {
  id: string;
  url: string;
}

interface Package {
  packageName: string;
  packageCost: string;
  photo: Photo[];
  uid: string;
}

interface PackageCardProps {
  packageData: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData }) => {
  const { packageName, packageCost, photo, uid } = packageData;
  const { removeImage } = usePackageContext();

  const [isModalOpen, toggleModal] = useToggleState(false);

  const handleDelete = (imageId: string) => {
    removeImage(uid, imageId);
  };

  return (
    <div className="bg-[#D9F2F7] rounded-lg shadow p-5">
      <div className="p-5 border border-black rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg uppercase">Title: {packageName}</h3>
          <p className="text-lg uppercase">Cost: {packageCost}</p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {photo.map((img, index) => (
            <div key={index} className="relative">
              <Image
                src={img.url}
                alt={`Image ${index}`}
                height={300}
                width={300}
                className="h-32 rounded object-cover"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-700"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={toggleModal}
            className="bg-[#E0F7FA] outline-none shadow-sm px-10 py-1.5 text-black"
          >
            Update
          </button>
        </div>
      </div>
      <UpdatePackageModal
        isOpen={isModalOpen}
        packageData={packageData}
        onClose={toggleModal}
      />
    </div>
  );
};

export default PackageCard;
