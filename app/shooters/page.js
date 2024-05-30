"use client";

import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import Preloader from "../components/Preloader/Preloader";
import { CardListSection } from "../components/CardsListSection/CardListSection";

export default function Shooters() {
  const shooter = useGetDataByCategory(endpoints.games, "shooter");
  return (
    <main className="main-inner">
      {shooter ? (
        <CardListSection id="shooter" title="Шутеры" data={shooter} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}
