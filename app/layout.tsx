import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: 'SMART PROJECTS',
    default: 'SMART PROJECTS',
  },
  description: 'Seu APP para Projetos, Tudo conectado. Melhores soluções para suas necessidades.',
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
    <html>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
