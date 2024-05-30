import { AuthForm } from "../components/AuthForm/AuthForm";
import Styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={Styles.login}>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
