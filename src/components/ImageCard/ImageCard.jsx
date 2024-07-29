import React from "react";
import s from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div className={s.imageCard}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={s.image}
        onClick={() => onImageClick(image)}
      />
    </div>
  );
};

export default ImageCard;
