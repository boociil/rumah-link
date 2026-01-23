import { Geist, Geist_Mono, Bakbak_One, Archivo, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bakbakOne = Bakbak_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bakbak-one",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"], // bebas, sesuaikan kebutuhan
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rumah Link",
  description: "Website untuk menyimpan link penting",
    icons: {
    icon: "/logo-2.svg",
    shortcut: "/favicon.ico",                        // untuk compatibility
    apple: "/apple-touch-icon.png",                  // iOS home screen
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} ${bakbakOne.variable} ${archivo.variable} ${bebasNeue.variable} antialiased`}
      >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_upward" />
        {children}
      </body>
    </html>
  );
}