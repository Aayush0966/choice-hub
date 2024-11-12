import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Kurale } from 'next/font/google'
import {Toaster} from "react-hot-toast"
import { PollProvider } from "@/context/pollContext";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Pollify",
  description: "Generate and share polls with ease",
};

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: false,

})

export const kurale = Kurale({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-kurale',
  display: 'swap',
  preload: false,
}) 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kurale.variable} ${poppins.variable} antialiased`}
      >
        <Toaster position="bottom-center" />
        <PollProvider>
          <ThemeProvider attribute="class">
        {children}
        </ThemeProvider>
        </PollProvider>
      </body>
    </html>
  );
}
