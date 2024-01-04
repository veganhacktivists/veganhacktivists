import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo, useState } from 'react';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import TextInput from '../../forms/inputs/textInput';
import { FillBackground } from '../../decoration/buttons/utils';

import SearchResults from './searchResults';

import type { IDocsCategoryFields } from '../../../types/generated/contentful';
import type { SearchItem } from './searchResults';

interface SearchBarProps {
  categories: IDocsCategoryFields[];
}

const SearchBar: React.FC<SearchBarProps> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchItems = useMemo(() => {
    const searchItems: SearchItem[] = [];
    categories.forEach((cat) => {
      cat.sections.forEach((sec) => {
        searchItems.push({
          category: cat,
          section: sec,
        });
        sec.fields.subsections?.forEach((sub) => {
          const text = documentToPlainTextString(sub.fields.content);
          searchItems.push({
            category: cat,
            section: sec,
            subsection: sub,
            text,
          });
        });
      });
    });

    return searchItems;
  }, [categories]);

  return (
    <div className="flex pb-4 pl-5">
      <div className="relative flex flex-row w-full h-12">
        <div className="w-4/5">
          <TextInput
            className="h-full"
            placeholder="Search"
            onInput={(e) => {
              setSearchTerm(e.currentTarget.value);
            }}
            value={searchTerm}
          >
            Search
          </TextInput>
        </div>
        <FillBackground base="grey-dark" fill="green">
          <button
            type="button"
            className="flex items-center justify-center h-12 w-14"
          >
            <FontAwesomeIcon icon={faSearch} size="lg" color="white" />
          </button>
        </FillBackground>
        <SearchResults
          className="absolute bg-white top-12"
          searchItems={searchItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default SearchBar;
