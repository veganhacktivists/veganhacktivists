import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { IDocumentation } from '../../../types/generated/contentful';
import type { CategoryTreeItem } from './sidebar';

interface ContentProps {
  documentation?: IDocumentation;
  category: CategoryTreeItem;
}

// const Header: React.FC = () => {
//   return <div>a</div>;
// };

const Content: React.FC<ContentProps> = ({ documentation, category }) => {
  const headerTitle = category.root?.category.name;

  return (
    <div className="w-full">
      <div className="flex flex-row">
        <div
          style={{ color: category.root.category.color }}
          className="text-2xl font-bold font-mono"
        >
          {headerTitle}
        </div>
      </div>
      {documentation &&
        documentToReactComponents(documentation?.fields.content)}
    </div>
  );
};

export default Content;
