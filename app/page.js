"use client";

import { Banner } from "./components/Banner/Banner";
import { CardListSection } from "./components/CardsListSection/CardListSection";
import { Promo } from "./components/Promo/Promo";
import { endpoints } from "./api/config";
import { useGetDataByCategory } from "./api/api-hooks";
import Preloader from "./components/Preloader/Preloader";

export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games, "popular");
  const newGames = useGetDataByCategory(endpoints.games, "new");

  return (
    <main className="main">
      <Banner />
      {popularGames && newGames ? (
        <>
          <CardListSection
            id="popular"
            title="Популярное"
            data={popularGames}
            type="slider"
          />
          <CardListSection
            id="new"
            title="Новинки"
            data={newGames}
            type="slider"
          />
        </>
      ) : (
        <Preloader />
      )}
      <Promo />
    </main>
  );
}
