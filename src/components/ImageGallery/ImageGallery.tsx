import React, { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

// Додайте або імпортуйте оголошення ModalData тут
interface ModalData {
  id: number;
  urls: {
    small: string;
    regular: string;
    alt_description: string;
  };
  description?: string;
  user: {
    username: string;
  };
}

interface ImageGalleryProps {
  data: {
    id: number;
    urls: {
      small: string;
      regular: string;
      alt_description: string;
    };
    description?: string;
    user: {
      username: string;
    };
  }[];
  openModal: (data: ModalData) => void; // Ensure openModal is typed correctly
}

const ImageGallery = forwardRef<HTMLUListElement, ImageGalleryProps>(
  function ImageGalleryComponent({ data, openModal }, ref) {
    return (
      <ul ref={ref} className={css.imgList}>
        {data.map((item) => (
          <li key={item.id} className={css.imgItem}>
            <ImageCard
              url={item.urls.small}
              name={item.urls.alt_description}
              fullInfo={item}
              openModal={() => openModal(item as ModalData)} // Надання правильного типу даних для openModal
            />
          </li>
        ))}
      </ul>
    );
  }
);

export default ImageGallery;
