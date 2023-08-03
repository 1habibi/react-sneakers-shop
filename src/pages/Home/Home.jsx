import React, { useContext } from 'react'
import { Card } from '../../components/Card/Card.jsx'
import s from './Home.module.scss'
import cs from '../../UI/Carousel/Carousel/Carousel.module.scss'
import { Carousel } from '../../UI/Carousel/Carousel/Carousel.jsx'
import AppContext from '../../context.js'

export const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? [...Array(10).fill({})] : filteredItems).map(
      (data, index) => (
        <Card
          key={index}
          id={data.id}
          title={data.name}
          price={data.price}
          imageUrl={data.imageUrl}
          onPlus={(obj) => {
            onAddToCart(obj)
          }}
          onFavorite={(obj) => {
            onAddToFavorite(obj)
          }}
          loading={isLoading}
        />
      )
    )
  }
  return (
    <main className={s.content}>
      <div className={s.carousel}>
        <Carousel infinite>
          <Carousel.Page>
            <div className={cs.item}>
              <img className={cs.img} src="img/carousel/1.png" alt="carousel" />
            </div>
          </Carousel.Page>
          <Carousel.Page>
            <img src="img/carousel/1.png" alt="carousel" />
          </Carousel.Page>
        </Carousel>
      </div>
      <div className={s.contentHeader}>
        <h1 className={s.title}>
          {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <div className={s.searchBlock}>
          <img className={s.searchIcon} src="img/search.svg" alt="search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            className={s.input}
            type="text"
            placeholder="Поиск"
          />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue('')
              }}
              className={s.removeBtn}
              src="img/btn-remove.svg"
              alt="close-btn"
            />
          )}
        </div>
      </div>
      <div className={s.cards}>{renderItems()}</div>
    </main>
  )
}
