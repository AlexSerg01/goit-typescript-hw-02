import { Img } from "../App/App.types";

export interface ImageCardProps {
  url: string;
  name: string;
  fullInfo: Img;
  openModal: (data: Img) => void;
}
