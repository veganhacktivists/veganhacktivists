import { useEffect } from 'react';
import { useHash } from '../../../hooks/useHash';
import getThemeColor from '../../../lib/helpers/theme';
import type {
  IDocsCategoryFields,
  IDocsSectionFields,
  IDocumentationFields,
} from '../../../types/generated/contentful';

interface DocumentationProps extends IDocumentationFields {
  onSelect: () => void;
}

const Documentation: React.FC<DocumentationProps> = ({
  title,
  slug,
  onSelect,
}) => {
  const [, setSelectedDoc] = useHash();

  return (
    <li>
      <div
        onClick={() => {
          onSelect();
          setSelectedDoc(slug);
        }}
        className="cursor-pointer py-1"
      >
        {title}
      </div>
    </li>
  );
};
interface SectionProps extends IDocsSectionFields {
  onChangeSelected: SidebarProps['onSelectSection'];
  selectedSection: SidebarProps['selectedSection'];
  color: IDocsCategoryFields['color'];
}

const Section: React.FC<SectionProps> = ({
  slug,
  title,
  color,
  subsections,
  onChangeSelected,
  selectedSection,
}) => {
  const lightGrey = getThemeColor('grey-light');

  const isSelected = selectedSection === slug;

  return (
    <div
      className="pl-5 border-l-4 my-2"
      style={{ borderColor: isSelected ? color : lightGrey }}
    >
      <div
        onClick={() => {
          onChangeSelected(slug);
        }}
        className="cursor-pointer py-1 text-xl font-bold"
      >
        {title}
      </div>
      {subsections && (
        <ul className="list-disc mx-4 px-1 list-outside">
          {subsections.map((doc) => (
            <Documentation
              key={doc.fields.slug}
              {...doc.fields}
              onSelect={() => {
                onChangeSelected(slug);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

type CategoryProps = IDocsCategoryFields &
  Pick<SidebarProps, 'onSelectSection' | 'selectedSection'>;

const Category: React.FC<CategoryProps> = ({
  name,
  color,
  onSelectSection,
  selectedSection,
  sections,
}) => {
  const lightGrey = getThemeColor('grey-light');

  return (
    <details className="pl-5" open>
      <summary
        className="cursor-pointer md:w-4/5 box-border px-2 py-1 font-mono text-2xl font-bold text-white"
        style={{
          backgroundColor: color || lightGrey,
        }}
      >
        {name}
      </summary>
      <div>
        {sections?.map((section) => (
          <Section
            key={section.fields.slug}
            {...section.fields}
            onChangeSelected={onSelectSection}
            selectedSection={selectedSection}
            color={color}
          />
        ))}
      </div>
    </details>
  );
};

interface SidebarProps {
  categories: IDocsCategoryFields[];
  selectedSection: IDocsSectionFields['slug'];
  onSelectSection: (slug: IDocsSectionFields['slug']) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedSection,
  onSelectSection,
}) => {
  const [, setHash] = useHash();

  useEffect(() => {
    setHash('');
  }, [selectedSection]);

  return (
    <div className="md:sticky md:left-0 md:top-0 md:w-1/4 overflow-auto text-left p-10 md:h-screen space-y-4 py-20">
      {categories.map((cat) => (
        <Category
          key={cat.slug}
          {...cat}
          selectedSection={selectedSection}
          onSelectSection={onSelectSection}
        />
      ))}
    </div>
  );
};

export default Sidebar;
