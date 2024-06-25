import { Img, Imgs } from "../App/App.types";

export interface ImageGalleryProps {
  data: Imgs;
  openModal: (data: Img) => void;
}
