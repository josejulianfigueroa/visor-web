import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "OrdenaYa App",
  description: "App para la gestión de órdenes de comida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className}> 
      <body style={{ backgroundColor: '#1e357a',}}>
        {children}
      </body>
    </html>
  );
}
