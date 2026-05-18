import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import ProductForm from '../components/product/ProductForm'
import { PageTitle, Card, Button } from '../components/ui'
import toast from 'react-hot-toast'
import { parseApiError } from '../utils/formatters'

export default function ProductCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading]         = useState(false)
  const pendingFilesRef               = useRef([])

  const handlePendingFiles = (files) => {
    pendingFilesRef.current = files
  }

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      const created = await productService.create(data)

      const files = pendingFilesRef.current
      if (files && files.length > 0) {
        try {
          await productService.addImages(created.id, files)
        } catch (imgErr) {
          toast.error('Sản phẩm đã tạo nhưng upload ảnh thất bại. Vui lòng thêm ảnh trong trang chỉnh sửa.')
        }
      }

      toast.success('Tạo sản phẩm thành công!')
      navigate(`/admin/products/${created.id}`)
    } catch (err) {
      toast.error(parseApiError(err, 'Tạo sản phẩm thất bại'), { style: { whiteSpace: 'pre-line' } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageTitle
        title="Tạo sản phẩm"
        subtitle="Điền thông tin bên dưới để thêm sản phẩm mới"
        action={
          <Button variant="ghost" onClick={() => navigate('/admin/products')}>
            ← Quay lại
          </Button>
        }
      />

      <Card className="px-8 py-7 max-w-[860px]">
        <ProductForm
          defaultValues={{}}
          onSubmit={handleSubmit}
          onPendingFiles={handlePendingFiles}
          loading={loading}
          submitLabel="Tạo sản phẩm"
        />
      </Card>
    </div>
  )
}