import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body style={{ backgroundColor: '#1e357a',}}>
        {children}
      </body>
    </html>
  );
}
