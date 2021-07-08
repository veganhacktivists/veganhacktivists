import BaseButton from "./baseButton";
import { IButton } from "./buttons";

// TODO: define what a submit should look like
const SubmitButton: React.FC<IButton> = (props) => {
  
    return (
      <BaseButton style="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform"></BaseButton>
    );
};
  
export default SubmitButton;