import s from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.js'

export const Header = (props) => {
  const { totalPrice } = useCart()

  return (
    <header className={s.header}>
      <Link to={'/react-sneakers-shop/'}>
        <div className={s.headerLeft}>
          <img className={s.logo} src="img/logo.png" alt="logo" />
          <div className={s.headerInfo}>
            <h3 className={s.logoTitle}>Sneakers Shop</h3>
            <p className={s.logoSubtitle}>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={s.headerRight}>
        <li className={s.cart}>
          <img
            onClick={props.onClickCart}
            width={18}
            height={18}
            className={s.cartIcon}
            src="img/cart.svg"
            alt="Корзина"
          />
          <span className={s.money}>{totalPrice} руб.</span>
        </li>
        <li className={s.like}>
          <Link to={'/react-sneakers-shop/favorites'}>
            <img
              width={18}
              height={18}
              className={s.likeIcon}
              src="img/like.svg"
              alt="Избранное"
            />
          </Link>
        </li>
        <li>
          <Link to={'/react-sneakers-shop/orders'}>
            <img
              width={18}
              height={18}
              className={s.userIcon}
              src="img/user.svg"
              alt="Пользователь"
            />
          </Link>
        </li>
      </ul>
    </header>
  )
}
