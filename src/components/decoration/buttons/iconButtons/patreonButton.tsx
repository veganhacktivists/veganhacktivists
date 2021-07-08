import { faPatreon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IButton } from "../buttons";
import IconButton from "./IconButton";

const PatreonButton: React.FC<IButton> = (props) => {

  const {
    linkUrl,
    label,
    style
  } = props;
  
    return (
      <IconButton linkUrl={linkUrl} label={label} style="bg-white hover:bg-strawberry text-grey hover:text-white rounded-full px-1 py-2 mx-2">
        <FontAwesomeIcon size="2x" fixedWidth icon={faPatreon} />
      </IconButton>
    );
};
  
export default PatreonButton;