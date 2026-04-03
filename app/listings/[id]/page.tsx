import React from 'react';

export default function PropertyAudit({ params }: { params: { id: string } }) {
  const auditPoints = [
    { label: "AGIS Title Search", status: "Verified", date: "Jan 2026" },
    { label: "AMMC Development Permit", status: "Approved", date: "Feb 2026" },
    { label: "Beacon/Physical Boundary", status: "Confirmed", date: "Feb 2026" },
    { label: "Topography/Soil Test", status: "Stable", date: "Jan 2026" },
  ];

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="fw-bold mb-3">Guzape Luxury 4-Bed Audit</h1>
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-bold text-success mb-4">🛡️ Engineer 1: Verification Report</h5>
            <div className="table-responsive">
              <table className="table">
                <thead><tr className="small text-muted"><th>CHECKPOINT</th><th>STATUS</th><th>LAST AUDIT</th></tr></thead>
                <tbody>
                  {auditPoints.map((item, index) => (
                    <tr key={index}>
                      <td className="fw-bold py-3">{item.label}</td>
                      <td><span className="badge bg-success-subtle text-success rounded-pill px-3">✓ {item.status}</span></td>
                      <td className="text-muted small">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 bg-dark text-white p-4 rounded-4 sticky-top" style={{ top: '100px' }}>
            <h4>Request Full Audit PDF</h4>
            <p className="small opacity-75">Get the full legal and structural breakdown for this property.</p>
            <button className="btn btn-success w-100 rounded-pill py-3 fw-bold">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}