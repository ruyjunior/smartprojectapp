import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import AuthProvider from "@/app/login/SessionProvider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    template: '%s | AUTORIC AUTOMATION',
    default: 'AUTORIC AUTOMATION',
  },
  description: 'The APP for automation projects',
  metadataBase: new URL('https://www.autoric.com.br'),
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
        </SessionProvider></body>
    </html>
  );
}
