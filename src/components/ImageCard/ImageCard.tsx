import { FC } from "react";
import { ImageCardProps } from "./ImageCard.types";

const ImageCard: FC<ImageCardProps> = ({ url, name, fullInfo, openModal }) => {
  function clickHandler(): void {
    openModal(fullInfo);
  }

  return (
    <>
      <img onClick={clickHandler} src={url} alt={name} />
    </>
  );
};

export default ImageCard;
