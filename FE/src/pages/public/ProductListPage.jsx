// import { useEffect, useState } from 'react'
// //import { useNavigate } from 'react-router-dom'
// import { productService } from '../../services/productService'
// import { useCategories } from '../../hooks/useCategories'
// import { useNavigate, useLocation } from 'react-router-dom'
// import SEO from '../../components/seo/SEO' 
// export default function ProductListPage() {
//   const navigate = useNavigate()
//   const { pathname }   = useLocation()
//   const { categories } = useCategories('PRODUCT')
//   const [products, setProducts]     = useState([])
//   const [loading, setLoading]       = useState(true)
//   const [error, setError]           = useState(null)
//   const [categoryId, setCategoryId] = useState('')
//   const [name, setName]             = useState('')
//   const [nameInput, setNameInput]   = useState('')
//   const [page, setPage]             = useState(0)
//   const [totalPages, setTotalPages] = useState(0)
//   const [total, setTotal]           = useState(0)
//   const [filterOpen, setFilterOpen] = useState(false)
//   const [lightbox, setLightbox] = useState(null)
//   const fetchProducts = (params = {}) => {
//     setLoading(true)
//     setError(null)
//     productService.search({
//       isActive: true,
//       size: 20,
//       // sort: 'createdAt,desc',
//       sort: 'displayOrder,asc',
//       ...params,
//     })
//       .then((data) => {
//         setProducts(data.content || [])
//         setTotalPages(data.totalPages || 0)
//         setTotal(data.totalElements || 0)
//       })
//       .catch((err) => setError(err?.message || 'Lỗi hệ thống. Vui lòng thử lại sau.'))
//       .finally(() => setLoading(false))
//   }

//   useEffect(() => {
//     fetchProducts({
//       page,
//       categoryId: categoryId || undefined,
//       name: name || undefined,
//     })
//   }, [page, categoryId, name])

//   const handleSearch = () => {
//     setPage(0)
//     setName(nameInput)
//     setFilterOpen(false)
//   }

//   const handleReset = () => {
//     setNameInput('')
//     setName('')
//     setCategoryId('')
//     setPage(0)
//   }

//   return (
//     <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
//       <SEO
//         title={pathname === '/'
//           ? 'Công ty Cổ phần Dược phẩm CKM'
//           : 'Danh sách sản phẩm chăm sóc mắt.'}
//         description={pathname === '/'
//           ? 'Công ty Cổ phần Dược phẩm CKM'
//           : 'Chuyên cung cấp sản phẩm chăm sóc mắt chuyên khoa, uy tín, chất lượng cao tại Việt Nam.'}
//         url={pathname}
//       />
//       <style>{`
//   .product-layout {
//     display: flex;
//     gap: 24px;
//     align-items: flex-start;
//   }
//   .product-sidebar {
//     width: 220px;
//     flex-shrink: 0;
//     position: sticky;
//     top: 94px;
//     align-self: flex-start;
//   }
//   .filter-toggle-btn {
//     display: none;
//   }
//   .product-sidebar-inner {
//     display: block;
//     background: #fff;
//     border: 1px solid #e5e7eb;
//     border-radius: 12px;
//     padding: 20px;

//     z-index: 10;
//   }
//   .product-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
//     gap: 16px;
//   }

//   @media (max-width: 768px) {
//     .product-layout {
//       flex-direction: column;
//     }
//     .product-sidebar {
//       width: 100%;
//       top:85px;
//       z-index: 20;
//     }
//     .filter-toggle-btn {
//       display: flex;
//       width: 100%;
//       padding: 10px 16px;
//       background: #fff;
//       border: 1px solid #e5e7eb;
//       border-radius: 10px;
//       font-size: 14px;
//       font-weight: 600;
//       color: #374151;
//       cursor: pointer;
//       align-items: center;
//       justify-content: space-between;
//       margin-bottom: 8px;
//       box-sizing: border-box;
//     }
//     .product-sidebar-inner {
//       display: none;
//       position: static;
//       top: unset;
//     }
//     .product-sidebar-inner.open {
//       display: block;
//     }
//     .product-grid {
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//       width: 100%;
//     }
//   }
// `}</style>

//       <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px', boxSizing: 'border-box' }}>
//         {/* <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Sản phẩm</h1>
//         <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>{total} sản phẩm</p> */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
//           <div>
//             <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Sản phẩm</h1>
//             <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 0 }}>{total} sản phẩm</p>
//           </div>

//           {/* Hình ảnh chứng nhận */}
//           {/* <div className="cert-images" style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', flexShrink: 0, flexWrap: 'nowrap' }}>
//               {['DKKDD.jpg ', 'GDP.jpg'].map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`Chứng nhận Sở Y tế ${i + 1}`}
//                   onClick={() => setLightbox(src)}
//                   style={{ height: 80, width: 'auto', objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'zoom-in' }}
//                 />
//               ))}
//             </div> */}
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
//               <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
//                 Sở Y Tế Chứng Nhận
//               </span>
//               <div className="cert-images" style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', flexShrink: 0, flexWrap: 'nowrap' }}>
//                 {['DKKDD.jpg', 'GDP.jpg'].map((src, i) => (
//                   <img
//                     key={i}
//                     src={src}
//                     alt={`Chứng nhận Sở Y tế ${i + 1}`}
//                     onClick={() => setLightbox(src)}
//                     style={{ height: 80, width: 'auto', objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'zoom-in' }}
//                   />
//                 ))}
//             </div>
// </div>
//         </div>

//         <div className="product-layout">
//           {/* Sidebar filter */}
//           <aside className="product-sidebar">
//             <button
//               className="filter-toggle-btn"
//               onClick={() => setFilterOpen(!filterOpen)}
//             >
//               <span>Tìm kiếm sản phẩm</span>
//               <span>{filterOpen ? '▲' : '▼'}</span>
//             </button>

//             <div className={`product-sidebar-inner${filterOpen ? ' open' : ''}`}>
//               {/* <h3 style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 14 }}>Bộ lọc</h3> */}

//               <div style={{ marginBottom: 14 }}>
//                 <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Danh mục</label>
//                 <select
//                   value={categoryId}
//                   onChange={(e) => { setCategoryId(e.target.value); setPage(0) }}
//                   style={inputStyle}
//                 >
//                   <option value="">Tất cả</option>
//                   {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
//                 </select>
//               </div>

//               <div style={{ marginBottom: 14 }}>
//                 <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Từ khóa</label>
//                 <input
//                   value={nameInput}
//                   onChange={(e) => setNameInput(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                   placeholder="Tên sản phẩm..."
//                   style={inputStyle}
//                 />
//               </div>

//               <button onClick={handleSearch} style={btnBlue}>Tìm kiếm</button>
//               <button onClick={handleReset} style={btnGhost}>Đặt lại</button>
//             </div>
//           </aside>

//           {/* Product grid */}
//           <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
//             {loading ? (
//               <div className="product-grid">
//                 {[1,2,3,4,5,6].map((i) => (
//                   <div key={i} style={{ background: '#fff', borderRadius: 10, height: 240, border: '1px solid #e5e7eb', opacity: 0.5 }} />
//                 ))}
//               </div>
//             ) : error ? (
//               <div style={{ background: '#fff', borderRadius: 12, padding: 48, textAlign: 'center' }}>
//                 <p style={{ color: '#dc2626', marginBottom: 16 }}>{error}</p>
//                 <button
//                   onClick={() => fetchProducts({ page, categoryId: categoryId || undefined, name: name || undefined })}
//                   style={{ color: '#1a7a4a', background: 'none', border: '1px solid #1a7a4a', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontSize: 13 }}
//                 >
//                   ← Quay lại
//                 </button>
//               </div>
//             ) : products.length === 0 ? (
//               <div style={{ background: '#fff', borderRadius: 12, padding: 60, textAlign: 'center', border: '1px solid #e5e7eb' }}>
//                 <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
//                 <p style={{ color: '#6b7280', fontSize: 14 }}>Không tìm thấy sản phẩm phù hợp</p>
//               </div>
//             ) : (
//               <>
//                 <div className="product-grid">
//                   {products.map((p) => (
//                     <ProductCard key={p.id} product={p} onClick={() => navigate(`/products/${p.id}`)} />
//                   ))}
//                 </div>

//                 {totalPages > 1 && (
//                   <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
//                     <button disabled={page === 0} onClick={() => setPage(page - 1)} style={pageBtnStyle(false)}>‹</button>
//                     {Array.from({ length: totalPages }, (_, i) => (
//                       <button key={i} onClick={() => setPage(i)} style={pageBtnStyle(i === page)}>{i + 1}</button>
//                     ))}
//                     <button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)} style={pageBtnStyle(false)}>›</button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* Lightbox */}
//       {lightbox && (
//         <div
//           onClick={() => setLightbox(null)}
//           style={{
//             position: 'fixed', inset: 0, zIndex: 9999,
//             background: 'rgba(0,0,0,0.85)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: 24, cursor: 'zoom-out',
//           }}
//         >
//           <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
//             <img
//               src={lightbox}
//               alt="Chứng nhận"
//               style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, display: 'block' }}
//             />
//             <button
//               onClick={() => setLightbox(null)}
//               style={{
//                 position: 'absolute', top: -16, right: -16,
//                 width: 36, height: 36, borderRadius: '50%',
//                 background: '#fff', border: 'none', cursor: 'pointer',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 18, fontWeight: 700, color: '#111827',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
//               }}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// function ProductCard({ product, onClick }) {
//   const thumb = product.images?.[0]?.url || product.images?.[0]?.imageUrl
//   return (
//     <div
//       onClick={onClick}
//       style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
//       onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
//       onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
//     >
//       <div style={{ height: 160, background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderBottom: '1px solid #f3f4f6' }}>
//         {thumb ? (
//           <img src={thumb} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
//         ) : (
//           <PillIcon />
//         )}
//       </div>
//       <div style={{ padding: '10px 12px 14px' }}>
//         <div style={{ fontWeight: 600, fontSize: 13, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           {product.name}
//         </div>
//       </div>
//     </div>
//   )
// }

// function PillIcon() {
//   return (
//     <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
//       <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
//       <path d="M8.5 8.5 16 16"/>
//     </svg>
//   )
// }

// const inputStyle = {
//   width: '100%', padding: '7px 10px', border: '1px solid #e5e7eb', borderRadius: 7,
//   fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#111827', background: '#f9fafb'
// }
// const btnBlue = {
//   width: '100%', padding: '9px', background: '#0d6efd', color: '#fff', border: 'none',
//   borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8
// }
// const btnGhost = {
//   width: '100%', padding: '9px', background: 'none', color: '#6b7280', border: '1px solid #e5e7eb',
//   borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'
// }
// const pageBtnStyle = (active) => ({
//   width: 36, height: 36, border: `1px solid ${active ? '#1a7a4a' : '#e5e7eb'}`,
//   borderRadius: 8, background: active ? '#1a7a4a' : '#fff', color: active ? '#fff' : '#4b5563',
//   cursor: 'pointer', fontSize: 13, fontWeight: active ? 700 : 400,
// })

import { useEffect, useState,useRef, forwardRef } from 'react'
//import { useNavigate } from 'react-router-dom'
import { productService } from '../../services/productService'
import { useCategories } from '../../hooks/useCategories'
import { useNavigate, useLocation } from 'react-router-dom'
import SEO from '../../components/seo/SEO'
export default function ProductListPage() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { categories } = useCategories('PRODUCT')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoryId, setCategoryId] = useState('')
  const [name, setName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [filterOpen, setFilterOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  
  const [scrolled, setScrolled]     = useState(false)//

  // Khai báo ref SAU khi state đã được khai báo
  const searchRef      = useRef(null)//
  const handleSearchRef = useRef(null)//
  const nameInputRef   = useRef('')//

  const fetchProducts = (params = {}) => {
    setLoading(true)
    setError(null)
    productService.search({
      isActive: true,
      size: 20,
      // sort: 'createdAt,desc',
      sort: 'displayOrder,asc',
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



  // Khai báo handleSearch TRƯỚC các useEffect dùng nó
  const handleSearch = () => {//
    setPage(0)//
    setName(nameInputRef.current || nameInput)///////
    setFilterOpen(false)//
  }//

  const handleReset = () => {
    setNameInput('')
    setName('')
    setCategoryId('')
    setPage(0)
  }
  // Sync refs
  useEffect(() => { nameInputRef.current = nameInput }, [nameInput])
  useEffect(() => { handleSearchRef.current = handleSearch }, [handleSearch])

  // Scroll detect
  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect()
        setScrolled(rect.top < 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  // Portal search khi scroll
  useEffect(() => {
    const portal = document.getElementById('header-search-portal')
    if (!portal) return

    if (scrolled) {
      portal.style.display = 'flex'
      portal.style.flex = '1'
      portal.style.justifyContent = 'center'
      portal.style.padding = '0 32px'

      const old = document.getElementById('header-search-clone')
      if (old) old.remove()

      const clone = document.createElement('div')
      clone.id = 'header-search-clone'
      clone.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        max-width: 500px;
        animation: slideDown 0.2s ease;
      `
      clone.innerHTML = `
  <style>
    @keyframes slideDown { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
  </style>
  <div style="display:flex;align-items:center;gap:8px;flex:1;">
    <div style="position:relative;flex-shrink:0;">
      <button id="header-cat-btn" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:#1a5fb4;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:400;cursor:pointer;white-space:nowrap;height:40px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span id="header-cat-label">Danh mục</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div id="header-cat-dropdown" style="display:none;position:absolute;top:calc(100% + 6px);left:0;background:#fff;border:1px solid #e5e7eb;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:9999;min-width:160px;overflow:hidden;"></div>
    </div>
    <div style="display:flex;align-items:center;background:#fff;border:2px solid #1a5fb4;border-radius:8px;padding:0 12px;gap:8px;flex:1;height:40px">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        id="header-search-input"
        placeholder="Bạn đang tìm gì hôm nay..."
        style="border:none;outline:none;font-size:13px;color:#111827;background:transparent;width:100%"
      />
      <button id="header-search-btn" style="background:#1a5fb4;color:#fff;border:none;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600;cursor:pointer">
        Tìm
      </button>
    </div>
  </div>
`
      portal.appendChild(clone)

      const input = clone.querySelector('#header-search-input')
      const btn = clone.querySelector('#header-search-btn')
      // Dropdown danh mục
      const catBtn = clone.querySelector('#header-cat-btn')
      const catLabel = clone.querySelector('#header-cat-label')
      const catDropdown = clone.querySelector('#header-cat-dropdown')

      // Render các item danh mục
      const catItems = [{ id: '', name: 'Tất cả' }, ...categories]
      catDropdown.innerHTML = catItems.map(c =>
        `<div class="hcat-item" data-id="${c.id}" style="padding:9px 14px;font-size:13px;color:#374151;cursor:pointer;">${c.name}</div>`
      ).join('')

      // Highlight item đang active
      catDropdown.querySelectorAll('.hcat-item').forEach(item => {
        if (item.dataset.id === String(categoryId)) {
          item.style.background = '#eff6ff'
          item.style.color = '#1a5fb4'
          item.style.fontWeight = '600'
          catLabel.textContent = item.textContent
        }
        item.addEventListener('mouseenter', () => item.style.background = '#f0f9ff')
        item.addEventListener('mouseleave', () => {
          item.style.background = item.dataset.id === String(categoryId) ? '#eff6ff' : ''
        })
        item.addEventListener('click', () => {
          catLabel.textContent = item.textContent
          catDropdown.style.display = 'none'
          const newCatId = item.dataset.id
          setCategoryId(newCatId)
          setPage(0)
        })
      })

      catBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        catDropdown.style.display = catDropdown.style.display === 'none' ? 'block' : 'none'
      })

      document.addEventListener('click', () => {
        catDropdown.style.display = 'none'
      }, { once: false })
      input.value = nameInputRef.current || ''
      input.addEventListener('input', (e) => {
        nameInputRef.current = e.target.value
        setNameInput(e.target.value)  // ← sync về React state
      })
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSearchRef.current?.() })
      btn.addEventListener('click', () => handleSearchRef.current?.())

    } else {
      const existing = document.getElementById('header-search-clone')
      if (existing) existing.remove()
      portal.style.display = 'none'
      // Sync giá trị từ ref về state khi quay lại
      setNameInput(nameInputRef.current || '')
    }
  }, [scrolled])
  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      const existing = document.getElementById('header-search-clone')
      if (existing) existing.remove()
    }
  }, [])
  // Fetch products
  useEffect(() => {
    fetchProducts({
      page,
      categoryId: categoryId || undefined,
      name: name || undefined,
    })
  }, [page, categoryId, name])

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
        .filter-toggle-btn { display: none; }
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
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .company-banner {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          gap: 24px;
          overflow: visible;
        }
        .header-company {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .company-badges {
          display: flex;
          gap: 8px;
          margin-top: 2px;
          flex-wrap: wrap;
        }
        .cert-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .header-search-bar {
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1.5;
          max-width: 640px;
          margin: 0 auto;
        }
        .header-category-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #1a5fb4;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
        }
        .header-search-input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          background: #fff;
          border: 2.5px solid #1a5fb4;
          border-radius: 10px;
          padding: 0 16px;
          gap: 10px;
        }
        .header-search-input-wrap input {
          border: none;
          outline: none;
          font-size: 14px;
          color: #111827;
          background: transparent;
          width: 100%;
          padding: 11px 0;
        }
        .category-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 9999;
          min-width: 180px;
          overflow: hidden;
        }
        .category-dropdown-item {
          padding: 10px 16px;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s;
        }
        .category-dropdown-item:hover { background: #f0f9ff; color: #1a5fb4; }
        .category-dropdown-item.active { background: #eff6ff; color: #1a5fb4; font-weight: 600; }
        // .header-sticky {
        //   position: sticky;
        //   top: 87px;
        //   z-index: 10;
        // }
        @media (max-width: 768px) {
          .header-search-bar { display: none; }
          .header-sticky {
            position: static !important;
            top: unset !important;
            z-index: unset !important;
          }
          .product-layout { flex-direction: column; }
          .product-sidebar { width: 100%; top: 85px; z-index: 20; }
          .filter-toggle-btn {
            display: flex;
            width: 100%;
            padding: 10px 16px;
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 400;
            color: #374151;
            cursor: pointer;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            box-sizing: border-box;
          }
          .product-sidebar-inner { display: none; position: static; top: unset; }
          .product-sidebar-inner.open { display: block; }
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; }
          .company-banner { flex-direction: column; align-items: center; text-align: center; }
          .header-company { flex-direction: column; align-items: center; }
          .company-badges { justify-content: center; }
        }
        @media (min-width: 769px) {
          .product-sidebar { display: none; }
          .product-layout { gap: 0; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px', boxSizing: 'border-box' }}>
        <div className="header-sticky" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, marginBottom: 28 }}>
          <div className="company-banner" style={{ overflow: 'visible', position: 'relative', zIndex: 50 }}>

            {/* Left */}
            <div className="header-company">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#111827', letterSpacing: '0.02em', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
                  CÔNG TY CỔ PHẦN DƯỢC PHẨM CKM
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ height: 1, width: 24, background: 'linear-gradient(to right, transparent, #9ca3af)', flexShrink: 0 }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>ĐỒNG HÀNH CÙNG BẠN</span>
                  <div style={{ height: 1, width: 24, background: 'linear-gradient(to left, transparent, #9ca3af)', flexShrink: 0 }} />
                </div>
                <div className="company-badges">
                  {['Chuyên khoa mắt', 'Sở Y tế chứng nhận', 'Uy tín – Chất lượng'].map((item, i) => (
                    <span key={i} style={{ fontSize: 9, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                      <span style={{ color: '#1a7a4a', fontWeight: 700 }}>✓</span> {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: Search bar */}
            <SearchBar
              ref={searchRef}
              categories={categories}
              categoryId={categoryId}
              setCategoryId={(val) => { setCategoryId(val); setPage(0) }}
              nameInput={nameInput}
              setNameInput={setNameInput}
              onSearch={handleSearch}
            />

            {/* Right: Chứng nhận */}
            <div className="cert-section">
              <span style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sở Y Tế Chứng Nhận
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                {['DKKDD.jpg', 'GDP.jpg'].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Chứng nhận ${i + 1}`}
                    onClick={() => setLightbox(src)}
                    style={{ height: 72, width: 'auto', objectFit: 'contain', border: '1px solid #e5e7eb', borderRadius: 6, cursor: 'zoom-in', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div style={{
            background: 'linear-gradient(90deg, #6d87b4 0%, #1a5fb4 40%, #2196f3 70%, #1a5fb4 100%)',
            padding: '9px 20px',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.06em',
            borderRadius: '0 0 12px 12px',
          }}>
            Tự Hào Thương Hiệu Việt.<br /> Liên hệ WhatsApp: 0976 017 489
          </div>
        </div>

        <div className="product-layout">
          <aside className="product-sidebar">
            <button className="filter-toggle-btn" onClick={() => setFilterOpen(!filterOpen)}>
              <span>Tìm kiếm sản phẩm</span>
              <span>{filterOpen ? '▲' : '▼'}</span>
            </button>
            <div className={`product-sidebar-inner${filterOpen ? ' open' : ''}`}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Danh mục</label>
                <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setPage(0) }} style={inputStyle}>
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

          <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
            {loading ? (
              <div className="product-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 10, height: 240, border: '1px solid #e5e7eb', opacity: 0.5 }} />
                ))}
              </div>
            ) : error ? (
              <div style={{ background: '#fff', borderRadius: 12, padding: 48, textAlign: 'center' }}>
                <p style={{ color: '#dc2626', marginBottom: 16 }}>{error}</p>
                <button onClick={() => fetchProducts({ page, categoryId: categoryId || undefined, name: name || undefined })} style={{ color: '#1a7a4a', background: 'none', border: '1px solid #1a7a4a', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontSize: 13 }}>
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
const SearchBar = forwardRef(function SearchBar({ categories, categoryId, setCategoryId, nameInput, setNameInput, onSearch }, ref) {
  const [open, setOpen] = useState(false)
  const selectedName = categories.find(c => String(c.id) === String(categoryId))?.name || 'Danh mục'

  return (
    <div ref={ref} className="header-search-bar" style={{ justifyContent: 'center', margin: '0 auto' }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button className="header-category-btn" onClick={() => setOpen(!open)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
          {selectedName}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open && (
          <div className="category-dropdown">
            <div className={`category-dropdown-item${!categoryId ? ' active' : ''}`} onClick={() => { setCategoryId(''); setOpen(false) }}>
              Tất cả
            </div>
            {categories.map((c) => (
              <div
                key={c.id}
                className={`category-dropdown-item${String(categoryId) === String(c.id) ? ' active' : ''}`}
                onClick={() => { setCategoryId(c.id); setOpen(false) }}
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="header-search-input-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Bạn đang tìm gì hôm nay..."
        />
        <button onClick={onSearch} style={{ background: '#1a5fb4', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
          Tìm
        </button>
      </div>
    </div>
  )
})
function PillIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="M8.5 8.5 16 16" />
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