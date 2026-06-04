import styles from '../../styles/Header.module.scss'
import { FiShoppingCart } from 'react-icons/fi'
import CartDrawer from '../CartDrawer/CartDrawer'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Nua Assignment</div>
      <CartDrawer />
    </header>
  )
}

export default Header
