import React from "react";

import { textFonts } from "@/config/fonts";
import HomeLayout from "@/components/HomeLayout/HomeLayout";

export default function Home() {

  return (
    <main className={textFonts.className}>
      <HomeLayout />
    </main>
  );
}
