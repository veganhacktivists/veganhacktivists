import Link from 'next/link';
import type { DetailedHTMLProps } from 'react';
import React from 'react';
import Highlighter from 'react-highlight-words';
import useFuse from '../../../hooks/useFuse';
import type {
  IDocsCategoryFields,
  IDocsSection,
  IDocumentation,
} from '../../../types/generated/contentful';

export interface SearchItem {
  category: IDocsCategoryFields;
  section: IDocsSection;
  subsection?: IDocumentation;
}

interface SearchResultsProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  searchItems: SearchItem[];
  searchTerm?: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchItems,
  searchTerm,
  setSearchTerm,
  ...props
}) => {
  const res = useFuse<SearchItem>({
    data: searchItems,
    term: searchTerm,
    options: {
      keys: [
        'category.name',
        'section.fields.title',
        'subsection.fields.title',
      ],
      threshold: 0,
      ignoreLocation: true,
      isCaseSensitive: false,
    },
  });

  return (
    <div {...props}>
      {searchTerm &&
        res.map((item) => {
          return (
            <div
              className="hover:bg-grey-background active:bg-grey-light"
              key={
                item.subsection
                  ? item.subsection.fields.slug
                  : item.section.fields.slug
              }
              onClick={() => {
                setSearchTerm('');
              }}
            >
              <Link
                href={{
                  pathname: '/docs/[category]/[section]',
                  query: {
                    category: item.category.slug,
                    section: item.section.fields.slug,
                  },
                  hash: item.subsection?.fields.slug,
                }}
                passHref
              >
                <Highlighter
                  searchWords={[searchTerm]}
                  textToHighlight={
                    item.category.name +
                    ' -> ' +
                    item.section.fields.title +
                    (item.subsection
                      ? ' -> ' + item.subsection.fields.title
                      : '')
                  }
                  highlightTag={'b'}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResults;
