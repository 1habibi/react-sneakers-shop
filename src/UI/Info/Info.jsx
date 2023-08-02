import React, { useContext } from "react";
import s from "./Info.module.scss";
import AppContext from "../../context.js";
import { GreenBtn } from "../GreenBtn/GreenBtn.jsx";

export const Info = ({ title, text, imgUrl }) => {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className={s.cartEmpty}>
      <img height={120} src={imgUrl} alt="cart-info" />
      <h2 className={s.cartEmptyTitle}>{title}</h2>
      <p className={s.cartEmptyDescription}>{text}</p>
      <GreenBtn
        icon={"./img/back-arrow.svg"}
        text={"Назад"}
        pos={"right"}
        onClick={() => setCartOpened(false)}
      />
    </div>
  );
};
