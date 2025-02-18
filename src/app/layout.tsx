import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/store/Providers";
import "./globals.css";

import Sidebar from "@/components/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <Sidebar />
          <Providers>
            <div className="flex-1 p-10">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
