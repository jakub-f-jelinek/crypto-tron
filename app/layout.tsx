import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/utils/page.scss";
import QueryProvider from "./hooks/QueryProvider";
import { DataProvider } from "./hooks/Provider";
import { Header } from "./components/Header/Header";
import ReduxProvider from "./redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Calculator",
  description: "Calculate your profit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <QueryProvider>
          <ReduxProvider>
            <Header />
            <main>{children}</main>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
