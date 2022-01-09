import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo, useState } from 'react';
import type { IDocsCategoryFields } from '../../../types/generated/contentful';
import { FillBackground } from '../../decoration/buttons/utils';
import TextInput from '../../forms/inputs/textInput';
import type { SearchItem } from './searchResults';
import SearchResults from './searchResults';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

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
    <div className="flex pl-5 pb-4">
      <div className="flex flex-row h-12 w-full relative">
        <div className="w-4/5">
          <TextInput
            className="h-full"
            placeholder="Search"
            onInput={(e) => {
              setSearchTerm(e.currentTarget.value);
            }}
            value={searchTerm}
          />
        </div>
        <FillBackground base="grey-dark" fill="green">
          <button className="h-12 w-14 flex justify-center items-center">
            <FontAwesomeIcon icon={faSearch} size="lg" color="white" />
          </button>
        </FillBackground>
        <SearchResults
          className="absolute top-12 bg-white"
          searchItems={searchItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default SearchBar;
