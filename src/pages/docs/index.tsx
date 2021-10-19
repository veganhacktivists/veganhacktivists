import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Circle from '../../components/decoration/circle';
import Sidebar from 'react-sidebar';
import { getContents } from '../../lib/cms';
import type {
  IDocsCategory,
  IDocsCategoryFields,
  IDocumentation,
} from '../../types/generated/contentful';

export const getStaticProps = async () => {
  const [categories, documentation] = await Promise.all([
    getContents<IDocsCategoryFields>({
      contentType: 'docsCategory',
    }),
    getContents({ contentType: 'documentation' }),
  ]);

  return {
    props: {
      categories,
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

const Docs: React.FC<DocsProps> = ({ categories, documentation }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <NextSeo title="Docs" noindex />
      <Header />
      <div>
        <Sidebar
          open={sidebarOpen}
          sidebar={
            <div className="top-1/2 absolute z-30 text-black">test!</div>
          }
        >
          <button
            className="absolute top-1/2"
            onClick={() => setSidebarOpen(true)}
          >
            Open sidebar
          </button>
        </Sidebar>
      </div>
      <div>content</div>
    </>
  );
};

export default Docs;
