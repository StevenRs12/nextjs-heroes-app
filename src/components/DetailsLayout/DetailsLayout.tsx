"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useHeroDetails } from "@/hooks/useHeroDetails";
import Loader from "../Loader/Loader";
import BannerDetails from "../BannerDetails/BannerDetails";
import ComicsSection from "../ComicsSection/ComicsSection";

const HeroDetailPage = () => {
  const { id } = useParams();
  const heroId = Array.isArray(id) ? id[0] : id;

  const { hero, comics, loading, error } = useHeroDetails(heroId);

  if (loading) return <Loader />;
  if (error) return <p>Error {error} </p>;

  return (
    <>
      <BannerDetails hero={hero} />
      <ComicsSection comics={comics} />
    </>
  );
};

export default HeroDetailPage;
