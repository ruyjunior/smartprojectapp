import Navbar from "@/app/ui/site/navbar";
import Hero from "@/app/ui/site/hero";
import Services from "@/app/ui/site/services";
import About from "@/app/ui/site/about";
import Clients from "@/app/ui/site/clients";
import Technologies from "@/app/ui/site/technologies";
import Footer from "@/app/ui/site/footer";
import { Metadata } from 'next';
import CallToAction from "./ui/site/call_to_action";
import Team from "./ui/site/team";
import Figma from "./ui/site/figma";
import Github from "./ui/site/github";


export const metadata: Metadata = {
  title: 'AUTORIC AUTOMATION',
};

export default function Page() {
  return (
    <main >
      <div className="bg-gray text-gray-900">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Clients />
        <Team />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}
