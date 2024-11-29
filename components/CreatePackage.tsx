"use client";
import Form from "@/components/form/Form";
import FormImageUpload from "@/components/form/FormImageUpload";
import FormInput from "@/components/form/FormInput";
import { usePackageContext } from "@/context/PackageContext";
import { v4 as uuidv4 } from "uuid";

export default function CreatePackage() {
  const { addPackage, setResetApp } = usePackageContext();

  const submitHandler = async (data: any) => {
    setResetApp(false);
    const packageDataWithUid = {
      ...data,
      uid: uuidv4(),
      photo: Object.values(data.photo || {})
        .filter((photo) => photo)
        .map((url) => ({
          id: uuidv4(),
          url: url as string,
        })),
    };

    addPackage(packageDataWithUid);
    setResetApp(true);
  };

  return (
    <Form submitHandler={submitHandler} className="flex flex-col gap-2">
      <h3 className="text-center text-lg my-5">PACKAGE CREATION FORM</h3>

      <FormInput
        name="packageName"
        type="text"
        placeholder="Package Name"
        className="bg-[#E0F7FA] outline-none shadow-sm px-2 text-black"
        required
      />
      <FormInput
        name="packageCost"
        type="text"
        placeholder="Package Cost Number"
        className="bg-[#E0F7FA] outline-none shadow-sm px-2 text-black"
        required
      />
      <div className="grid grid-cols-3 gap-5">
        <FormImageUpload
          name="photo.1"
          required
          className="mt-5 w-full overflow-hidden rounded-lg"
        />
        <FormImageUpload
          name="photo.2"
          required
          className="mt-5 w-full overflow-hidden rounded-lg"
        />
        <FormImageUpload
          name="photo.3"
          required
          className="mt-5 w-full overflow-hidden rounded-lg"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#E0F7FA] outline-none shadow-sm px-10 py-1.5 text-black"
        >
          Create
        </button>
      </div>
    </Form>
  );
}
