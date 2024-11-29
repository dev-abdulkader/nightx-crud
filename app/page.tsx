import CreatePackage from "@/components/CreatePackage";
import PackageList from "@/components/PackageList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E0F7FA] flex items-center justify-center">
      <div className="max-w-2xl bg-[#D2ECF4] w-full shadow-sm p-5 ">
        <CreatePackage />
        <PackageList />
        <div className="flex justify-end mt-5">
          <button className="bg-[#E0F7FA] outline-none shadow-sm px-10 py-1.5 text-black">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
