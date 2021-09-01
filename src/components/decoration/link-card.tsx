import useThemeColor from '../../hooks/useThemeColor';
import { DarkButton } from './buttons';

interface LinkCardProps {
  header: string;
  text: string;
  buttonText: string;
  color: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
  header,
  text,
  buttonText,
  color,
}) => {
  const backgroundColor = useThemeColor(color);
  return (
    <div>
      <div style={{ backgroundColor }}>{header}</div>
      <div>
        <p>{text}</p>
        <DarkButton>{buttonText}</DarkButton>
      </div>
    </div>
  );
};

export default LinkCard;
