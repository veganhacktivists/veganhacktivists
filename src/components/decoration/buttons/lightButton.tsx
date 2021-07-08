import BaseButton from "./baseButton";
import { ButtonProps } from "./buttons";

//TODO: define primary button classes

const LightButton: React.FC<ButtonProps> = ({ linkUrl, children }) => {
  
    return (
      <BaseButton linkUrl={linkUrl}>
        <a>
            <div className="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
                {children}
            </div>
        </a>
      </BaseButton>
    );
};
  
export default LightButton;