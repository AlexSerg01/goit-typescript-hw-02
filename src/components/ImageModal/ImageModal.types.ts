import { Img } from "../App/App.types";

export interface ImageModalProps {
  info: Img;
  isOpen: boolean;
  onRequestClose: () => void;
}

export interface ModalStyles {
  overlay?: React.CSSProperties;
  content?: React.CSSProperties;
}
