"use client";

import Styles from "./RegisterForm.module.css";
import { useState } from "react";
import { register } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ status: null, text: null });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleClickRegister = async (e) => {
    e.preventDefault();
    console.log(registerData);
    const newUserData = await register(endpoints.register, registerData);
    if (newUserData && !newUserData.error) {
      setMessage({ status: "success", text: "Вы зарегистрировались!" });
    } else {
      setMessage({ status: "error", text: "Ошибка при регистрации!" });
    }
  };

  const clickRegBtn = () => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <form onSubmit={handleClickRegister} className={Styles["form"]}>
      <h2 className={Styles["form__title"]}>Регистрация</h2>
      <div className={Styles["form__fields"]}>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>UserName</span>
          <input
            className={Styles["form__field-input"]}
            name="username"
            type="username"
            placeholder="helloWorld"
            onChange={handleChange}
          />
        </label>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Email</span>
          <input
            className={Styles["form__field-input"]}
            name="email"
            type="email"
            placeholder="hello@world.com"
            onChange={handleChange}
          />
        </label>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Пароль</span>
          <input
            className={Styles["form__field-input"]}
            name="password"
            type="password"
            placeholder="***********"
            onChange={handleChange}
          />
        </label>
      </div>
      {message.status && (
        <p className={Styles["form__message"]}>{message.text}</p>
      )}
      <div className={Styles["form__actions"]}>
        <button className={Styles["form__reset"]} type="reset">
          Очистить
        </button>
        <button
          className={Styles["form__submit"]}
          type="submit"
          onClick={clickRegBtn}
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
