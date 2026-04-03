"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, MapPin, DollarSign, Image as ImageIcon } from "lucide-react";

export default function AddProperty() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we will log it. In the next step, we connect to Postgres/Prisma.
    console.log("Saving Property:", formData);
    alert("Property Saved! (Mock)");
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Home className="text-blue-600" /> Add New Verified Home
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Title</label>
          <input 
            type="text" 
            placeholder="e.g. 5 Bedroom Duplex in Asokoro"
            className="w-full p-3 border rounded-xl outline-blue-500"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Maitama, Abuja"
                className="w-full p-3 pl-10 border rounded-xl outline-blue-500"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Price (₦)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="number" 
                placeholder="150000000"
                className="w-full p-3 pl-10 border rounded-xl outline-blue-500"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL (Mock)</label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="https://images.unsplash.com/..."
              className="w-full p-3 pl-10 border rounded-xl outline-blue-500"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition">
          Verify & Publish Listing
        </button>
      </form>
    </div>
  );
}