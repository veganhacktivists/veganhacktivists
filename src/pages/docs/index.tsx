import type { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useMemo, useRef } from 'react';
import Circle from '../../components/decoration/circle';
import Sidebar from '../../components/layout/docs/sidebar';
import { getContents } from '../../lib/cms';
import type {
  IDocsCategory,
  IDocsCategoryFields,
  IDocsSection,
  IDocumentationFields,
} from '../../types/generated/contentful';
import ContentfulImage from '../../components/layout/contentfulImage';
import Link from 'next/link';
import useDocsStore from '../../lib/stores/docsStore';
import { Waypoint } from 'react-waypoint';

export const getStaticProps: GetStaticProps = async () => {
  const categories = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: { order: 'fields.order', include: 3 },
  });

  return {
    props: {
      categories,
    },
    revalidate: 10, // TODO: change to 480 when David stops testing stuff
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
      <div className="flex flex-col gap-y-10 justify-center md:w-2/3 z-10 pb-10 text-2xl px-16 font-mono">
        <h1 className="text-4xl">VH Documentation</h1>
        <div>
          Whether you&apos;re a developer, designer, or just someone interested
          in our internal policies, find detailed documentation of everything
          and anything you&apos;d ever need to know about us in one convenient
          spot! We update our documentation every week.
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
      <ul className="list-disc ml-5">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ul className="list-disc ml-5">{children}</ul>
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

    return [categoryDate, sectionDate, ...docDates]
      .filter((x) => !!x)
      .reduce((a, b) => (a < b ? a : b));
  }, [category.fields.slug]);

  return (
    <div className="w-full md:flex-[3] py-10 text-left px-10 md:pr-48 bg-white">
      <div className="mb-5 flex flex-row justify-between">
        <div>
          <h2
            className="font-mono text-xl font-bold"
            style={{ color: category.fields.color }}
          >
            {category.fields.name}
          </h2>
          <h3 className="text-3xl font-bold">{section.fields.title}</h3>
        </div>
        <div className="text-normal text-right md:text-left">
          <span className="font-bold">Last updated:</span>{' '}
          <span className="block md:inline">
            {new Intl.DateTimeFormat('en', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            }).format(updatedAt)}
          </span>
        </div>
      </div>

      {content && (
        <div id={slug}>
          {documentToReactComponents(content, richTextOptions)}
        </div>
      )}
      {subsections?.map((doc) => (
        <SubSection key={doc.fields.slug} {...doc.fields} />
      ))}
    </div>
  );
};

const SubSection: React.FC<IDocumentationFields> = ({
  slug,
  title,
  content,
}) => {
  const setCurrentDocSlug = useDocsStore((state) => state.setCurrentDocSlug);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Waypoint
        onEnter={() => {
          setCurrentDocSlug(slug);
        }}
      />
      <div key={slug} id={slug} ref={ref}>
        <h2 className="text-2xl font-bold">{title}</h2>
        {documentToReactComponents(content, richTextOptions)}
      </div>
    </>
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

  const { selectedSectionSlug, setSelectedSectionSlug } = useDocsStore();

  useEffect(() => {
    setSelectedSectionSlug(categories[0].fields.sections[0].fields.slug);
  }, [categories]);

  const category = categories.find((cat) =>
    cat.fields.sections.find(
      (section) => section.fields.slug === selectedSectionSlug
    )
  );

  return (
    <>
      <NextSeo title="Docs" noindex />
      <Header />
      <div className="flex flex-col md:flex-row bg-grey-over-background">
        <Sidebar categories={categories.map((cat) => cat.fields)} />
        {selectedSectionSlug && (
          <Content
            section={allSections[selectedSectionSlug]}
            category={category as IDocsCategory}
          />
        )}
      </div>
    </>
  );
};

export default Docs;
