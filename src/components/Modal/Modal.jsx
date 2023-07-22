import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onClose, src, alt }) => {
  useEffect(() => {
    const onKeydownEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeydownEsc);
    return () => window.removeEventListener('keydown', onKeydownEsc);
  });

  const onCloseByBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={onCloseByBackdrop} className={css.overlay}>
      <div className={css.modal}>
        <button
          className={css.buttonClose}
          type="button"
          onClick={onCloseByBackdrop}
        ></button>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
