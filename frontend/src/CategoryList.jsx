import './CategoryList.css'

function CategoryList({ categories, selectedCategory, onCategorySelect, loading }) {
  if (loading) {
    return (
      <div className="category-list">
        <p className="category-title">Categories</p>
        <p className="category-empty">Loading categories…</p>
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="category-list">
        <p className="category-title">Categories</p>
        <p className="category-empty">No categories found.</p>
      </div>
    )
  }

  return (
    <div className="category-list">
      <p className="category-title">Categories</p>
      <div className="category-chips">
        {categories.map(category => (
          <button
            key={category.id}
            type="button"
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
