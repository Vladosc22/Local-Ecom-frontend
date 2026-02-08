import './ProductCard.css'

const FALLBACK_IMAGE = 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image'

function ProductCard({ product }) {
  const price = Number.isFinite(product?.price) ? product.price.toFixed(2) : '—'
  const categoryName = product?.category?.name ?? 'Uncategorized'
  const imageSrc = product?.imageUrl || FALLBACK_IMAGE

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={imageSrc}
          alt={product?.name || 'Product image'}
          className="product-image"
          onError={event => {
            event.target.src = FALLBACK_IMAGE
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product?.name || 'Untitled product'}</h3>
        <p className="product-description">{product?.description || 'No description provided.'}</p>
        <div className="product-footer">
          <span className="product-price">${price}</span>
          <span className="product-category">{categoryName}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
