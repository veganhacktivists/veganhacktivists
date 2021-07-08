import BaseButton from "../baseButton";
import { ButtonProps } from "../buttons";

const IconButton: React.FC<ButtonProps> = (props) => {

    const {
        linkUrl,
        label,
        style
    } = props;
  
    return (
      <BaseButton linkUrl={linkUrl}>
          <a
            aria-label={label}
            className={style}
          >
            {props.children}
          </a>
      </BaseButton>
    );
};
  
export default IconButton;