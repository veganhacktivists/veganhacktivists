import Link from "next/link";
import { ButtonProps } from "./buttons";

const BaseButton: React.FC<ButtonProps> = ({ linkUrl, children }) => {
  
    return linkUrl
      ? <Link href={linkUrl} passHref>
          {children}
        </Link>
      : <button type="submit">
          {children}
        </button>
};
  
export default BaseButton;