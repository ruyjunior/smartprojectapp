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
import Projects from "./ui/site/dev";
import { fetchProjects } from "./lib/projects/data";
import Deliveries from "./ui/site/deliveries";

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
