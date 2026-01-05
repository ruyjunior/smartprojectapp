import Hero from "@/app/(public)/components/sections/hero";
import About from "@/app/(public)/components/sections/about";
import Clients from "@/app/(public)/components/sections/clients";
import { Metadata } from 'next';
import YouTubeEmbed from "./components/sections/YouTubeEmbed";

export const metadata: Metadata = {
  title: 'SMART PROJECTS',
  description: 'Seu APP para Projetos, Tudo conectado.',
};

const videoId = "GaTNjtrF9LE?si=n4NJTsO11Dy7a40d";


export default async function Page() {
  return (
    <div className="bg-gray text-gray-900">
      <Hero />
      <About />
      <YouTubeEmbed videoId={videoId} title="Apresentação do Smart Projects APP" />
    </div>
  );
}
