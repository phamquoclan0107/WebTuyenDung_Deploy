import { useEffect, useState } from 'react'
import { productService } from '../services/productService'
import { PageTitle, Card, Button, Spinner } from '../components/ui'
import toast from 'react-hot-toast'

export default function AdminProductSortPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [dragIndex, setDragIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  useEffect(() => {
    setLoading(true)
    productService.search({ size: 100, sort: 'displayOrder,asc', isActive: true })
      .then((data) => setProducts(data.content || []))
      .catch(() => toast.error('Không tải được sản phẩm'))
      .finally(() => setLoading(false))
  }, [])

  const handleDragStart = (e, index) => {
    setDragIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === dropIndex) return
    const newList = [...products]
    const [removed] = newList.splice(dragIndex, 1)
    newList.splice(dropIndex, 0, removed)
    setProducts(newList)
    setDragIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDragIndex(null)
    setDragOverIndex(null)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const items = products.map((p, i) => ({ id: p.id, displayOrder: i }))
      await productService.reorder(items)
      toast.success('Đã lưu thứ tự sản phẩm')
    } catch {
      toast.error('Lưu thất bại, thử lại')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageTitle
        title="Sắp xếp sản phẩm"
        subtitle="Kéo thả để thay đổi thứ tự hiển thị ngoài trang chủ"
        action={
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Đang lưu...' : '💾 Lưu thứ tự'}
          </Button>
        }
      />

      <Card className="p-4">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner size={36} /></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {products.map((p, index) => {
              const thumb = p.images?.[0]?.url || p.images?.[0]?.imageUrl
              const isDraggingThis = dragIndex === index
              const isOver = dragOverIndex === index && dragIndex !== index

              return (
                <div
                  key={p.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '12px 16px',
                    background: isDraggingThis ? '#f0fdf4' : isOver ? '#eff6ff' : '#fff',
                    border: `2px solid ${isOver ? '#3b82f6' : isDraggingThis ? '#1a7a4a' : '#e5e7eb'}`,
                    borderRadius: 10,
                    cursor: 'grab',
                    opacity: isDraggingThis ? 0.5 : 1,
                    transition: 'all 0.15s',
                    userSelect: 'none',
                  }}
                >
                  {/* Drag handle */}
                  <div style={{ color: '#9ca3af', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[0,1,2].map((i) => (
                      <div key={i} style={{ display: 'flex', gap: 3 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#9ca3af' }} />
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#9ca3af' }} />
                      </div>
                    ))}
                  </div>

                  {/* Order number */}
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#374151', flexShrink: 0 }}>
                    {index + 1}
                  </div>

                  {/* Thumbnail */}
                  <div style={{ width: 56, height: 56, borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {thumb ? (
                      <img src={thumb} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
                        <path d="M8.5 8.5 16 16"/>
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                      {p.categoryName} · {p.productCode}
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: p.isActive ? '#f0fdf4' : '#f3f4f6', color: p.isActive ? '#1a7a4a' : '#6b7280', flexShrink: 0 }}>
                    {p.isActive ? 'Hiển thị' : 'Ẩn'}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}