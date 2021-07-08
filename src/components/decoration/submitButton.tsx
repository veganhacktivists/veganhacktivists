import { IButton } from "./buttons";

const SubmitButton: React.FC<IButton> = (props) => {

    const {
        text
    } = props;
  
    return (
      <button type="submit">{text}</button>
    );
};
  
export default SubmitButton;