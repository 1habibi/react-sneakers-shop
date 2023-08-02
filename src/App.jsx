import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header.jsx'
import { CartDrawer } from './components/CartDrawer/CartDrawer.jsx'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Home } from './pages/Home/Home.jsx'
import s from './App.module.scss'
import { Favorites } from './pages/Favorites/Favorites.jsx'
import AppContext from './context.js'
import { Orders } from './pages/Orders/Orders.jsx'

export const App = () => {
  // Склелетон
  const [isLoading, setIsLoading] = useState(true)

  // Загрузка данных с mock.API
  useEffect(() => {
    async function fetchData() {
      try {
        // const cartResponse = await axios.get(
        //   "https://64ada5e2b470006a5ec63bab.mockapi.io/cart"
        // );
        // const favoritesResponse = await axios.get(
        //   "https://64b3b4800efb99d8626849cf.mockapi.io/favorites"
        // );
        // const itemsResponse = await axios.get(
        //   "https://64ada5e2b470006a5ec63bab.mockapi.io/items"
        // );
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://64ada5e2b470006a5ec63bab.mockapi.io/cart'),
            axios.get('https://64b3b4800efb99d8626849cf.mockapi.io/favorites'),
            axios.get('https://64ada5e2b470006a5ec63bab.mockapi.io/items'),
          ])
        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (e) {
        alert('Ошибка выполнения запроса')
        console.log(e)
      }
    }
    fetchData()
  }, [])

  // Состояние корзины (открыта/закрыта)
  const [cartOpened, setCartOpened] = useState(false)

  // Кроссовки
  const [items, setItems] = useState([])

  // Избранное
  const [favorites, setFavorites] = useState([])
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://64b3b4800efb99d8626849cf.mockapi.io/favorites/${obj.id}`
        )
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        const { data } = await axios.post(
          'https://64b3b4800efb99d8626849cf.mockapi.io/favorites',
          obj
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (e) {
      alert('Не удалось добавить в избранное')
      console.log(e)
    }
  }

  // Работа с Корзиной
  const [cartItems, setCartItems] = useState([])
  // Нажатие на плюсик на карточке
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (cartObj) => Number(cartObj.parentID) === Number(obj.id)
      )
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentID) !== Number(obj.id))
        )
        await axios.delete(
          `https://64ada5e2b470006a5ec63bab.mockapi.io/cart/${findItem.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(
          'https://64ada5e2b470006a5ec63bab.mockapi.io/cart',
          obj
        )
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentID === data.parentID) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (e) {
      alert('Не удалось добавить в корзину')
      console.log(e)
    }
  }
  // Удаление через корзину
  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      )
      axios.delete(`https://64ada5e2b470006a5ec63bab.mockapi.io/cart/${id}`)
    } catch (e) {
      alert('Ошибка выполнения запроса')
      console.log(e)
    }
  }

  // Работа с поиском
  const [searchValue, setSearchValue] = useState('')
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  // Проверка на наличие товара в корзине
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentID) === Number(id))
  }

  const isItemFavorite = (id) => {
    return favorites.some((favItem) => favItem.parentID === id)
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className={s.wrapper}>
        <CartDrawer
          onClickClose={() => {
            setCartOpened(false)
          }}
          onRemove={onRemoveItem}
          items={cartItems}
          opened={cartOpened}
        />
        <Header
          onClickCart={() => {
            window.scrollTo(0, 0)
            setCartOpened(true)
          }}
        />
        <Routes>
          <Route
            path={'/'}
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path={'/favorites'} element={<Favorites />}></Route>
          <Route path={'/orders'} element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}
