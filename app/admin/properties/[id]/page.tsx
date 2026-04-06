"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type MediaItem = {
  id: number;
  propertyId: string; // ✅ FIXED (was number)
  fileUrl: string;
  mediaType: string;
  createdAt: string;
};

// Fetch media from your API
async function fetchPropertyMedia(propertyId: string): Promise<MediaItem[]> {
  const res = await fetch(`/api/propertyMedia?propertyId=${propertyId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }

  return res.json();
}

export default function PropertyMediaPage() {
  const params = useParams<{ id: string }>();
  const propertyId = params.id; // ✅ FIXED (no Number())

  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!propertyId) return;

    async function loadImages() {
      try {
        setLoading(true);
        setFeedback("");

        const data = await fetchPropertyMedia(propertyId);
        setImages(data);
      } catch (err) {
        console.error(err);
        setFeedback("Failed to load images.");
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, [propertyId]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Property Media Manager
            </h1>
            <p className="mt-2 text-slate-600">
              Manage pictures for this listing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/properties"
              className="rounded-lg border bg-white px-5 py-3 text-sm font-medium text-slate-700"
            >
              Back to Dashboard
            </Link>

            <Link
              href={`/upload?propertyId=${propertyId}`}
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              Upload More Media
            </Link>
          </div>
        </div>

        {feedback && (
          <div className="mb-6 rounded-xl border bg-white p-4 text-sm text-slate-700">
            {feedback}
          </div>
        )}

        {loading && (
          <div className="rounded-xl border bg-white p-6 text-slate-500">
            Loading media...
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-slate-500">
            No media uploaded yet.
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <img
                src={img.fileUrl}
                alt="Property"
                className="h-64 w-full object-cover"
              />

              <div className="space-y-3 p-4">
                <p className="break-all text-xs text-slate-500">
                  {img.fileUrl}
                </p>

                <button
                  className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
                  onClick={() => alert("Delete API coming next")}
                >
                  Delete Media
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}