import { useState, useContext } from 'react'
import ProductContext from '../../context/ProductContext'
import ring1 from '../../assets/image1.jpg'
import ring2 from '../../assets/image2.jpg'
import ring3 from '../../assets/image3.jpg'
import styles from '../../styles/Gallery.module.scss'

const Gallery = () => {
  const product = useContext(ProductContext)
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomStyle, setZoomStyle] = useState(null)

  if (!product) return null

  const images = [product.image, ring1, ring2, ring3]

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomStyle({
      backgroundImage: `url(${images[activeIndex]})`,
      backgroundSize: '220%',
      backgroundPosition: `${x}% ${y}%`,
      backgroundRepeat: 'no-repeat',
    })
  }

  return (
    <div className={styles.gallery}>
      <div
        className={`${styles.mainImage} ${zoomStyle ? styles.zoomed : ''}`}
        style={zoomStyle || {}}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomStyle(null)}
      >
        <img
          src={images[activeIndex]}
          fetchpriority="high"
          loading="eager"
          alt={product.title}
          style={{ opacity: zoomStyle ? 0 : 1 }}
        />
      </div>
      <div className={styles.thumbnails}>
        {images.map((img, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${i === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`View image ${i + 1}`}
          >
            <img src={img} alt={`view ${i + 1}`} />
          </button>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery
