import getThemeColor from '../../lib/helpers/theme';

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
  const backgroundColor = getThemeColor(color);
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
