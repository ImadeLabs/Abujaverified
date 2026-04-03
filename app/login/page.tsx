"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This sets a cookie that our middleware.ts looks for
    document.cookie = `avh_admin_token=${password}; path=/; max-age=86400`; 
    router.push('/admin/capture');
    router.refresh();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-lg border-0 rounded-4 text-center" style={{ width: '400px' }}>
        <div className="mb-4">
          <div className="bg-success d-inline-block p-3 rounded-circle text-white mb-3">🔑</div>
          <h2 className="fw-bold">AVH Admin</h2>
          <p className="text-muted small">Enter your master password to unlock the Capture Engine.</p>
        </div>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            className="form-control form-control-lg text-center mb-4" 
            placeholder="••••••••" 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-dark btn-lg w-100 rounded-pill fw-bold">Access Engine</button>
        </form>
      </div>
    </div>
  );
}