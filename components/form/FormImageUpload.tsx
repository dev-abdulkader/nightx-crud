"use client";
import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Image from "next/image";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { usePackageContext } from "@/context/PackageContext";

interface IImageUpload {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultUrl?: string;
}

const FormImageUpload = ({
  name,
  label,
  required,
  disabled,
  className,
  defaultUrl,
}: IImageUpload) => {
  const { control, setValue } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultUrl || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resetApp, setResetApp } = usePackageContext();
  useEffect(() => {
    if (resetApp) {
      setImagePreview(null);
      setValue(name, null);
      setResetApp(false);
    }
  }, [resetApp, setValue, name, setResetApp]);
  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/image-upload/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setValue(name, result.imageUrl);
        setImagePreview(result.imageUrl);
      } else {
        throw new Error(result?.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        handleFileUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetInput = () => {
    const inputElement = document.getElementById(
      `file-input-${name}`
    ) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 font-semibold text-[#00359E]">
          {label} {required && <span>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className="relative flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-gray-400"
            onClick={() => {
              resetInput();
              document.getElementById(`file-input-${name}`)?.click();
            }}
          >
            <input
              id={`file-input-${name}`}
              type="file"
              accept="image/*"
              disabled={disabled || loading}
              onChange={handleFileChange}
              className="hidden"
            />

            {loading && (
              <small className="absolute bottom-2 left-2 text-xs text-gray-600">
                Loading...
              </small>
            )}

            <div className="flex h-full w-full items-center justify-center">
              {imagePreview || field.value ? (
                <Image
                  src={imagePreview || field.value}
                  alt="Uploaded Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <BsFillPlusCircleFill className="text-blue" size={30} />
                  <p className="text-sm text-gray-500">Click to upload</p>
                </div>
              )}
            </div>

            {error && (
              <small className="absolute bottom-2 right-2 text-xs text-red-600">
                {error}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FormImageUpload;
