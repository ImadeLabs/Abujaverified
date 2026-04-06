"use client"; // add if using client-side interactivity like buttons

import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PropertyDetail({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) return notFound();

  return (
    <div className="container py-5 mt-5">
      <div className="row g-5">
        {/* LEFT COLUMN: Media Gallery */}
        <div className="col-lg-8">
          <div className="mb-4">
            <h1 className="fw-bold mb-2">{property.title}</h1>
            <p className="text-muted">
              <i className="bi bi-geo-alt-fill me-2"></i>
              {property.location}
            </p>
          </div>

          <div className="d-flex gap-2 overflow-auto pb-3 mb-4" style={{ scrollbarWidth: "none" }}>
            {property.images?.length ? (
              property.images.map((url: string, i: number) => (
                <img
                  key={i}
                  src={url}
                  className="rounded-4 shadow-sm"
                  style={{ width: "100%", height: "450px", objectFit: "cover", flex: "0 0 100%" }}
                />
              ))
            ) : (
              <img
                key={0}
                src="https://placehold.co/800x500?text=No+Image"
                className="w-100 rounded-4"
                alt={property.title}
              />
            )}
          </div>

          {property.videoUrl && (
            <div className="mt-5">
              <h4 className="fw-bold mb-3">Walkthrough Video</h4>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm bg-dark">
                <iframe
                  src={property.videoUrl.replace("watch?v=", "embed/")}
                  title="Walkthrough Video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="mt-5">
            <h4 className="fw-bold border-bottom pb-2">Apartment Details</h4>
            <p className="text-muted mt-3" style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}>
              {property.description}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top" style={{ top: "100px" }}>
            <h2 className="fw-bold text-success mb-4">₦{property.price.toLocaleString()}</h2>

            <div className="mb-4 p-3 bg-light rounded-3">
              <div className="d-flex align-items-center mb-2">
                <span
                  className={`badge ${
                    property.status === "VERIFIED" ? "bg-success" : "bg-warning text-dark"
                  } me-2`}
                >
                  {property.status === "VERIFIED" ? "✓" : "!"}
                </span>
                <span className="fw-bold small">AVH AUDIT STATUS</span>
              </div>
              <p className="small text-muted mb-0">
                {property.status === "VERIFIED"
                  ? "This property has been physically inspected and verified by Engineer 1."
                  : "Audit Pending. We recommend requesting a TIER 2 verification before payment."}
              </p>
            </div>

            <a
              href={`https://wa.me/2347037819477?text=Hi AVH, I am interested in ${property.title} in ${property.location} (Ref: ${property.id})`}
              className="btn btn-success btn-lg w-100 rounded-pill fw-bold py-3 mb-3"
            >
              Contact Agent via WhatsApp
            </a>

            <button className="btn btn-outline-dark btn-lg w-100 rounded-pill fw-bold py-3">
              Book Physical Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}