import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../../services/productService'

export default function ProductDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [product, setProduct]   = useState(null)
  const [similar, setSimilar]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setLoading(true)
    productService.getById(id)
      .then((data) => {
        setProduct(data)
        setActiveImg(0)
        return productService.search({
          isActive: true,
          size: 12,
          sort: 'createdAt,desc',
          categoryId: data.categoryId || undefined,
        })
      })
      .then((res) => {
        const all = res?.content || []
        setSimilar(all.filter((p) => String(p.id) !== String(id)))
      })
      .catch((err) => setError(err?.response?.data?.message || err?.message || 'Không tải được sản phẩm'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ textAlign: 'center', padding: 60, color: '#6b7280', background: '#fff' }}>Đang tải...</div>
  if (error)   return <div style={{ textAlign: 'center', padding: 60, color: '#dc2626', background: '#fff' }}>{error}</div>
  if (!product) return null

  const images = product.images || []
  const thumb  = images[activeImg]?.url

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{`
        .pd-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }
        .pd-image-col {
          flex-shrink: 0;
          width: 320px;
        }
        .pd-info-col {
          flex: 1;
          min-width: 0;
        }

        /* Similar slider */
        .similar-slider {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-behavior: smooth;
          cursor: grab;
          padding-bottom: 12px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .similar-slider::-webkit-scrollbar {
          display: none;
        }
        .similar-slider.dragging {
          cursor: grabbing;
          scroll-behavior: auto;
          user-select: none;
        }
        .similar-card {
          flex: 0 0 200px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .similar-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .pd-layout {
            flex-direction: column;
          }
          .pd-image-col {
            width: 100%;
          }
          .similar-card {
            flex: 0 0 160px;
          }
        }
      `}</style>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: 13, color: '#9ca3af', flexWrap: 'wrap' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#374151' }}>Trang chủ</span>
          <span>{'>'}</span>
          <span onClick={() => navigate('/products')} style={{ cursor: 'pointer', color: '#374151' }}>Sản phẩm</span>
          <span>{'>'}</span>
          <span style={{ color: '#111827', fontWeight: 500 }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div className="pd-layout">

          {/* Left: image */}
          <div className="pd-image-col">
            <div style={{
              border: '1px solid #e5e7eb', borderRadius: 8, height: 300,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', marginBottom: 12, background: '#fafafa',
            }}>
              {thumb ? (
                <img
                  src={thumb}
                  alt={product.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              ) : <PillIcon />}
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {images.map((img, i) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: 58, height: 58, borderRadius: 6,
                      border: `2px solid ${i === activeImg ? '#111827' : '#e5e7eb'}`,
                      overflow: 'hidden', cursor: 'pointer', background: '#fafafa',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: product info */}
          <div className="pd-info-col">
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111827', margin: '0 0 8px', letterSpacing: '0.01em' }}>
              {product.name}
            </h1>

            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
              {product.categoryName && <span style={{ marginRight: 16 }}>{product.categoryName}</span>}
              {product.productCode && <span>Mã: {product.productCode}</span>}
            </div>

            {product.description && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Chi tiết
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.9, color: '#374151', whiteSpace: 'pre-wrap' }}>
                  {product.description}
                </div>
              </div>
            )}

            <a
              href="mailto:talents@fremed.com.vn?subject=Đặt hàng"
              style={{
                display: 'inline-block', marginTop: 8, padding: '12px 28px',
                background: '#111827', color: '#fff', borderRadius: 6,
                fontSize: 14, textDecoration: 'none',
              }}
            >
              Liên hệ đặt hàng<br />
              WhatApp: 0976 017 489
            </a>
          </div>
        </div>

        {/* Similar products slider */}
        {similar.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 20 }}>
              Sản phẩm liên quan
            </h2>
            <DragSlider>
              {similar.map((p) => (
                <SimilarCard
                  key={p.id}
                  product={p}
                  onClick={() => navigate(`/products/${p.id}`)}
                />
              ))}
            </DragSlider>
          </div>
        )}

      </div>
    </div>
  )
}

function DragSlider({ children }) {
  const sliderRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeft.current = sliderRef.current.scrollLeft
    sliderRef.current.classList.add('dragging')
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX.current) * 1.2
    sliderRef.current.scrollLeft = scrollLeft.current - walk
  }

  const onMouseUp = () => {
    isDragging.current = false
    sliderRef.current?.classList.remove('dragging')
  }

  return (
    <div
      ref={sliderRef}
      className="similar-slider"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {children}
    </div>
  )
}

function SimilarCard({ product, onClick }) {
  const thumb = product.images?.[0]?.url || product.images?.[0]?.imageUrl
  return (
    <div className="similar-card" onClick={onClick}>
      <div style={{
        height: 150, background: '#f9fafb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', borderBottom: '1px solid #f3f4f6',
      }}>
        {thumb ? (
          <img
            src={thumb}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ) : <PillIcon size={32} />}
      </div>
      <div style={{ padding: '10px 12px 14px', textAlign: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.name}
        </div>
        {product.categoryName && (
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{product.categoryName}</div>
        )}
      </div>
    </div>
  )
}

function PillIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
      <path d="M8.5 8.5 16 16"/>
    </svg>
  )
}