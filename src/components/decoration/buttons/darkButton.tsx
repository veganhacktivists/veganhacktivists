import BaseButton from "./baseButton";
import { ButtonProps } from "./buttons";

//TODO: define secondary button classes

const DarkButton: React.FC<ButtonProps> = ({ linkUrl, children }) => {
  
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
  
export default DarkButton;