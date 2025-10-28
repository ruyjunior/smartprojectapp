import Hero from "@/app/(public)/components/sections/hero";
import About from "@/app/(public)/components/sections/about";
import Clients from "@/app/(public)/components/sections/clients";
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
