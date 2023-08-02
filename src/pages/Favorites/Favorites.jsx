import { Card } from "../../components/Card/Card.jsx";
import React, { useContext } from "react";
import s from "./Favorites.module.scss";
import AppContext from "../../context.js";

export const Favorites = () => {
  // Достаем данные из контекста
  const { favorites, onAddToFavorite } = useContext(AppContext);

  return (
    <main className={s.content}>
      <div className={s.contentHeader}>
        <h1 className={s.title}>Мои закладки</h1>
      </div>
      <div className={s.cards}>
        {favorites.map((data, index) => (
          <Card
            favorited={true}
            key={index}
            title={data.title}
            price={data.price}
            imageUrl={data.imageUrl}
            onFavorite={(obj) => {
              onAddToFavorite(obj);
            }}
            id={data.id}
          />
        ))}
      </div>
    </main>
  );
};
