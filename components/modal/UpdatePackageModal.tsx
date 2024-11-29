"use client";
import { v4 as uuidv4 } from "uuid";
import Form from "@/components/form/Form";
import FormImageUpload from "@/components/form/FormImageUpload";
import FormInput from "@/components/form/FormInput";
import { usePackageContext } from "@/context/PackageContext";
import { RxCross1 } from "react-icons/rx";

interface Photo {
  id: string;
  url: string;
}

interface PackageData {
  uid: string;
  packageName: string;
  packageCost: string;
  photo: Photo[];
}

interface UpdatePackageModalProps {
  isOpen: boolean;
  packageData: PackageData;
  onClose: () => void;
}

const UpdatePackageModal: React.FC<UpdatePackageModalProps> = ({
  isOpen,
  packageData,
  onClose,
}) => {
  const { updatePackage } = usePackageContext();

  const handleSubmitUpdate = async (data: {
    packageName: string;
    packageCost: string;
    photo: string[];
  }) => {
    const { packageName, packageCost, photo } = data;
    const filteredPhotos: Photo[] = [
      ...packageData.photo,
      ...photo
        .filter((url) => url && url.trim() !== "")
        .map((url) => ({
          id: uuidv4(),
          url,
        })),
    ];

    updatePackage(packageData.uid, {
      packageName,
      packageCost,
      photo: filteredPhotos,
    });

    console.log(filteredPhotos);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center size-10 rounded-full bg-gray-200 text-xl text-gray-700 hover:text-gray-900"
        >
          <RxCross1 size={22} />
        </button>
        <h3 className="text-xl font-bold mb-4">Update Package</h3>
        <Form
          submitHandler={handleSubmitUpdate}
          className="flex flex-col gap-2 mt-5"
        >
          <FormInput
            name="packageName"
            type="text"
            placeholder="Package Name"
            className="bg-[#E0F7FA] outline-none shadow-sm px-2 text-black"
            required
            value={packageData.packageName}
          />
          <FormInput
            name="packageCost"
            type="text"
            placeholder="Package Cost  Number"
            className="bg-[#E0F7FA] outline-none shadow-sm px-2 text-black"
            required
            value={packageData.packageCost}
          />
          <div className="grid grid-cols-3 gap-5">
            <FormImageUpload
              name="photo.4"
              required
              className="mt-5 w-full overflow-hidden rounded-lg"
              defaultUrl={packageData.photo?.[0]?.url || ""}
            />
            <FormImageUpload
              name="photo.5"
              required
              className="mt-5 w-full overflow-hidden rounded-lg"
              defaultUrl={packageData.photo?.[1]?.url || ""}
            />
            <FormImageUpload
              name="photo.6"
              required
              className="mt-5 w-full overflow-hidden rounded-lg"
              defaultUrl={packageData.photo?.[2]?.url || ""}
            />
          </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              className="bg-[#E0F7FA] outline-none shadow-sm px-10 py-1.5 text-black"
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePackageModal;
