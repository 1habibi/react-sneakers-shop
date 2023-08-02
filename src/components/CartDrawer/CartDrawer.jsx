import '../../App.module.scss'
import React from 'react'
import s from './CartDrawer.module.scss'
import { Info } from '../../UI/Info/Info.jsx'
import axios from 'axios'
import { useCart } from '../../hooks/useCart.js'
import { GreenBtn } from '../../UI/GreenBtn/GreenBtn.jsx'
import { QtyInput } from '../../UI/QtyInput/QtyInput.jsx'

// Обход блокировки MockAPI. Задержка между запросами. КОСТЫЛЬ!
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const CartDrawer = ({ opened, onClickClose, onRemove, items = [] }) => {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = React.useState(null)

  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const tax = totalPrice * 0.05

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        'https://64b3b4800efb99d8626849cf.mockapi.io/orders',
        {
          items: cartItems,
        }
      )
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          'https://64ada5e2b470006a5ec63bab.mockapi.io/cart/' + item.id
        )
        await delay(1000)
      }
    } catch (error) {
      alert('Не удалось создать заказ')
    }
    setIsLoading(false)
  }
  return (
    <div className={`${s.overlay} ${opened ? s.overlayVisible : ''}`}>
      <div className={s.drawer}>
        <h2 className={s.drawerTitle}>
          Корзина{' '}
          <img
            onClick={onClickClose}
            className={s.removeBtn}
            src="./img/btn-remove.svg"
            alt="close-btn"
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div className={s.cartItems}>
              {items.map((item, index) => (
                <div key={index} className={s.cartItem}>
                  <div
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                    }}
                    className={s.cartItemImg}
                  ></div>
                  <div className={s.cartItem_title}>
                    <p>{item.title}</p>
                    <b>{item.price} руб.</b>
                    <QtyInput item={item} />
                  </div>
                  <img
                    className={s.removeBtn}
                    src="./img/btn-remove.svg"
                    alt="remove-btn"
                    onClick={() => onRemove(item.id)}
                  />
                </div>
              ))}
            </div>
            <div className={s.cartBottom}>
              <div className={s.cardTotal}>
                <div className={s.cost}>
                  <span>Итого:</span>
                  <div></div>
                  <b>{Math.ceil(totalPrice + tax)} руб.</b>
                </div>
                <div className={s.cost}>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.ceil(tax)} руб.</b>
                </div>
              </div>
              <div>
                <GreenBtn
                  icon={'./img/arrow.svg'}
                  text={'Оформить заказ'}
                  isLoading={isLoading}
                  pos={'right'}
                  onClick={onClickOrder}
                />
              </div>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            text={
              isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            imgUrl={
              isOrderComplete
                ? './img/complete-order.png'
                : './img/empty-box.png'
            }
            onClick={onClickClose}
          />
        )}
      </div>
    </div>
  )
}
