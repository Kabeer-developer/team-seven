import { useEffect, useState } from "react";
import { getGallery } from "../services/galleryService";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getGallery().then(setImages);
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      {images.map((img) => (
        <img key={img._id} src={img.image} width="200" />
      ))}
    </div>
  );
};

export default Gallery;