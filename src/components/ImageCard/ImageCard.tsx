import React from "react";

interface ImageCardProps {
  url: string;
  name: string;
  fullInfo: object;
  openModal: (info: object) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  url,
  name,
  fullInfo,
  openModal,
}) => {
  const clickHandler = () => {
    openModal(fullInfo);
  };

  return <img onClick={clickHandler} src={url} alt={name} />;
};

export default ImageCard;
