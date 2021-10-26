import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Entry } from 'contentful';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Circle from '../../components/decoration/circle';
import Sidebar from '../../components/layout/docs/sidebar';
import { getContents } from '../../lib/cms';
import type {
  IDocsCategory,
  IDocsCategoryFields,
  IDocumentation,
  IDocumentationFields,
} from '../../types/generated/contentful';

export const getStaticProps = async () => {
  const [categories, documentation] = await Promise.all([
    getContents<IDocsCategoryFields>({
      contentType: 'docsCategory',
    }),
    getContents({ contentType: 'documentation' }),
  ]);

  const compareCategories: (
    a: Entry<IDocsCategoryFields>,
    b: Entry<IDocsCategoryFields>
  ) => number = (a, b) => {
    if (a.fields.parent === undefined && b.fields.parent === undefined) {
      return 0;
    } else if (a.fields.parent === undefined) {
      return -1;
    } else if (b.fields.parent === undefined) {
      return 1;
    }

    return a.fields.parent?.fields?.name > b.fields.parent?.fields?.name
      ? 1
      : b.fields.parent?.fields?.name > a.fields.parent?.fields?.name
      ? -1
      : 0;
  };

  return {
    props: {
      // TODO: clean this up. This way, parent props always are first in the list
      categories: categories
        .sort(compareCategories)
        .sort(compareCategories)
        .sort(compareCategories)
        .sort(compareCategories),
      documentation: documentation,
    },
    revalidate: 480,
  };
};

interface DocsProps {
  categories: IDocsCategory[];
  documentation: IDocumentation[];
  // ...
}

const Header: React.FC = () => {
  return (
    <div className="flex relative flex-col md:flex-row bg-black justify-around text-white md:px-20 overflow-hidden min-h-[350px]">
      <Circle opacity={0.1} />
      <Circle opacity={0.05} xAlign="right" yAlign="bottom" radiusZoom={0.5} />
      <div className="flex flex-col gap-y-10 justify-center md:w-1/2 z-10 pb-10 text-2xl px-16 font-mono">
        <h1 className="text-4xl">Vegan Hacktivists - Documentation</h1>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          tempora ipsum provident et doloremque, numquam vel repudiandae nulla
          necessitatibus neque quisquam voluptatem similique odit quas incidunt
          aperiam eaque exercitationem accusamus!
        </div>
      </div>
    </div>
  );
};

const Content: React.FC<{ documentation: IDocumentationFields }> = ({
  documentation,
}) => {
  return (
    <div className="w-full flex-[3]">
      {documentToReactComponents(documentation.content)}
    </div>
  );
};

const Docs: React.FC<DocsProps> = ({ categories, documentation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  const docs = documentation.find(
    (doc) => doc.fields.category?.fields.slug === selectedCategory
  );

  return (
    <>
      <NextSeo title="Docs" noindex />
      <Header />
      <div className="flex flex-row">
        <Sidebar
          categories={categories.map((cat) => cat.fields)}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        {docs ? (
          <Content documentation={docs.fields} />
        ) : (
          <div>Can&apos;t find this docs!</div>
        )}
      </div>
    </>
  );
};

export default Docs;
