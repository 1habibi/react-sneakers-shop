import React, { useEffect, useState } from 'react'
import s from './QtyInput.module.scss'
import axios from 'axios'
export const QtyInput = ({ item }) => {
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setQty(item.qty)
  }, [])
  const handlePlus = async () => {
    if (qty < 10) {
      try {
        setQty((prev) => prev + 1)
        await axios.put(
          `https://64ada5e2b470006a5ec63bab.mockapi.io/cart/${item.id}`,
          {
            ...item,
            qty: qty + 1,
          }
        )
      } catch (error) {
        console.log('Ошибка при выполнении запроса')
      }
    }
  }

  const handleMinus = async () => {
    if (qty > 1) {
      try {
        setQty((prev) => prev - 1)
        await axios.put(
          `https://64ada5e2b470006a5ec63bab.mockapi.io/cart/${item.id}`,
          {
            ...item,
            qty: qty - 1,
          }
        )
      } catch (error) {
        console.log('Ошибка при выполнении запроса')
      }
    }
  }

  return (
    <div className={s.qtyInput}>
      <span
        onClick={handleMinus}
        className={`${s.change} ${qty === 1 ? s.disabled : ''}`}
      >
        -
      </span>
      <input
        type="text"
        name={'qty'}
        value={qty}
        disabled={''}
        readOnly={true}
      />
      <span
        onClick={handlePlus}
        className={`${s.change} ${qty === 10 ? s.disabled : ''}`}
      >
        +
      </span>
    </div>
  )
}
