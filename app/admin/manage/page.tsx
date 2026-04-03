"use client";
import React, { useEffect, useState } from 'react';
import { deleteProperty } from "../../actions/properties";
import Link from 'next/link';

export default function AdminManage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties (Client-side for easy refresh after delete)
  const fetchProps = async () => {
    const res = await fetch('/api/properties'); // You'll need a simple route handler for this or use a server action
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => { fetchProps(); }, []);

  const removeListing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    const res = await deleteProperty(id);
    if (res.success) {
      setProperties(prev => prev.filter(p => p.id !== id));
      alert("Listing deleted successfully.");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading Engine...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Manage <span className="text-success">AVH Listings</span></h2>
        <Link href="/admin/capture" className="btn btn-dark rounded-pill px-4">+ New Capture</Link>
      </div>

      <div className="table-responsive bg-white shadow-sm rounded-4 p-3 border">
        <table className="table align-middle">
          <thead className="text-muted small">
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Price</th>
              <th>Views</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img src={p.images[0]} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" />
                    <span className="fw-bold">{p.title}</span>
                  </div>
                </td>
                <td>{p.location}</td>
                <td className="text-success fw-bold">₦{(p.price / 1000000).toFixed(1)}M</td>
                <td><span className="badge bg-light text-dark border">{p.views} clicks</span></td>
                <td className="text-end">
                  <button onClick={() => removeListing(p.id)} className="btn btn-sm btn-outline-danger rounded-pill px-3">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {properties.length === 0 && <p className="text-center py-4 text-muted">No listings to manage.</p>}
      </div>
    </div>
  );
}