import Link from "next/link";
import { IButton } from "./buttons";

const BaseButton: React.FC<IButton> = (props) => {

    const {
        linkUrl
    } = props;
  
    return (
      <>
        {/* if linkUrl has value */}
        {linkUrl &&
          <Link href={linkUrl} passHref>
            <a>
              <div className="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
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