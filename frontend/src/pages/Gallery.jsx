import { useEffect, useState } from "react";
import { getGallery } from "../services/galleryService";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getGallery().then(setImages);
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        Gallery
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="overflow-hidden rounded-xl shadow-md transition hover:scale-105 hover:shadow-lg"
          >
            <img
              src={img.image}
              alt="gallery"
              className="h-48 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;