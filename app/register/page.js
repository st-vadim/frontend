import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import Styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className={Styles.register}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
