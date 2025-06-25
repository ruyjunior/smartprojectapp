import Hero from "@/app/ui/site/sections/hero";
import Services from "@/app/ui/site/sections/services";
import About from "@/app/ui/site/sections/about";
import Clients from "@/app/ui/site/sections/clients";
import { Metadata } from 'next';
import CallToAction from "../ui/site/sections/call_to_action";
import Team from "../ui/site/sections/team";
import Deliveries from "../ui/site/deliveries/deliveries";
import Techs from "../ui/site/sections/techs";

export const metadata: Metadata = {
  title: 'HOME',
  description: 'Página inicial do site AUTORIC AUTOMAÇÃO',
};

export default async function Page() {
  return (
    <div className="bg-gray text-gray-900">
      <Hero />
      <Services />
      <About />
      <Techs />
      <Clients />
      <Deliveries />
      <Team />
      <CallToAction />
    </div>
  );
}
