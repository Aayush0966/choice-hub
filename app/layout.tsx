import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins, Kurale, Roboto } from 'next/font/google'
import {Toaster} from "react-hot-toast"
import { PollProvider } from "@/context/pollContext";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Choice Hub",
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

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
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
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />

      <body
        className={`${kurale.variable} ${poppins.variable} ${roboto.variable} antialiased`}
      >
        <Toaster position="bottom-center" />
        <PollProvider>
          <ThemeProvider attribute="class">
        {children}
        <Analytics />
        <SpeedInsights />
        </ThemeProvider>
        </PollProvider>
      </body>
    </html>
  );
}
