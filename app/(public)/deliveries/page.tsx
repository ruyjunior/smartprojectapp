import Hero from "@/app/ui/site/sections/hero";
import { Metadata } from 'next';
import Devs from "@/app/ui/site/deliveries/devs";
import Automation from "@/app/ui/site/deliveries/automation";
import {fetchProjects} from "@/app/lib/projects/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'ENTREGAS | AUTORIC',
  description: 'AUTORIC ENTREGAS',
};

export default async function Page() {
  const projects = await fetchProjects();

  return (
    <main >
      <div className="bg-gray text-gray-900">
        <Hero />
        <Devs projects={projects} /> 
        <Automation />
      </div>
    </main>
  );
}
