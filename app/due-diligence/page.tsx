"use client";
import React from 'react';

export default function ConsultancyPortal() {
  const handleInspectionRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Extracting data based on our form field 'name' attributes
    const name = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const propertyLocation = formData.get('propertyLocation');
    const country = formData.get('country');
    
    // Identify which services were checked
    const services: string[] = [];
    if (formData.get('legal')) services.push("AGIS Title Search");
    if (formData.get('ammc')) services.push("AMMC Dev Control Check");
    if (formData.get('physical')) services.push("Physical Site Inspection");

    const serviceList = services.length > 0 ? services.join(", ") : "General Due Diligence";
    
    // Professional WhatsApp Message for Engineer 1
    const message = `Hello Engineer 1, 

My name is ${name} (${country}). I am requesting a Due Diligence Inspection for a property at: ${propertyLocation}.

Services Required: ${serviceList}
My WhatsApp: ${phone}
My Email: ${email}

Please let me know the next steps for verification.`;

    const encodedMessage = encodeURIComponent(message);
    
    // REPLACE WITH YOUR ACTUAL WHATSAPP NUMBER
    const myNumber = "2348030000000"; 
    window.open(`https://wa.me/${myNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
             <h1 className="fw-bold text-dark display-5">Request Due Diligence Inspection</h1>
             <p className="text-success fw-semibold mt-2" style={{ fontSize: '1.1rem' }}>
                "Don't pay a kobo until I verify it."
             </p>
          </div>

          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="bg-dark p-4 text-white d-flex justify-content-between align-items-center">
               <span className="small fw-bold text-uppercase tracking-wider">Independent Engineering Audit</span>
               <span className="badge bg-success">Consultant First, Builder Second</span>
            </div>
            
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleInspectionRequest}>
                <div className="row g-4">
                  <div className="col-md-12">
                    <label className="form-label fw-bold small text-muted mb-3">SELECT SERVICES REQUIRED</label>
                    <div className="d-flex gap-2 flex-wrap">
                       <input type="checkbox" name="legal" className="btn-check" id="legal" />
                       <label className="btn btn-outline-success rounded-pill px-4 py-2" htmlFor="legal">AGIS Title Search</label>
                       
                       <input type="checkbox" name="ammc" className="btn-check" id="ammc" />
                       <label className="btn btn-outline-success rounded-pill px-4 py-2" htmlFor="ammc">AMMC Development Control Check</label>
                       
                       <input type="checkbox" name="physical" className="btn-check" id="physical" />
                       <label className="btn btn-outline-success rounded-pill px-4 py-2" htmlFor="physical">Physical Site Inspection</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Full Name</label>
                    <input type="text" name="fullName" className="form-control bg-light border-0 py-3" placeholder="Enter your name" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Email Address</label>
                    <input type="email" name="email" className="form-control bg-light border-0 py-3" placeholder="email@example.com" required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">WhatsApp Number</label>
                    <input type="tel" name="phone" className="form-control bg-light border-0 py-3" placeholder="+234..." required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Your Current Location</label>
                    <input type="text" name="country" className="form-control bg-light border-0 py-3" placeholder="e.g. London, UK" required />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Property Location/Address in Abuja</label>
                    <input type="text" name="propertyLocation" className="form-control bg-light border-0 py-3" placeholder="e.g. Plot 45, Katampe Extension" required />
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-success btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm">
                      Submit Inspection Request
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}