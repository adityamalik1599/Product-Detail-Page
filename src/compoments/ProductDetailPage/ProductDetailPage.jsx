import { useContext } from 'react'
import ProductContext from '../../context/ProductContext'
import Gallery from '../Gallery/Gallery'
import ProductInfo from '../ProductInfo/ProductInfo'
import ProductTabs from '../ProductTabs/ProductTabs'
import styles from '../../styles/ProductDetailPage.module.scss'

const ProductDetailPage = () => {
  const product = useContext(ProductContext)

  if (!product) {
    return <div className={styles.loading}>Loading product...</div>
  }

  return (
    <main className={styles.page}>
      <div className={styles.pdpGrid}>
        <div className={styles.galleryCol}>
          <Gallery />
        </div>
        <div className={styles.infoCol}>
          <ProductInfo />
        </div>
      </div>
      <ProductTabs />
    </main>
  )
}

export default ProductDetailPage
