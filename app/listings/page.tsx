import { prisma } from "@/lib/prisma";

export default async function ListingsPage() {
  const properties = await prisma.property.findMany();

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-5 text-center">Verified Abuja <span className="text-success">Opportunities</span></h2>
      <div className="row g-4">
        {properties.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover">
              <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                {p.imageUrl ? <img src={p.imageUrl} alt={p.title} /> : "Property Image"}
              </div>
              <div className="p-4">
                <div className="badge bg-success-subtle text-success mb-2">AGIS VERIFIED</div>
                <h5 className="fw-bold">{p.title}</h5>
                <p className="text-muted small mb-3">{p.location}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5 text-dark">{p.price}</span>
                  <button className="btn btn-outline-success btn-sm rounded-pill px-3">Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}