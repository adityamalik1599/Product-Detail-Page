import { useState, useContext } from 'react'
import ProductContext from '../../context/ProductContext'
import { SPECIFICATIONS, STATIC_REVIEWS } from '../../data/productConfig'
import styles from './ProductTabs.module.scss'

const TABS = ['Details', 'Specifications', 'Reviews']

const ProductTabs = () => {
  const product = useContext(ProductContext)
  const [active, setActive] = useState(0)

  if (!product) return null

  return (
    <div className={styles.tabs}>
      <div className={styles.tabBar}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${active === i ? styles.tabBtnActive : ''}`}
            onClick={() => setActive(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {active === 0 && (
          <div className={styles.details}>
            <h3>Product Details</h3>
            <p>{product.description}</p>
            <ul>
              <li>Premium quality materials</li>
              <li>Lightweight and durable design</li>
              <li>Suitable for everyday wear</li>
              <li>Includes original packaging</li>
            </ul>
          </div>
        )}

        {active === 1 && (
          <table className={styles.specsTable}>
            <tbody>
              {SPECIFICATIONS.map(({ key, value }) => (
                <tr key={key}>
                  <td className={styles.specKey}>{key}</td>
                  <td className={styles.specVal}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {active === 2 && (
          <div className={styles.reviews}>
            {STATIC_REVIEWS.map(review => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewAuthor}>{review.author}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <p className={styles.reviewBody}>{review.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
