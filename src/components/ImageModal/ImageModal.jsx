import React from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <button onClick={onClose} className={s.closeBtn}>
        Close
      </button>
      {image && (
        <>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={s.image}
          />
          <p>{image.description || image.alt_description}</p>
          <p>by {image.user.name}</p>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
