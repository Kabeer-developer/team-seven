import { useEffect, useState } from "react";
import { getGallery } from "../services/galleryService";
import api from "../services/api";

const Gallery = () => {
  const [images, setImages] = useState([]);

  // 🔥 FIX: remove /api
  const BASE_URL = api.defaults.baseURL.replace("/api", "");

  useEffect(() => {
    getGallery().then(setImages);
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        Gallery
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => {
          const imageSrc = img.image?.startsWith("/uploads")
            ? `${BASE_URL}${img.image}`
            : img.image;

          return (
            <div
              key={img._id}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white"
            >
              {/* Image */}
              <img
                src={imageSrc}
                alt={img.caption || "gallery"}
                className="h-48 w-full object-cover"
              />

              {/* Caption */}
              {img.caption && (
                <div className="p-3 text-sm text-gray-700">
                  {img.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;