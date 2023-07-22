import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button({ onClick }) {
  return (
    <div className={css.button_center}>
      <button type="button" onClick={onClick} className={css.button}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
