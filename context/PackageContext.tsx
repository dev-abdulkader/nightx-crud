"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

interface PackageContextType {
  packages: PackageData[];
  addPackage: (packageData: PackageData) => void;
  removeImage: (packageUid: string, imageId: string) => void;
  updatePackage: (
    packageUid: string,
    updatedData: Omit<PackageData, "uid">
  ) => void;
  resetApp: boolean;
  setResetApp: (reset: boolean) => void;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

interface PackageProviderProps {
  children: ReactNode;
}

export const PackageProvider: React.FC<PackageProviderProps> = ({
  children,
}) => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [resetApp, setResetApp] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const storedPackages =
      typeof window !== "undefined" ? sessionStorage.getItem("packages") : null;

    if (storedPackages) {
      setPackages(JSON.parse(storedPackages));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem("packages", JSON.stringify(packages));
    }
  }, [packages, isMounted]);

  const addPackage = (packageData: PackageData) => {
    setPackages((prevPackages) => [...prevPackages, packageData]);
  };

  const removeImage = (packageUid: string, imageId: string) => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg.uid === packageUid
          ? { ...pkg, photo: pkg.photo.filter((photo) => photo.id !== imageId) }
          : pkg
      )
    );
  };

  const updatePackage = (
    packageUid: string,
    updatedData: Omit<PackageData, "uid">
  ) => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg.uid === packageUid ? { ...updatedData, uid: pkg.uid } : pkg
      )
    );
  };

  if (!isMounted) return null;

  return (
    <PackageContext.Provider
      value={{
        packages,
        addPackage,
        removeImage,
        updatePackage,
        resetApp,
        setResetApp,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = (): PackageContextType => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error("usePackageContext must be used within a PackageProvider");
  }
  return context;
};
