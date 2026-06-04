import { useState, useEffect } from 'react'
import { FiShoppingCart, FiX, FiTrash2 } from 'react-icons/fi'
import styles from '../../styles/CartDrawer.module.scss'

const CartDrawer = () => {
  const [open, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const loadCart = () => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(stored)
  }

  useEffect(() => {
    loadCart()
    window.addEventListener('cartUpdated', loadCart)
    return () => window.removeEventListener('cartUpdated', loadCart)
  }, [])

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index)
    localStorage.setItem('cart', JSON.stringify(updated))
    setCartItems(updated)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <button className={styles.cartTrigger} onClick={() => setOpen(true)}>
        <FiShoppingCart size={22} />
        {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
      </button>

      {open && (
        <>
          <div className={styles.overlay} onClick={() => setOpen(false)} />
          <div className={styles.drawer}>
            <div className={styles.header}>
              <h2>Your Cart ({cartItems.length})</h2>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className={styles.empty}>Your cart is empty.</p>
            ) : (
              <>
                <div className={styles.items}>
                  {cartItems.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                      <img src={item.image} alt={item.title} className={styles.itemImg} />
                      <div className={styles.itemDetails}>
                        <p className={styles.itemTitle}>{item.title}</p>
                        <p className={styles.itemMeta}>Color: {item.color} | Size: {item.size} | Qty: {item.quantity}</p>
                        <p className={styles.itemPrice}>${item.price}</p>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeItem(idx)}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <div className={styles.row}>
                    <span>Subtotal ({totalCount} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Shipping</span>
                    <span className={styles.free}>FREE</span>
                  </div>
                  <div className={`${styles.row} ${styles.total}`}>
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default CartDrawer
