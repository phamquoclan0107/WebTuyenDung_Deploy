import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Trang chủ", to: "" },
  // { label: "Sản phẩm", to: "/products" },
  { label: "Tuyển dụng", to: "/jobs" },
  { label: "Đăng nhập", to: "/login" },
];

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const close = () => setMenuOpen(false);

  return (
    <div style={{ background: "#fff", fontFamily: "DM Sans, sans-serif", minHeight: "100vh" }}>

      {/* HEADER (UI from FormHeader) */}
      <header className="fixed top-0 left-0 w-full z-[500] bg-white shadow-md border-b border-gray-100">
        <nav className="flex items-center justify-between px-4 md:px-20 py-2 mx-auto max-w-site">

          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-14 w-14 rounded-full object-cover border border-gray-200"
            />
            <span className="text-gray-900 text-3xl font-semibold tracking-wide">
              CKM
            </span>
          </Link>
          {/* Portal slot — search bar sẽ nhảy vào đây */}
          <div
            id="header-search-portal"
            className="hidden md:flex flex-1 justify-center px-8"
          />
          {/* Desktop nav */}
          <ul className="hidden md:flex gap-2.5 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`text-gray-900 text-[1rem] px-[16px] py-2 rounded-full transition-all duration-300 no-underline
                    hover:text-blue-600 hover:bg-gray-100
                    ${pathname === to ? "bg-gray-100 text-blue-600 font-medium" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile button */}
          <button
            className="md:hidden text-gray-900 text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] md:hidden"
          onClick={close}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[700] flex flex-col pt-20 gap-3 transition-transform duration-200 md:hidden
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-5 right-5 text-2xl"
          onClick={close}
        >
          ✕
        </button>

        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            onClick={close}
            className={`px-5 py-3 text-[1.1rem] text-gray-900 hover:bg-gray-100 hover:text-blue-600 no-underline
              ${pathname === to ? "bg-gray-100 text-blue-600 font-medium" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* PAGE CONTENT */}
      {/* CONTENT */}
      <main className="pt-[67px]">
        {pathname === "/" && (
          <img
            src="/view8.png"
            alt="Giới thiệu công ty"
            className="w-full h-auto object-contain"
          />
        )}

        <Outlet />
      </main>

      {/* FOOTER (giữ nguyên của bạn) */}
      {/* <footer style={{ background: "#111827", color: "#9ca3af", marginTop: 80, padding: "36px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>

          <div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, display: "block", marginBottom: 10 }}>
              Công ty cổ phần dược phẩm CKM
            </span>
            <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 300 }}>
              Công ty Cổ phần Dược phẩm CKM<br />
              66A Đ.21 KDC Bình Hưng, xã Bình Hưng, TP.HCM.
            </p>
          </div>

          <div>
            <div style={{ color: "#fff", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
              Liên hệ
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>
              Zalo & Điện thoại: 0934 006 920<br />
              WhatApp: 0976 017 489<br />
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "20px auto 0", paddingTop: 20, borderTop: "1px solid #374151", fontSize: 12, textAlign: "center" }}>
          © 2025 CKM. All rights reserved.
        </div>
      </footer> */}
      <footer style={{ background: "#111827", color: "#9ca3af", marginTop: 80, padding: "36px 24px" }}>

  {/* Lightbox state — dùng vanilla JS để tránh thêm state vào PublicLayout */}
  <style>{`
    .footer-license-img {
      height: 90px;
      width: auto;
      object-fit: contain;
      border: 1px solid #374151;
      border-radius: 8px;
      cursor: zoom-in;
      transition: transform 0.2s, border-color 0.2s;
    }
    .footer-license-img:hover {
      transform: scale(1.05);
      border-color: #6b7280;
    }
    #footer-lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0,0,0,0.88);
      align-items: center;
      justify-content: center;
      padding: 24px;
      cursor: zoom-out;
    }
    #footer-lightbox.open {
      display: flex;
    }
    #footer-lightbox img {
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 10px;
      display: block;
    }
    #footer-lightbox-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #fff;
      border: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
  `}</style>

  <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>

    {/* Cột 1: Thông tin công ty */}
    <div style={{ minWidth: 200 }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, display: "block", marginBottom: 10 }}>
        Công ty cổ phần dược phẩm CKM
      </span>
      <address style={{ fontSize: 13, lineHeight: 1.8, fontStyle: 'normal' }}>
        Công ty Cổ phần Dược phẩm CKM<br />
        66A Đ.21 KDC Bình Hưng, xã Bình Hưng, TP.HCM.
      </address>
    </div>

    {/* Cột 2: Liên hệ */}
    <div style={{ minWidth: 180 }}>
      <div style={{ color: "#fff", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Liên hệ</div>
      <p style={{ fontSize: 13, lineHeight: 1.8 }}>
        Zalo &amp; Điện thoại: <a href="tel:0934006920" style={{ color: '#9ca3af', textDecoration: 'none' }}>0934 006 920</a><br />
        WhatsApp: <a href="https://wa.me/84976017489" style={{ color: '#9ca3af', textDecoration: 'none' }}>0976 017 489</a>
      </p>
    </div>

    {/* Cột 3: Giấy phép */}
    <div style={{ minWidth: 200 }}>
      <div style={{ color: "#fff", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
        Giấy phép &amp; Chứng nhận
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <figure style={{ margin: 0 }}>
          <img
            src="/DPKD.jpg"
            alt="Giấy phép đăng ký kinh doanh Công ty Cổ phần Dược phẩm CKM"
            className="footer-license-img"
            onClick={() => {
              const lb = document.getElementById('footer-lightbox')
              const img = document.getElementById('footer-lightbox-img')
              if (lb && img) { img.src = '/DPKD.jpg'; img.alt = 'Giấy phép đăng ký kinh doanh CKM'; lb.classList.add('open') }
            }}
          />
          <figcaption style={{ fontSize: 10, color: '#6b7280', marginTop: 4, textAlign: 'center' }}>DPKD</figcaption>
        </figure>
      </div>
    </div>

  </div>

  <div style={{ maxWidth: 1200, margin: "20px auto 0", paddingTop: 20, borderTop: "1px solid #374151", fontSize: 12, textAlign: "center" }}>
    © 2025 CKM. All rights reserved.
  </div>

  {/* Lightbox */}
  <div
    id="footer-lightbox"
    onClick={() => document.getElementById('footer-lightbox')?.classList.remove('open')}
  >
    <button
      id="footer-lightbox-close"
      onClick={(e) => { e.stopPropagation(); document.getElementById('footer-lightbox')?.classList.remove('open') }}
    >
      ✕
    </button>
    <img id="footer-lightbox-img" src="" alt="" onClick={(e) => e.stopPropagation()} />
  </div>

</footer>
    </div>
  );
}