import React from "react";
import { Metadata } from "next";

import { FavoriteProvider } from "../contexts/FavoriteContext";
import { textFonts } from "../config/fonts";
import Header from "@/components/Header/Header";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Marvel",
  description: "Characters Marvel",
  icons: {
    icon: "/logo.svg", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={textFonts.className}>
        <FavoriteProvider>
          <Header />
          <div>{children}</div>
        </FavoriteProvider>
      </body>
    </html>
  );
}
