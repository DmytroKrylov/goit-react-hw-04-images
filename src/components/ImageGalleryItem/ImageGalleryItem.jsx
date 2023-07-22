import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ url, tags, largeUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css.imageGalleryItem_image}
        src={url}
        alt={tags}
      />
      {showModal && <Modal onClose={toggleModal} src={largeUrl} alt={tags} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
};
