import Navbar from "@/app/ui/site/navbar";
import Hero from "@/app/ui/site/sections/hero";
import Footer from "@/app/ui/site/footer";
import { Metadata } from 'next';
import Devs from "@/app/ui/site/deliveries/devs";
import Automation from "@/app/ui/site/deliveries/automation";
import WhatsappButton from "@/app/ui/site/WhatsappButton";
import TopButton from "@/app/ui/site/TopButton";

export const metadata: Metadata = {
  title: 'AUTORIC AUTOMATION',
};

export default async function Page() {
  return (
    <main >
      <div className="bg-gray text-gray-900">
        <Navbar />
        <Hero />
        <Devs />
        <Automation />
        <Footer />
        <WhatsappButton />
        <TopButton />
      </div>
    </main>
  );
}
