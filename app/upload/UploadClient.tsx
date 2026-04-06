"use client";

import { useRef, useState, ChangeEvent } from "react";

type UploadClientProps = {
  propertyId: string;
};

export default function UploadClient({ propertyId }: UploadClientProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  }

  async function handleUpload() {
    if (!files.length) {
      setFeedback("Please select at least one image.");
      return;
    }

    setUploading(true);
    setFeedback("");

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (!data.secure_url) {
          throw new Error("Upload failed");
        }

        uploadedUrls.push(data.secure_url);
      }

      //  Send to your backend (Prisma)
      await fetch("/api/propertyMedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          images: uploadedUrls,
        }),
      });

      setFeedback("Images uploaded successfully!");
      setFiles([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      setFeedback("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-green-800">
        Upload Property Images
      </h1>

      <p className="mb-4 text-sm text-slate-600">
        Property ID: {propertyId || "Not found"}
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4 block w-full rounded-lg border border-slate-300 p-3"
      />

      {files.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 font-medium text-slate-800">Selected files:</p>
          <ul className="space-y-1 text-sm text-slate-600">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>

      {feedback && <p className="mt-4 text-sm text-slate-700">{feedback}</p>}
    </div>
  );
}