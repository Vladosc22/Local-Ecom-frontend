import api from './api'

const PRODUCTS_ENDPOINT = '/api/products'

export const productService = {
  getProductsByCategory: categoryId => {
    return api.get(`${PRODUCTS_ENDPOINT}/category/${categoryId}`)
  },
}
