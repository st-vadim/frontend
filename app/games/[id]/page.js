"use client";

import Styles from "./Game.module.css";
import { GameNotFound } from "@/app/components/GameNotFound/GameNotFound";
import { useEffect, useState } from "react";
import { endpoints } from "@/app/api/config";
import {
  isResponseOk,
  getNormalizedGameDataById,
  checkIfUserVoted,
  vote,
} from "@/app/api/api-utils";
import Preloader from "@/app/components/Preloader/Preloader";

import { useStore } from "@/app/store/app-store";

const GamePage = (props) => {
  const [game, setGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const authContext = useStore();

  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true);
      const game = await getNormalizedGameDataById(
        endpoints.games,
        props.params.id
      );
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    authContext.user && game
      ? setIsVoted(checkIfUserVoted(game, authContext.user.id))
      : setIsVoted(false);
  }, [authContext.user, game]);

  useEffect(() => {
    if (authContext.user && game) {
      setIsVoted(checkIfUserVoted(game, authContext.user.id));
    } else {
      setIsVoted(false);
    }
  }, [authContext.user, game]);

  // Update API
  const handleVote = async () => {
    const jwt = authContext.token;
    let usersArray = game.users.map((user) => user.id);

    if (isVoted) {
      usersArray = usersArray.filter((id) => id !== authContext.user.id);
    } else {
      usersArray.push(authContext.user.id);
    }

    if (jwt) {
      const response = await vote(
        `${endpoints.games}/${game.id}`,
        jwt,
        usersArray
      );

      if (isResponseOk(response)) {
        if (isVoted) {
          setIsVoted(false);
          setGame({
            ...game,
            users: game.users.filter((user) => user.id !== authContext.user.id),
          });
        } else {
          setGame({
            ...game,
            users: [...game.users, authContext.user],
          });
          setIsVoted(true);
        }
      }
    }
  };

  return (
    <main className="main">
      {game ? (
        <>
          <section className={Styles["game"]}>
            <iframe className={Styles["game__iframe"]} src={game.link}></iframe>
          </section>
          <section className={Styles["about"]}>
            <h2 className={Styles["about__title"]}>{game.title}</h2>
            <div className={Styles["about__content"]}>
              <p className={Styles["about__description"]}>{game.description}</p>
              <div className={Styles["about__author"]}>
                <p>
                  Автор:{" "}
                  <span className={Styles["about__accent"]}>
                    {game.developer}
                  </span>
                </p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>
                За игру уже проголосовали:{" "}
                <span className={Styles["about__accent"]}>
                  {game.users.length}
                </span>
              </p>
              <button
                disabled={!authContext.isAuth}
                className={`button ${Styles["about__vote-button"]}`}
                onClick={handleVote}
              >
                {isVoted ? "Удалить голос" : "Голосовать"}
              </button>
            </div>
          </section>
        </>
      ) : preloaderVisible ? (
        <Preloader />
      ) : (
        <section className={Styles["game"]}>
          <GameNotFound />
        </section>
      )}
    </main>
  );
};

export default GamePage;
