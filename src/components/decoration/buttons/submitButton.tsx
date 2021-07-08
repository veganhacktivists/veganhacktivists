import BaseButton from "./baseButton";
import { IButton } from "./buttons";

const SubmitButton: React.FC<IButton> = (props) => {

    const {
        text
    } = props;
  
    return (
      <BaseButton text={text}></BaseButton>
    );
};
  
export default SubmitButton;