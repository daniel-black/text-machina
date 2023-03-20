import ApiKeyForm from "@/components/api-key-form";

export default function LandingPage() {
  return (
    <div className="h-screen w-full px-4 py-20 flex justify-center items-start">
      <div className="w-full max-w-2xl border border-black p-14 space-y-8">
        <h1 className="text-2xl sm:text-4xl font-semibold">⦿ Welcome&nbsp;friend</h1>
        <p className="">Come chat with undying collective consciousness of any human who ever wrote words.</p>
        <ApiKeyForm />
      </div>
    </div>
  );
}
