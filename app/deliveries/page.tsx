import Navbar from "@/app/ui/site/navbar";
import Hero from "@/app/ui/site/hero";
import Footer from "@/app/ui/site/footer";
import { Metadata } from 'next';
import Projects from "@/app/ui/site/dev";
import Automation from "@/app/ui/site/automation";
import { fetchProjects } from "@/app/lib/projects/data";

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
        <Projects projects={projects} />
        <Automation />
        <Footer />
      </div>
    </main>
  );
}
