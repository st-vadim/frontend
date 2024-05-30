import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  return (
    <div
      className={`${Styles["overlay"]} ${
        props.isOpen && Styles["overlay_is-opened"]
      }`}
      onClick={props.close}
    ></div>
  );
};
