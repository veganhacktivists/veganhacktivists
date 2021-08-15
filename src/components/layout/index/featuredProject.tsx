import type { IProjectFields } from '../../../types/generated/contentful';
import ContentfulImage from '../ContentfulImage';

const FeaturedProject: React.FC<IProjectFields> = ({ url, image }) => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <a href={url} target="_blank" rel="noreferrer">
        <ContentfulImage image={image} alt={url} layout="responsive" />
      </a>
    </div>
  );
};

export default FeaturedProject;
