import Styles from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={Styles["preloader"]}>
      <img src="/images/preloader.gif" />
    </div>
  );
};

export default Preloader;
