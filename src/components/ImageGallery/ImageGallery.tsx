import React from "react";
import { ImageData, ModalData } from "../App/App";

interface ImageGalleryProps {
  data: ImageData[];
  openModal: (data: ModalData) => void;
}

const ImageGallery = React.forwardRef<HTMLUListElement, ImageGalleryProps>(
  ({ data, openModal }, ref) => {
    return (
      <ul ref={ref}>
        {data.map((image) => (
          <li
            key={image.id}
            onClick={() =>
              openModal({
                id: image.id,
                urls: { regular: image.urls.regular },
                alt_description: image.urls.alt_description,
                description: image.description,
                user: { username: image.user.username },
              })
            }
          >
            <img src={image.urls.small} alt={image.urls.alt_description} />
          </li>
        ))}
      </ul>
    );
  }
);

export default ImageGallery;
