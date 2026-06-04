import { useEffect, useState } from 'react'
import './index.css'
import ProductContext from './context/ProductContext'
import { getProductData } from './services/api'
import Header from './compoments/Header/Header'
import ProductDetailPage from './compoments/ProductDetailPage/ProductDetailPage'

function App() {
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getProductData()
      .then(setProduct)
      .catch(() => setError(true))
  }, [])

  if (error) {
    return <div className='errorPage'>Failed to load product. Please refresh.</div>
  }

  return (
    <ProductContext.Provider value={product}>
      <Header />
      <ProductDetailPage />
    </ProductContext.Provider>
  )
}

export default App
