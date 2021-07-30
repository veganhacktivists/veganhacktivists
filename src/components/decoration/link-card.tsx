import { DarkButton } from './buttons';

type LinkCardProps = {
  header: string;
  text: string;
  buttonText: string;
  color: string;
};

const LinkCard: React.FC<LinkCardProps> = ({
  header,
  text,
  buttonText,
  color,
}) => {
  return (
    <div>
      <div className={`bg-${color}`}>{header}</div>
      <div>
        <p>{text}</p>
        <DarkButton>{buttonText}</DarkButton>
      </div>
    </div>
  );
};

export default LinkCard;
