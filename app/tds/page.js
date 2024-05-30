"use client";

import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import Preloader from "../components/Preloader/Preloader";
import { CardListSection } from "../components/CardsListSection/CardListSection";

export default function Tds() {
  const TDS = useGetDataByCategory(endpoints.games, "TDS");
  return (
    <main className="main-inner">
      {TDS ? (
        <CardListSection id="TDS" title="TDS" data={TDS} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}
