import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import AuthProvider from "@/app/login/SessionProvider";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: {
    template: '%s | RSUL VIDA SEGUROS',
    default: 'RSUL VIDA SEGUROS',
  },
  description: 'The APP for proposals',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
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
