import Link from "next/link";
import { IButton } from "./buttons";

const BaseButton: React.FC<IButton> = (props) => {

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