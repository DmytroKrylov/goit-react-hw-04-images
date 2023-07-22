import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownEsc);
  }
  onKeydownEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseByBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div onClick={this.onCloseByBackdrop} className={css.overlay}>
        <div className={css.modal}>
          <button
            className={css.buttonClose}
            type="button"
            onClick={this.onCloseByBackdrop}
          ></button>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
