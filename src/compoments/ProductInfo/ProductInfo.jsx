import { useContext, useState, useEffect } from 'react'
import ProductContext from '../../context/ProductContext'
import { COLORS, SIZES } from '../../data/productConfig'
import styles from './ProductInfo.module.scss'
import { TbTruckDelivery } from "react-icons/tb"

const Stars = ({ rate }) => (
  <span className={styles.stars}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(rate) ? styles.starOn : styles.starOff}>{'\u2605'}</span>
    ))}
  </span>
)

const ProductInfo = () => {
  const product = useContext(ProductContext)

  const params = new URLSearchParams(window.location.search)
  const [selectedColor, setSelectedColor] = useState(params.get('color') || COLORS[0].id)
  const [selectedSize, setSelectedSize] = useState(params.get('size') || '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const currentSize = SIZES.find(s => s.id === selectedSize)
  const maxQty = currentSize?.stock ?? 0
  const isSoldOut = currentSize ? currentSize.stock === 0 : false
  const isLowStock = currentSize ? currentSize.stock > 0 && currentSize.stock <= 2 : false

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    p.set('color', selectedColor)
    if (selectedSize) p.set('size', selectedSize)
    window.history.replaceState({}, '', `${window.location.pathname}?${p.toString()}`)
  }, [selectedColor, selectedSize])

  useEffect(() => {
    setQuantity(1)
  }, [selectedSize])

  if (!product) return null

  const handleAddToCart = () => {
    if (!selectedSize || isSoldOut) return

    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      color: COLORS.find(c => c.id === selectedColor)?.label,
      size: selectedSize,
      quantity,
    }

    const existing = JSON.parse(localStorage.getItem('cart') || '[]')

    const sameItemIndex = existing.findIndex(
      item => item.id === cartItem.id
    )

    if (sameItemIndex >= 0) {
      existing[sameItemIndex] = cartItem 
    } else {
      existing.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(existing))
    window.dispatchEvent(new Event('cartUpdated'))

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const originalPrice = (product.price * 1.25).toFixed(2)

  return (
    <div className={styles.info}>

      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.meta}>
        <Stars rate={product.rating.rate} />
        <span className={styles.ratingText}>
          {product.rating.rate} ({product.rating.count} reviews)
        </span>
        <span className={styles.sep}>|</span>
        <span className={styles.brand}>Brand: <strong>FakeStore</strong></span>
      </div>

      <div className={styles.pricing}>
        <span className={styles.salePrice}>${product.price}</span>
        <span className={styles.originalPrice}>${originalPrice}</span>
        <span className={styles.discountBadge}>20% OFF</span>
      </div>

      <p className={styles.description}>{product.description}</p>

      <div className={styles.section}>
        <p className={styles.label}>
          Color: <strong>{COLORS.find(c => c.id === selectedColor)?.label}</strong>
        </p>
        <div className={styles.swatches}>
          {COLORS.map(color => (
            <button
              key={color.id}
              className={`${styles.swatch} ${selectedColor === color.id ? styles.swatchActive : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.id)}
              title={color.label}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>
          Size: <strong>{selectedSize || 'Select a size'}</strong>
        </p>
        <div className={styles.sizeRow}>
          {SIZES.map(size => (
            <button
              key={size.id}
              className={[
                styles.sizeBtn,
                selectedSize === size.id ? styles.sizeBtnActive : '',
                size.stock === 0 ? styles.sizeBtnSoldOut : '',
              ].join(' ')}
              onClick={() => size.stock > 0 && setSelectedSize(size.id)}
              disabled={size.stock === 0}
              title={size.stock === 0 ? 'Sold out' : size.stock <= 2 ? `Only ${size.stock} left` : ''}
            >
              {size.label}
              {size.stock > 0 && size.stock <= 2 && <span className={styles.lowDot} />}
            </button>
          ))}
        </div>
        {selectedSize && isSoldOut && (
          <p className={styles.soldOutMsg}>This size is sold out</p>
        )}
        {isLowStock && (
          <p className={styles.lowStockMsg}>Only {currentSize.stock} items left!</p>
        )}
        {selectedSize && !isSoldOut && !isLowStock && (
          <p className={styles.inStockMsg}>In Stock: {maxQty} items</p>
        )}
      </div>

      {selectedSize && !isSoldOut && (
        <div className={styles.section}>
          <p className={styles.label}>Quantity</p>
          <div className={styles.qtyPicker}>
            <button
              className={styles.qtyBtn}
              onClick={() => setQuantity(q => Math.max(q - 1, 1))}
              disabled={quantity <= 1}
            >−</button>
            <span className={styles.qtyVal}>{quantity}</span>
            <button
              className={styles.qtyBtn}
              onClick={() => setQuantity(q => Math.min(q + 1, maxQty))}
              disabled={quantity >= maxQty}
            >+</button>
            <span className={styles.qtyMax}>(Max: {maxQty})</span>
          </div>
        </div>
      )}

      <div className={styles.ctaRow}>
        <button
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={!selectedSize || isSoldOut}
        >
          {added ? 'Added!' : isSoldOut ? 'Sold Out' : !selectedSize ? 'Select a Size' : 'Add to Cart'}
        </button>
      </div>

      {selectedSize && !isSoldOut && (
        <div className={styles.delivery}>
          <TbTruckDelivery />
          <div>
            <strong>Estimated Delivery</strong>
            <p>Deliver to 110001 &nbsp;|&nbsp; 3-5 business days</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductInfo
