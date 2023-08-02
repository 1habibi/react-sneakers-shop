import React, { useEffect, useState } from 'react'
import s from './Orders.module.scss'
import { Card } from '../../components/Card/Card.jsx'
import axios from 'axios'

export const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          'https://64b3b4800efb99d8626849cf.mockapi.io/orders'
        )
        setIsLoading(false)
        setOrders(data)
      } catch (error) {
        alert('Ошибка при выполнении запроса')
      }
    }
    fetchData()
  }, [])
  const renderOrders = (order) => {
    console.log(order)
    return (isLoading ? [...Array(10).fill({})] : order).map((data, index) => (
      <Card
        key={index}
        id={data.id}
        title={data.title}
        price={data.price}
        imageUrl={data.imageUrl}
        loading={isLoading}
      />
    ))
  }

  return (
    <main className={s.content}>
      <div className={s.contentHeader}>
        <h1 className={s.title}>Мои заказы</h1>
      </div>
      <div>
        {orders.map((order, index) => (
          <div className={s.order} key={index}>
            <div className={s.order_number}>Заказ №{order.id}</div>
            <div className={s.items}>{renderOrders(order.items)}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
