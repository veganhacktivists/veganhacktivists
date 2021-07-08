import { IButton } from "./buttons";

const BaseButton: React.FC<IButton> = (props) => {

    const {
        text
    } = props;
  
    return (
      <button type="submit">{text}</button>
    );
};
  
export default BaseButton;