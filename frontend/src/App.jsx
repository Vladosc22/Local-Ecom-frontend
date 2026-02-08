import { useEffect, useMemo, useState } from 'react'
import { categoryService } from './categoryService'
import { productService } from './productService'
import CategoryList from './CategoryList'
import ProductGrid from './ProductGrid'
import SearchBar from './SearchBar'
import Header from './Header'
import './App.css'

function App() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    if (!selectedCategory) return
    loadProductsByCategory(selectedCategory)
  }, [selectedCategory])

  const loadCategories = async () => {
    try {
      setLoadingCategories(true)
      setError('')
      const data = await categoryService.getAllCategories()
      const list = Array.isArray(data) ? data : []
      setCategories(list)
      if (list.length > 0 && !selectedCategory) {
        setSelectedCategory(list[0].id)
      }
    } catch (err) {
      setError(`Failed to load categories: ${err.message}`)
      console.error('Error fetching categories:', err)
    } finally {
      setLoadingCategories(false)
    }
  }

  const loadProductsByCategory = async categoryId => {
    try {
      setLoadingProducts(true)
      setError('')
      const data = await productService.getProductsByCategory(categoryId)
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(`Failed to load products: ${err.message}`)
      console.error('Error fetching products:', err)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleCategorySelect = categoryId => {
    setSelectedCategory(categoryId)
    setSearchQuery('')
  }

  const handleSearch = query => {
    setSearchQuery(query)
  }

  const filteredProducts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase()
    if (!normalized) return products
    return products.filter(product => {
      const haystack = `${product?.name ?? ''} ${product?.description ?? ''}`.toLowerCase()
      return haystack.includes(normalized)
    })
  }, [products, searchQuery])

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts]
    switch (sortOrder) {
      case 'price-asc':
        return items.sort((a, b) => (a?.price ?? Infinity) - (b?.price ?? Infinity))
      case 'price-desc':
        return items.sort((a, b) => (b?.price ?? -Infinity) - (a?.price ?? -Infinity))
      case 'name-asc':
        return items.sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? ''))
      case 'name-desc':
        return items.sort((a, b) => (b?.name ?? '').localeCompare(a?.name ?? ''))
      default:
        return items
    }
  }, [filteredProducts, sortOrder])

  const activeCategory = categories.find(category => category.id === selectedCategory)

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          loading={loadingCategories}
        />

        <div className="controls">
          <SearchBar value={searchQuery} onSearch={handleSearch} />
          <label className="sort-control">
            <span>Sort by</span>
            <select
              className="sort-select"
              value={sortOrder}
              onChange={event => setSortOrder(event.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
          </label>
        </div>

        <div className="section-header">
          <div>
            <h2>{activeCategory ? `${activeCategory.name} Products` : 'Products'}</h2>
            <p className="section-subtitle">
              {loadingProducts
                ? 'Loading products…'
                : `${sortedProducts.length} product${sortedProducts.length === 1 ? '' : 's'} found`}
            </p>
          </div>
        </div>

        {error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadCategories}>Retry</button>
          </div>
        ) : null}

        {loadingProducts ? (
          <div className="loading">Loading products…</div>
        ) : (
          <ProductGrid products={sortedProducts} />
        )}
      </main>
    </div>
  )
}

export default App
