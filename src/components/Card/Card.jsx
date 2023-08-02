import React from 'react'
import s from './Card.module.scss'
import { useContext, useState } from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../../context.js'

export const Card = ({
  id,
  onFavorite,
  onPlus,
  imageUrl,
  title,
  price,
  loading = false,
}) => {
  const { isItemAdded, isItemFavorite } = useContext(AppContext)

  const [isFavorite, setIsFavorite] = useState(isItemFavorite)

  const onPlusClick = () => {
    onPlus({ id, parentID: id, imageUrl, title, price, qty: 1 })
  }

  const onFavoriteClick = () => {
    onFavorite({ id, parentID: id, imageUrl, title, price })
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={s.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={168}
          height={187}
          viewBox="0 0 168 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="124" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="155" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="149" rx="8" ry="8" width="32" height="32" />
          <rect x="0" y="104" rx="3" ry="3" width="150" height="15" />
        </ContentLoader>
      ) : (
        <>
          <div>
            <div className={s.favorite}>
              {onFavorite && (
                <button onClick={onFavoriteClick}>
                  <img
                    src={
                      isItemFavorite(id)
                        ? './img/heart-liked.svg'
                        : './img/heart-unliked.svg'
                    }
                    alt="heart-unliked"
                  />
                </button>
              )}
            </div>
            <img className={s.photo} src={imageUrl} alt="sneaker" />
            <p className={s.cardTitle}>{title}</p>
          </div>
          <div className={s.cardBottom}>
            <div>
              <p className={s.priceLabel}>Цена:</p>
              <p className={s.price}>{price} руб.</p>
            </div>
            {onPlus && (
              <button onClick={onPlusClick}>
                <img
                  src={
                    isItemAdded(id) ? './img/btn-checked.svg' : './img/plus.svg'
                  }
                  alt="addBtn"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
