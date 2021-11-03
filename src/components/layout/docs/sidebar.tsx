import { useRouter } from 'next/router';
import { useHash } from '../../../hooks/useHash';
import getThemeColor from '../../../lib/helpers/theme';
import type {
  IDocsCategoryFields,
  IDocsSectionFields,
  IDocumentationFields,
} from '../../../types/generated/contentful';

type DocumentationProps = IDocumentationFields;

const Documentation: React.FC<DocumentationProps> = ({ title, slug }) => {
  const [, setSelectedDoc] = useHash();

  return (
    <div>
      <div
        onClick={() => {
          setSelectedDoc(slug);
        }}
        className="cursor-pointer py-1"
      >
        {title}
      </div>
    </div>
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
      <div className="list-item list-disc mx-4 px-1 list-outside">
        {subsections?.map((doc) => (
          <Documentation key={doc.fields.slug} {...doc.fields} />
        ))}
      </div>
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
        onClick={() => {
          // onSelectCategory(item.category.slug);
        }}
        className="cursor-pointer w-min px-2 py-1 font-mono text-2xl font-bold text-white"
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
  const router = useRouter();

  return (
    <div className="sticky left-0 top-0 w-1/4 max-h-screen overflow-auto text-left p-10 h-screen space-y-4">
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
