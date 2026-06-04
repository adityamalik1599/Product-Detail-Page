const getProductData = async () =>{
  const response = await fetch('https://fakestoreapi.com/products/6')
  if (!response.ok) throw new Error('Failed to fetch product')
  return response.json()
} 
export {getProductData}
 