"use client";
import "./globals.css";
import localFont from "next/font/local";
import { Figtree } from "next/font/google";
import Menu from "./_components/menu/menu";
import Header from "./_components/header/header";
import { Notifications } from "./_components/notification";
import NextTopLoader from "nextjs-toploader";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

const vazir = localFont({
  src: [
    {
      path: "../../public/fonts/vazir/Vazirmatn-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazir/Vazirmatn-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${figtree.variable} ${vazir.variable}`}
      dir='rtl'>
      <head>
        <link
          rel='icon'
          href='./icon.png'
          type='image/png'
          sizes='32x32'
        />
      </head>
      <body className='dark:bg-base-100 bg-primary-content flex items-start justify-center w-svw h-svh'>
        <div className='dark:bg-base-100 bg-primary-content dark:text-base-content grid grid-rows-[auto,auto,1fr] grid-cols-12 w-full h-full max-w-[1500px]'>
          <NextTopLoader
            showSpinner={false}
            color='var(--color-primary)'
          />
          <Notifications />
          <Header />
          <Menu />
          {children}
        </div>
      </body>
    </html>
  );
}
