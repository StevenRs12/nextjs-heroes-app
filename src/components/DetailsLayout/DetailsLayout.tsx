import React from "react";
import BannerDetails from "../BannerDetails/BannerDetails";
import ComicsSection from "../ComicsSection/ComicsSection";
import { Hero, Comic } from "@/interfaces/interfaces";
interface DetailsLayoutProps {
  hero: Hero;
  comics: Comic[];
}

const DetailsLayout: React.FC<DetailsLayoutProps> = ({ hero, comics }) => {
  return (
    <>
      <BannerDetails hero={hero} />
      <ComicsSection comics={comics} />
    </>
  );
};

export default DetailsLayout;
