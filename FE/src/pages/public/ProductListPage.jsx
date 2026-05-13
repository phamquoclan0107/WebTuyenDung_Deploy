import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService } from '../../services/productService'
import { useCategories } from '../../hooks/useCategories'
import { useNavigate, useLocation } from 'react-router-dom'
import SEO from '../../components/seo/SEO' 
export default function ProductListPage() {
  const navigate = useNavigate()
  const { pathname }   = useLocation()
  const { categories } = useCategories('PRODUCT')
  const [products, setProducts]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [categoryId, setCategoryId] = useState('')
  const [name, setName]             = useState('')
  const [nameInput, setNameInput]   = useState('')
  const [page, setPage]             = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal]           = useState(0)
  const [filterOpen, setFilterOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const fetchProducts = (params = {}) => {
    setLoading(true)
    setError(null)
    productService.search({
      isActive: true,
      size: 20,
      sort: 'createdAt,desc',
      ...params,
    })
      .then((data) => {
        setProducts(data.content || [])
        setTotalPages(data.totalPages || 0)
        setTotal(data.totalElements || 0)
      })
      .catch((err) => setError(err?.message || 'Lỗi hệ thống. Vui lòng thử lại sau.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts({
      page,
      categoryId: categoryId || undefined,
      name: name || undefined,
    })
  }, [page, categoryId, name])

  const handleSearch = () => {
    setPage(0)
    setName(nameInput)
    setFilterOpen(false)
  }

  const handleReset = () => {
    setNameInput('')
    setName('')
    setCategoryId('')
    setPage(0)
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <SEO
        title={pathname === '/'
          ? 'Công ty Cổ phần Dược phẩm CKM'
          : 'Danh sách sản phẩm chăm sóc mắt.'}
        description={pathname === '/'
          ? 'Công ty Cổ phần Dược phẩm CKM'
          : 'Chuyên cung cấp sản phẩm chăm sóc mắt chuyên khoa, uy tín, chất lượng cao tại Việt Nam.'}
        url={pathname}
      />
      <style>{`
  .product-layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }
  .product-sidebar {
    width: 220px;
    flex-shrink: 0;
    position: sticky;
    top: 94px;
    align-self: flex-start;
  }
  .filter-toggle-btn {
    display: none;
  }
  .product-sidebar-inner {
    display: block;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    
    z-index: 10;
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 16px;
  }

  @media (max-width: 768px) {
    .product-layout {
      flex-direction: column;
    }
    .product-sidebar {
      width: 100%;
      top:85px;
      z-index: 20;
    }
    .filter-toggle-btn {
      display: flex;
      width: 100%;
      padding: 10px 16px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      cursor: pointer;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      box-sizing: border-box;
    }
    .product-sidebar-inner {
      display: none;
      position: static;
      top: unset;
    }
    .product-sidebar-inner.open {
      display: block;
    }
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      width: 100%;
    }
  }
`}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px', boxSizing: 'border-box' }}>
        {/* <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Sản phẩm</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>{total} sản phẩm</p> */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Sản phẩm</h1>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 0 }}>{total} sản phẩm</p>
          </div>

          {/* Hình ảnh chứng nhận */}
          {/* <div className="cert-images" style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', flexShrink: 0, flexWrap: 'nowrap' }}>
              {['DKKDD.jpg ', 'GDP.jpg'].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Chứng nhận Sở Y tế ${i + 1}`}
                  onClick={() => setLightbox(src)}
                  style={{ height: 80, width: 'auto', objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'zoom-in' }}
                />
              ))}
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Sở Y Tế Chứng Nhận
              </span>
              <div className="cert-images" style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', flexShrink: 0, flexWrap: 'nowrap' }}>
                {['DKKDD.jpg', 'GDP.jpg'].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Chứng nhận Sở Y tế ${i + 1}`}
                    onClick={() => setLightbox(src)}
                    style={{ height: 80, width: 'auto', objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'zoom-in' }}
                  />
                ))}
            </div>
</div>
        </div>

        <div className="product-layout">
          {/* Sidebar filter */}
          <aside className="product-sidebar">
            <button
              className="filter-toggle-btn"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span>Tìm kiếm sản phẩm</span>
              <span>{filterOpen ? '▲' : '▼'}</span>
            </button>

            <div className={`product-sidebar-inner${filterOpen ? ' open' : ''}`}>
              {/* <h3 style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 14 }}>Bộ lọc</h3> */}

              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Danh mục</label>
                <select
                  value={categoryId}
                  onChange={(e) => { setCategoryId(e.target.value); setPage(0) }}
                  style={inputStyle}
                >
                  <option value="">Tất cả</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Từ khóa</label>
                <input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Tên sản phẩm..."
                  style={inputStyle}
                />
              </div>

              <button onClick={handleSearch} style={btnBlue}>Tìm kiếm</button>
              <button onClick={handleReset} style={btnGhost}>Đặt lại</button>
            </div>
          </aside>

          {/* Product grid */}
          <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
            {loading ? (
              <div className="product-grid">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 10, height: 240, border: '1px solid #e5e7eb', opacity: 0.5 }} />
                ))}
              </div>
            ) : error ? (
              <div style={{ background: '#fff', borderRadius: 12, padding: 48, textAlign: 'center' }}>
                <p style={{ color: '#dc2626', marginBottom: 16 }}>{error}</p>
                <button
                  onClick={() => fetchProducts({ page, categoryId: categoryId || undefined, name: name || undefined })}
                  style={{ color: '#1a7a4a', background: 'none', border: '1px solid #1a7a4a', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontSize: 13 }}
                >
                  ← Quay lại
                </button>
              </div>
            ) : products.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 12, padding: 60, textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
                <p style={{ color: '#6b7280', fontSize: 14 }}>Không tìm thấy sản phẩm phù hợp</p>
              </div>
            ) : (
              <>
                <div className="product-grid">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} onClick={() => navigate(`/products/${p.id}`)} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
                    <button disabled={page === 0} onClick={() => setPage(page - 1)} style={pageBtnStyle(false)}>‹</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i} onClick={() => setPage(i)} style={pageBtnStyle(i === page)}>{i + 1}</button>
                    ))}
                    <button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)} style={pageBtnStyle(false)}>›</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, cursor: 'zoom-out',
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img
              src={lightbox}
              alt="Chứng nhận"
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, display: 'block' }}
            />
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: -16, right: -16,
                width: 36, height: 36, borderRadius: '50%',
                background: '#fff', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: '#111827',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, onClick }) {
  const thumb = product.images?.[0]?.url || product.images?.[0]?.imageUrl
  return (
    <div
      onClick={onClick}
      style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ height: 160, background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderBottom: '1px solid #f3f4f6' }}>
        {thumb ? (
          <img src={thumb} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
        ) : (
          <PillIcon />
        )}
      </div>
      <div style={{ padding: '10px 12px 14px' }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {product.name}
        </div>
      </div>
    </div>
  )
}

function PillIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
      <path d="M8.5 8.5 16 16"/>
    </svg>
  )
}

const inputStyle = {
  width: '100%', padding: '7px 10px', border: '1px solid #e5e7eb', borderRadius: 7,
  fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#111827', background: '#f9fafb'
}
const btnBlue = {
  width: '100%', padding: '9px', background: '#0d6efd', color: '#fff', border: 'none',
  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8
}
const btnGhost = {
  width: '100%', padding: '9px', background: 'none', color: '#6b7280', border: '1px solid #e5e7eb',
  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'
}
const pageBtnStyle = (active) => ({
  width: 36, height: 36, border: `1px solid ${active ? '#1a7a4a' : '#e5e7eb'}`,
  borderRadius: 8, background: active ? '#1a7a4a' : '#fff', color: active ? '#fff' : '#4b5563',
  cursor: 'pointer', fontSize: 13, fontWeight: active ? 700 : 400,
})