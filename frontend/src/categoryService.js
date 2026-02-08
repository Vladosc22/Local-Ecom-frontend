import api from './api'

const CATEGORIES_ENDPOINT = '/api/categories'

export const categoryService = {
  getAllCategories: () => {
    return api.get(CATEGORIES_ENDPOINT)
  },
}
