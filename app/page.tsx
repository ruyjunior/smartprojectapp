import Navbar from "@/app/ui/site/navbar";
import Hero from "@/app/ui/site/sections/hero";
import Services from "@/app/ui/site/sections/services";
import About from "@/app/ui/site/sections/about";
import Clients from "@/app/ui/site/sections/clients";
import Footer from "@/app/ui/site/footer";
import { Metadata } from 'next';
import CallToAction from "./ui/site/sections/call_to_action";
import Team from "./ui/site/sections/team";
import { fetchProjects } from "./lib/projects/data";
import Deliveries from "./ui/site/deliveries/deliveries";

export const metadata: Metadata = {
  title: 'AUTORIC AUTOMATION',
};

export default async function Page() {
  const projects = await fetchProjects();

  return (
    <main >
      <div className="bg-gray text-gray-900">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Clients />
        <Deliveries />
        <Team />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}
