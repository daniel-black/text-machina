import ApiKeyForm from "@/components/api-key-form";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-screen w-full px-4 py-20 flex justify-center items-start">
      <div className="w-full max-w-2xl border border-black p-14 space-y-8">
        <h1 className="text-2xl sm:text-4xl font-semibold">⦿ Welcome&nbsp;friend</h1>
        <p className="">Come chat with undying collective consciousness of any human who ever wrote words.</p>
        <ApiKeyForm />
        <p>Or skip that whole thang and <Link href={'/chat'} className="underline underline-offset-4 hover:bg-black hover:bg-opacity-10 transition-all duration-75">use Dan's API key</Link></p>
      </div>
    </div>
  );
}
