"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveProperty } from "../../actions/properties"; 

export default function WhatsAppCapture() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [rawText, setRawText] = useState("");
  const [extracted, setExtracted] = useState({ 
    title: "", 
    price: "", 
    location: "", 
    description: "", 
    videoUrl: "" 
  });

  // 1. Handle Photo Uploads to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 10);
    
    setLoading(true);
    try {
      const uploadedUrls = await Promise.all(files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, 
          { method: 'POST', body: formData }
        );
        const data = await res.json();
        return data.secure_url;
      }));
      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (err) {
      alert("Cloudinary Upload Failed. Check your .env settings.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Remove Mistakenly Uploaded Photos
  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // 3. AI-Logic: Extract details from WhatsApp Text
  const handleParse = () => {
    const lines = rawText.split('\n');
    const title = lines[0]?.substring(0, 60) || "New Property Listing";
    
    // Improved Regex for Prices (N 250M, 50 Million, etc.)
    const priceMatch = rawText.match(/(?:₦|N|Price:?)\s?(\d{1,3}(?:,\d{3})*(?:\.\d+)?|[0-9]+)\s?(M|m|B|b|Million|Billion)?/i);
    const locMatch = rawText.match(/(Guzape|Maitama|Asokoro|Katampe|Jabi|Gwarinpa|Lugbe|Wuye|Centery|Life Camp|Wuse)/i);
    const videoMatch = rawText.match(/(https?:\/\/[^\s]+(?:youtube\.com|youtu\.be|drive\.google\.com|vimeo\.com)[^\s]+)/i);

    setExtracted({ 
      title, 
      price: priceMatch ? priceMatch[0] : "", 
      location: locMatch ? locMatch[0] : "Abuja", 
      description: rawText,
      videoUrl: videoMatch ? videoMatch[0] : ""
    });
  };

  // 4. Final Publish to Neon Database
  const onPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please upload at least one photo!");
    
    setLoading(true);
    try {
      // Pass the combined data to the Server Action
      const result = await saveProperty({ ...extracted, images });

      if (result.success) {
        alert("🚀 Property Published Successfully to AVH!");
        // Redirect to the new property's detail page (assuming your action returns the ID)
        router.push(`/property/${result.id || ''}`); 
        router.refresh();
      } else {
        // If the server action returns an error object instead of throwing
        alert(`❌ Error: ${result.error || "Could not save property"}`);
      }
    } catch (error: any) {
      // Catching unexpected network or execution errors
      console.error("Save Error:", error);
      alert("Database error: " + (error.message || "Could not save property. Check your connection."));
    } finally {
      // CRITICAL: This stops the "Finalizing..." spinner on failure
      setLoading(false); 
    }
  };

  return (
    <div className="container py-4 min-vh-100" style={{ backgroundColor: '#fdfdfd' }}>
      <div className="mb-4">
        <h2 className="fw-bold text-dark">AVH <span className="text-success">Capture Engine</span></h2>
        <p className="text-muted small">Convert realtor messages into professional listings instantly.</p>
      </div>

      {/* STEP 1: INPUT */}
      <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
        <label className="small fw-bold text-muted mb-2">1. PASTE WHATSAPP TEXT</label>
        <textarea 
          className="form-control border-0 bg-light p-3" 
          rows={5} 
          placeholder="Paste the property description here..." 
          onChange={(e) => setRawText(e.target.value)}
          disabled={loading}
        ></textarea>
        <button onClick={handleParse} disabled={loading} className="btn btn-dark w-100 mt-3 rounded-pill fw-bold py-2">
          Extract Property Data ✨
        </button>
      </div>

      {/* STEP 2: MEDIA SECTION */}
      <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
        <label className="small fw-bold text-muted mb-2">2. PROPERTY MEDIA (Max 10 Photos)</label>
        
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={loading} className="form-control mb-3" />
        
        <div className="d-flex gap-3 overflow-auto pb-3">
          {images.map((url, i) => (
            <div key={i} className="position-relative" style={{ flex: '0 0 120px' }}>
              <img 
                src={url} 
                style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                className="rounded-3 shadow-sm border" 
                alt={`Upload ${i}`}
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="position-absolute top-0 end-0 m-1 btn btn-danger btn-sm rounded-circle shadow"
                style={{ width: '24px', height: '24px', padding: '0', border: '2px solid white' }}
              >
                ✕
              </button>
              <div className="position-absolute bottom-0 start-0 m-1">
                <span className="badge bg-dark opacity-75">{i + 1}</span>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="w-100 py-4 text-center border rounded-3 text-muted small bg-light">
              No photos uploaded yet
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-top">
          <label className="small fw-bold text-primary">WALKTHROUGH VIDEO LINK</label>
          <input 
            type="url" 
            className="form-control mt-1" 
            placeholder="YouTube, Drive, or Vimeo Link"
            value={extracted.videoUrl}
            onChange={(e) => setExtracted({...extracted, videoUrl: e.target.value})}
            disabled={loading}
          />
        </div>
      </div>

      {/* STEP 3: FINAL REVIEW & PUBLISH */}
      {extracted.title && (
        <form onSubmit={onPublish} className="card border-0 shadow-lg p-4 rounded-4 animate__animated animate__fadeInUp">
          <div className="mb-3">
            <label className="small fw-bold text-muted">TITLE</label>
            <input className="form-control fw-bold fs-5" value={extracted.title} onChange={(e) => setExtracted({...extracted, title: e.target.value})} required />
          </div>

          <div className="row g-3 mb-3">
             <div className="col-6">
                <label className="small fw-bold text-muted">PRICE (Text ok, e.g. 50M)</label>
                <input className="form-control" value={extracted.price} onChange={(e) => setExtracted({...extracted, price: e.target.value})} required />
             </div>
             <div className="col-6">
                <label className="small fw-bold text-muted">LOCATION</label>
                <input className="form-control" value={extracted.location} onChange={(e) => setExtracted({...extracted, location: e.target.value})} required />
             </div>
          </div>

          <div className="mb-4">
            <label className="small fw-bold text-muted">FULL DESCRIPTION</label>
            <textarea className="form-control" rows={4} value={extracted.description} onChange={(e) => setExtracted({...extracted, description: e.target.value})} required></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn btn-success btn-lg w-100 rounded-pill fw-bold shadow-sm py-3">
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span> Finalizing...</>
            ) : "🚀 Publish to AVH Live Listings"}
          </button>
        </form>
      )}
    </div>
  );
}