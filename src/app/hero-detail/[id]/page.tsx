import { textFonts } from "@/config/fonts";
import DetailsLayout from "@/components/DetailsLayout/DetailsLayout";
import React from "react";

const HeroDetailPage = () => {

  return (
    <main className={textFonts.className}>
      <DetailsLayout />
    </main>
  );
};

export default HeroDetailPage;
