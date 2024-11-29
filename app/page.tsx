import SubmitButton from "@/components/button/SubmitButton";
import CreatePackage from "@/components/CreatePackage";
import PackageList from "@/components/PackageList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E0F7FA] flex items-center justify-center">
      <div className="max-w-2xl bg-[#D2ECF4] w-full shadow-sm p-5 ">
        <CreatePackage />
        <PackageList />
        <SubmitButton />
      </div>
    </div>
  );
}
