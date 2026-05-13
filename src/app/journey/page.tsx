import { Navbar } from "@/components/sections/navbar";
import { Purpose } from "@/components/sections/purpose";
import { Footer } from "@/components/sections/footer";

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <Purpose />
      </div>
      <Footer />
    </main>
  );
}
