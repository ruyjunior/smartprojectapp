import Hero from "@/app/ui/site/sections/hero";
import About from "@/app/ui/site/sections/about";
import Clients from "@/app/ui/site/sections/clients";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMART PROJECT',
  description: 'Página inicial do site público',
};

export default async function Page() {
  return (
    <div className="bg-gray text-gray-900">
      <Hero />
      <About />
    </div>
  );
}
