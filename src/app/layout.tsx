import "./globals.css";
import localFont from "next/font/local";
import { Figtree } from "next/font/google";
import Menu from "./_components/menu/menu";
import Header from "./_components/header/header";
import { Notifications } from "./_components/notification";

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
      className={`dark ${figtree.variable} ${vazir.variable}`}
      dir='rtl'>
      <body className='dark:bg-base-100 dark:text-base-content grid grid-rows-7 grid-cols-12 '>
        <Notifications />
        <Header />
        <Menu />
        {children}
      </body>
    </html>
  );
}
