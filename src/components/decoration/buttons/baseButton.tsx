import Link from "next/link";
import { ButtonProps } from "./buttons";

const BaseButton: React.FC<ButtonProps> = (props) => {

    const {
        linkUrl
    } = props;
  
    return linkUrl
      ? <Link href={linkUrl} passHref>
          {props.children}
        </Link>
      : <button type="submit">
          {props.children}
        </button>
};
  
export default BaseButton;