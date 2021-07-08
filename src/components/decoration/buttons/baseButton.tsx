import Link from "next/link";
import { IButton } from "./buttons";

const BaseButton: React.FC<IButton> = (props) => {

    const {
        linkUrl,
        style
    } = props;
  
    return (
      <>
        {/* if linkUrl has value */}
        {linkUrl &&
          <Link href={linkUrl} passHref>
            <a>
              <div className={style}>
                {props.children}
              </div>
            </a>
          </Link>
        }
        {/* if linkUrl does not have value */}
        {!linkUrl &&
          <button type="submit">
            {props.children}
          </button>
        }
      </>
    );
};
  
export default BaseButton;