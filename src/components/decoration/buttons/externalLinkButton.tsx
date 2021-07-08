import BaseButton from "./baseButton";
import { IButton } from "./buttons";

const ExternalLinkButton: React.FC<IButton> = (props) => {

    const {
        linkUrl
    } = props;
  
    return (
      <BaseButton linkUrl={linkUrl} style="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
          {props.children}
      </BaseButton>
    );
};
  
export default ExternalLinkButton;