import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: { location?: string, maxPrice?: string } 
}) {
  // Fetch properties based on search filters
  const properties = await prisma.property.findMany({
    where: {
      location: searchParams.location ? { contains: searchParams.location, mode: 'insensitive' } : undefined,
      price: searchParams.maxPrice ? { lte: parseFloat(searchParams.maxPrice) } : undefined,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container py-5 min-vh-100">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 text-dark">Abuja <span className="text-success">Verified</span> Homes</h1>
        <p className="text-muted fs-5">Premium listings, verified for the Abuja market.</p>
      </div>

      {/* SEARCH BAR */}
      <form className="row g-3 mb-5 bg-white p-4 rounded-4 shadow-sm border mx-auto" style={{ maxWidth: '900px' }}>
        <div className="col-md-5">
          <input name="location" className="form-control border-light bg-light py-2" placeholder="Search Location (e.g. Guzape)" defaultValue={searchParams.location} />
        </div>
        <div className="col-md-5">
          <select name="maxPrice" className="form-select border-light bg-light py-2">
            <option value="">Any Price</option>
            <option value="100000000">Up to 100M</option>
            <option value="250000000">Up to 250M</option>
            <option value="500000000">Up to 500M</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold">Filter</button>
        </div>
      </form>

      {/* PROPERTY GRID */}
      <div className="row g-4">
        {properties.map((home) => (
          <div key={home.id} className="col-12 col-md-6 col-lg-4">
            <Link href={`/property/${home.id}`} className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                <div className="position-relative">
                  <img src={home.images[0]} className="card-img-top" style={{ height: '240px', objectFit: 'cover' }} alt={home.title} />
                  <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
                    <span className="badge bg-white text-dark shadow-sm rounded-pill px-3 py-2 border">📍 {home.location}</span>
                  </div>
                  {/* View Counter Badge */}
                  <div className="position-absolute bottom-0 end-0 m-2">
                    <span className="badge bg-dark bg-opacity-75 rounded-pill px-2">👁️ {home.views || 0}</span>
                  </div>
                </div>

                <div className="card-body p-4">
                  <h5 className="fw-bold text-dark mb-1 text-truncate">{home.title}</h5>
                  <p className="text-success fw-bold fs-5">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(home.price)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
}