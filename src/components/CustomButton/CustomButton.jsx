import { Link } from 'react-router-dom';
import '../CustomButton/CustomButton.css'

const STYLES = ['btn--primary'];

const SIZES = ['btn--medium'];

export const CustomButton = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize, path
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    
    <Link to={path}>
      <button
        className={`btn btn-action ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
