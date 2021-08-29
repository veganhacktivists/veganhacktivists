import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Circle from '../../decoration/circle';
import Image from 'next/image';

import roundLogo from '../../../../public/images/VH_Logo_Crest_Tagline.png';
import useThemeColor from '../../../hooks/useThemeColor';

interface HeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
}

const TAGS = [
  'Project Updates',
  'Announcements',
  'Meet the Team',
  'Data and Research',
  'Interviews',
  'Other',
];

const BlogsHeader: React.FC<HeaderProps> = ({ query, onQueryChange }) => {
  const greyLight = useThemeColor('grey-light');

  return (
    <div className="flex relative flex-col md:flex-row bg-black justify-around text-white px-20 pt-10 pb-0 overflow-hidden">
      <Circle opacity={0.1} />
      <Circle opacity={0.05} xAlign="right" yAlign="bottom" radiusZoom={0.5} />
      <div className="flex flex-col justify-center w-1/2 z-10 pb-10">
        <div className="w-48 mx-auto my-10">
          <Image src={roundLogo} alt="" />
        </div>
        <div className="text-3xl px-16">
          This is the official blog for the Vegan Hacktivists. We regularly post
          project updates, announcements, interviews, and other fun stuff here!
          Thanks for reading!
        </div>
      </div>
      <div className="bg-grey-dark mt-10 p-10">
        <label className="border-2 border-grey-lighter p-2 text-xl">
          <input
            className="bg-invisible outline-none pr-2"
            type="text"
            name="query"
            id="blogQuery"
            value={query}
            onChange={(e) => {
              onQueryChange(e.target.value);
            }}
          />
          <FontAwesomeIcon icon={faSearch} color={greyLight} />
        </label>
        <div className="mt-5 text-left text-xl">
          <div className="font-bold uppercase text-3xl font-mono">
            Categories
          </div>
          {TAGS.map((tag, i) => (
            <div key={i} className="pb-2">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsHeader;
