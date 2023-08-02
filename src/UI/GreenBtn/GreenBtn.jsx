import s from "./GreenBtn.module.scss";
import React from "react";

export const GreenBtn = ({ icon, text, pos, isLoading, onClick }) => {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`${s.greenBtn} ${
        pos === "right"
          ? s.greenBtn_right
          : pos === "left"
          ? s.greenBtn_left
          : ""
      }`}
    >
      {text}
      {icon && <img src={icon} alt="arrow" />}
    </button>
  );
};
