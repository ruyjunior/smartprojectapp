import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { SessionProvider } from "next-auth/react";
import WhatsappButton from "@/app/ui/site/WhatsappButton";
import TopButton from "@/app/ui/site/TopButton";
import Footer from "@/app/ui/site/footer";
import Navbar from "@/app/ui/site/navbar";


export const metadata: Metadata = {
  title: {
    template: '%s | AUTORIC',
    default: 'AUTORIC AUTOMATION',
  },
  description: 'YOU IMAGINE IT, WE MAKE IT WORK.',
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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
        </body>
    </html>
  );
}
