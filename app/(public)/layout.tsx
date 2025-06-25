import '@/app/ui/global.css';
import { Metadata } from 'next';
import { SessionProvider } from "next-auth/react";
import WhatsappButton from "@/app/ui/site/WhatsappButton";
import TopButton from "@/app/ui/site/TopButton";
import Footer from "@/app/ui/site/footer";
import Navbar from "@/app/ui/site/navbar";
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: {
    template: '%s | AUTORIC',
    default: 'AUTORIC AUTOMAÇÃO',
  },
  description: 'AUTORIC, A SOLUÇÃO EM AUTOMAÇÃO PARA O SEU NEGÓCIO E A SUA VIDA',
  metadataBase: new URL('https://www.autoric.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    follow: true,
    index: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SessionProvider>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
        <WhatsappButton />
        <TopButton />
      </SessionProvider>
    </main>
  );
}
