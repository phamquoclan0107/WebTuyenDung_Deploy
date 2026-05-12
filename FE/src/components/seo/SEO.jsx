// src/components/seo/SEO.jsx
import { Helmet } from 'react-helmet-async'

const SITE_NAME    = 'Chuyên Khoa Mắt CKM'
const BASE_URL     = 'https://chuyenkhoamat.com.vn'
const DEFAULT_IMG  = `${BASE_URL}/logoHTML.png`
const DEFAULT_DESC = 'Công ty Cổ phần Dược phẩm CKM - Chuyên khoa mắt, cung cấp sản phẩm chăm sóc mắt chất lượng cao tại Việt Nam.'

export default function SEO({
  title,
  description = DEFAULT_DESC,
  url = '/',
  image = DEFAULT_IMG,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonical = `${BASE_URL}${url}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <link rel="canonical"           href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="vi_VN" />
    </Helmet>
  )
}
