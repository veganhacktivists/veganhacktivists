import type { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useMemo, useState } from 'react';
import Circle from '../../components/decoration/circle';
import Sidebar from '../../components/layout/docs/sidebar';
import { getContents } from '../../lib/cms';
import type {
  IDocsCategory,
  IDocsCategoryFields,
  IDocsSection,
} from '../../types/generated/contentful';
import ContentfulImage from '../../components/layout/contentfulImage';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async () => {
  const categories = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: { order: 'fields.order', include: 3 },
  });

  return {
    props: {
      categories,
    },
    revalidate: 480,
  };
};

interface DocsProps {
  categories: IDocsCategory[];
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

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <div>
        <ContentfulImage
          image={node.data?.target}
          alt={node.data?.target?.fields?.title}
        />
      </div>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-3xl pt-10">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl pt-7">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h2 className="text-xl pt-5">{children}</h2>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ul className="list-disc list-inside">{children}</ul>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Link href={node.data.uri}>
        <a className="underline font-semibold hover:text-grey visited:text-grey">
          {children}
        </a>
      </Link>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mt-5 first:mt-0">{children}</p>
    ),
  },
};

interface ContentProps {
  section: IDocsSection;
  category: IDocsCategory;
}

const Content: React.FC<ContentProps> = ({ section, category }) => {
  const { subsections, content, slug } = section.fields;

  const updatedAt = useMemo(() => {
    const categoryDate = new Date(category.sys.updatedAt);
    const sectionDate = new Date(section.sys.updatedAt);
    const docDates =
      section.fields.subsections?.map((doc) => new Date(doc.sys.updatedAt)) ||
      [];

    return [categoryDate, sectionDate, ...docDates].reduce((a, b) =>
      a < b ? a : b
    );
  }, [category.fields.slug]);

  return (
    <div className="w-full flex-[3] mt-10 text-left pr-48">
      <div className="mb-5 flex flex-row justify-between">
        <div>
          <div
            className="font-mono text-xl font-bold"
            style={{ color: category.fields.color }}
          >
            {category.fields.name}
          </div>
          <div className="text-3xl font-bold">{section.fields.title}</div>
        </div>
        <div className="text-normal">
          Last updated:{' '}
          {new Intl.DateTimeFormat('en', {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
          }).format(updatedAt)}
        </div>
      </div>

      {content && (
        <div id={slug}>
          {(documentToReactComponents(content), richTextOptions)}
        </div>
      )}
      {subsections?.map((doc) => {
        return (
          <div key={doc.fields.slug} id={doc.fields.slug}>
            <h2 className="text-2xl font-bold">{doc.fields.title}</h2>
            {documentToReactComponents(doc.fields.content, richTextOptions)}
          </div>
        );
      })}
    </div>
  );
};

const getAllSections: (
  categories: IDocsCategory[]
) => Record<string, IDocsSection> = (categories) => {
  const sections: Record<string, IDocsSection> = {};
  categories.forEach((cat) => {
    cat.fields.sections?.forEach((section) => {
      sections[section.fields.slug] = section;
    });
  });

  return sections;
};

const Docs: React.FC<DocsProps> = ({ categories }) => {
  const allSections = useMemo(() => getAllSections(categories), [categories]);

  const [selectedSectionSlug, setSelectedSectionSlug] = useState(
    categories[0].fields.sections[0].fields.slug
  );

  const category = categories.find((cat) =>
    cat.fields.sections.find(
      (section) => section.fields.slug === selectedSectionSlug
    )
  );

  const docsToShow = allSections[selectedSectionSlug].fields.subsections;

  return (
    <>
      <NextSeo title="Docs" noindex />
      <Header />
      <div className="flex flex-row">
        <Sidebar
          categories={categories.map((cat) => cat.fields)}
          onSelectSection={setSelectedSectionSlug}
          selectedSection={selectedSectionSlug}
        />
        {docsToShow ? (
          <Content
            section={allSections[selectedSectionSlug]}
            category={category as IDocsCategory}
          />
        ) : (
          <div>Can&apos;t find this docs!</div>
        )}
      </div>
    </>
  );
};

export default Docs;
