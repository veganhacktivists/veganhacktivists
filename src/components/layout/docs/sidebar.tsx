import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import getThemeColor from '../../../lib/helpers/theme';
import useDocsStore from '../../../lib/stores/docsStore';
import type {
  IDocsCategoryFields,
  IDocsSectionFields,
  IDocumentationFields,
} from '../../../types/generated/contentful';
import SearchBar from './searchBar';

interface DocumentationProps extends IDocumentationFields {
  color: string;
  sectionSlug: IDocsSectionFields['slug'];
  categorySlug: IDocsCategoryFields['slug'];
}

const Documentation: React.FC<DocumentationProps> = ({
  title,
  slug,
  color,
  sectionSlug,
  categorySlug,
}) => {
  const { currentDocSlug, setCurrentDocSlug, setSelectedSectionSlug } =
    useDocsStore();

  const [hover, setHover] = useState(false);
  const isSelected = currentDocSlug === slug;

  return (
    <li>
      <Link
        href={{
          pathname: '/docs/[category]/[section]',
          query: { category: categorySlug, section: sectionSlug },
          hash: slug,
        }}
      >
        <a>
          <div
            onClick={() => {
              setCurrentDocSlug(slug);
              setSelectedSectionSlug(sectionSlug);
              setTimeout(() => {
                document.getElementById(slug)?.scrollIntoView();
              });
            }}
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            className={classNames('cursor-pointer py-1', {
              'font-bold': isSelected,
            })}
            style={{
              color: isSelected || hover ? color : 'inherit',
            }}
          >
            {title}
          </div>
        </a>
      </Link>
    </li>
  );
};
interface SectionProps extends IDocsSectionFields {
  color: IDocsCategoryFields['color'];
  categorySlug: IDocsCategoryFields['slug'];
}

const Section: React.FC<SectionProps> = ({
  slug,
  categorySlug,
  title,
  color,
  subsections,
}) => {
  const lightGrey = getThemeColor('grey-light');
  const sectionRef = useRef<HTMLDivElement>(null);

  const selectedSectionSlug = useDocsStore(
    (state) => state.selectedSectionSlug
  );

  const isSelected = selectedSectionSlug === slug;

  return (
    <div
      className="pl-5 border-l-4 my-2"
      style={{ borderColor: isSelected ? color : lightGrey }}
      ref={sectionRef}
    >
      <Link
        href={{
          pathname: '/docs/[category]/[section]',
          query: { category: categorySlug, section: slug },
        }}
      >
        <a>
          <div className="cursor-pointer py-1 text-xl font-bold">{title}</div>
        </a>
      </Link>

      {subsections && (
        <ul className="mx-4 px-1 list-outside">
          {subsections.map((doc) => (
            <Documentation
              key={doc.fields.slug}
              {...doc.fields}
              categorySlug={categorySlug}
              sectionSlug={slug}
              color={color}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

type CategoryProps = IDocsCategoryFields;

const Category: React.FC<CategoryProps> = ({ name, slug, color, sections }) => {
  const lightGrey = getThemeColor('grey-light');
  const selectedCategory = useDocsStore((state) => state.selectedCategory);

  const isActive = slug === selectedCategory;

  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (!isActive) return;

    setOpen(isActive);
  }, [selectedCategory, firstRender]);

  return (
    <details className="pl-5" open={open}>
      <summary
        className="cursor-pointer box-border px-2 py-1 font-mono text-2xl font-bold text-white"
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
            categorySlug={slug}
            color={color}
          />
        ))}
      </div>
    </details>
  );
};

interface SidebarProps {
  categories: IDocsCategoryFields[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  return (
    <div className="md:sticky md:left-0 md:top-0 md:w-1/4 overflow-auto text-left p-10 md:h-screen space-y-4 py-12">
      <SearchBar categories={categories} />
      {categories.map((cat) => (
        <Category key={cat.slug} {...cat} />
      ))}
    </div>
  );
};

export default Sidebar;
