import { useContext } from 'react'
import AppContext from '../context.js'

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce(
    (acc, cartItem) => cartItem.price * cartItem.qty + acc,
    0
  )
  return { cartItems, setCartItems, totalPrice }
}
