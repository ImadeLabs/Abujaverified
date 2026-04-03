import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';

// 1. Initialize the font
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* 2. Use the inter.className here */}
      <body className={inter.className}>
        {/* Navigation - Restored to your favorite style */}
        <nav className="navbar navbar-expand-lg border-bottom py-3 sticky-top" style={{ backgroundColor: '#1A232E', zIndex: 1000 }}>
          <div className="container">
            <a className="navbar-brand fw-bold text-white fs-4" href="/">
              Abuja<span style={{ color: '#2ecc71' }}>Verified</span>Homes
            </a>
            
            <div className="ms-auto d-flex align-items-center gap-4">
              <div className="d-none d-lg-flex gap-4">
                <a href="/" className="text-white text-decoration-none small opacity-75">Home</a>
                <a href="/calculator" className="text-white text-decoration-none small opacity-75">Investment Calculator</a>
                <a href="/due-diligence" className="text-white text-decoration-none small opacity-75">Due Diligence</a>
              </div>
              <a href="/admin" className="btn btn-sm rounded-pill px-4 border-white text-white">
                Admin
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* Global Footer (Optional but good for branding) */}
        <footer className="py-4 text-center border-top mt-5 bg-light">
          <p className="small text-muted mb-0">© 2026 AbujaVerified • Engineer 1 Consultancy</p>
        </footer>
      </body>
    </html>
  );
}