import React, { useContext } from "react";
import s from "./Page.module.scss";
import { CarouselContext } from "../carousel-context.js";

export const Page = ({ children }) => {
  const { width } = useContext(CarouselContext);
  return (
    <div
      className={s.pageMainContainer}
      style={{
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
      }}
    >
      {children}
    </div>
  );
};
