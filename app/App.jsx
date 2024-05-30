"use client";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { useEffect, useState } from "react";
import { getJWT, setJWT, removeJWT, getMe } from "./api/api-utils";
import { endpoints } from "./api/config";

import { AuthContext } from "./context/app-context";

import { useStore } from "./store/app-store";

export const App = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const store = useStore();

  //   const login = (user, token) => {
  //     setIsAuth(true);
  //     setUser(user);
  //     setToken(token);
  //     setJWT(token);
  //   };

  //   const logout = () => {
  //     setIsAuth(false);
  //     setUser(null);
  //     setToken("");
  //     removeJWT();
  //   };

  //   const checkAuth = async () => {
  //     const token = getJWT();
  //     if (token) {
  //       const me = await getMe(endpoints.me, token);
  //       if (me) {
  //         login(me, token);
  //       } else {
  //         logout();
  //       }
  //     }
  //   };

  useEffect(() => {
    // async function check() {
    //   await checkAuth();
    // }
    // check();
    store.checkAuth();
  }, []);

  return (
    <>
      {/* <AuthContext.Provider value={{ isAuth, user, token, login, logout }}> */}
      <Header />
      {props.children}
      <Footer />
      {/* </AuthContext.Provider> */}
    </>
  );
};
