import BaseButton from "./baseButton";
import { IButton } from "./buttons";

const PrimaryButton: React.FC<IButton> = (props) => {

    const {
        linkUrl
    } = props;
  
    return (
      <BaseButton linkUrl={linkUrl}>
          {props.children}
      </BaseButton>
    );
};
  
export default PrimaryButton;