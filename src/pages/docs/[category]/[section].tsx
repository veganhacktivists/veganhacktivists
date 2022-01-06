import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { Fragment, useEffect, useMemo, useRef } from 'react';
import { Waypoint } from 'react-waypoint';
import Sidebar from '../../../components/layout/docs/sidebar';
import { getContents } from '../../../lib/cms';
import type {
  IDocsCategory,
  IDocsCategoryFields,
  IDocsSection,
  IDocumentationFields,
} from '../../../types/generated/contentful';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import type { Options } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import ContentfulImage from '../../../components/layout/contentfulImage';
import Circle from '../../../components/decoration/circle';
import useDocsStore from '../../../lib/stores/docsStore';
import { useHash } from '../../../hooks/useHash';

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: { order: 'fields.order', include: 3 },
  });

  const allPaths: { category: string; section: string }[] = [];
  categories.forEach((category) => {
    category.fields.sections.forEach((section) => {
      allPaths.push({
        category: category.fields.slug,
        section: section.fields.slug,
      });
    });
  });

  return {
    paths: allPaths.map((path) => ({ params: path })),
    fallback: true,
  };
};

interface DocsProps {
  categories: IDocsCategory[];
  section: IDocsSection;
  category: IDocsCategory;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = (
    await (params?.category
      ? getContents<IDocsCategoryFields>({
          contentType: 'docsCategory',
          query: {
            slug: params?.category,
          },
          other: {
            limit: 1,
            include: 3,
          },
        })
      : getContents<IDocsCategoryFields>({
          contentType: 'docsCategory',
          other: {
            order: 'fields.order',
            include: 3,
            limit: 1,
          },
        }))
  )[0] as IDocsCategory;

  const section = params?.section
    ? category.fields.sections.find(
        (section) => section.fields.slug === params?.section
      )
    : category.fields.sections[0];

  const categories = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: { order: 'fields.order', include: 3 },
  });

  if (!categories || !category || !section) {
    return { notFound: true };
  }

  return { props: { category, section, categories }, revalidate: 480 };
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
        <div id={slug}>
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
        <div>{documentToReactComponents(content, richTextOptions)}</div>
      )}
      {subsections?.map((doc) => (
        <Fragment key={doc.fields.slug}>
          <hr className="text-grey-light first-of-type:hidden mt-10" />
          <SubSection key={doc.fields.slug} {...doc.fields} />
        </Fragment>
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
        <h2 className="text-2xl font-bold pt-10">{title}</h2>
        {documentToReactComponents(content, richTextOptions)}
      </div>
    </>
  );
};

const Docs: React.FC<DocsProps> = ({ categories = [], category, section }) => {
  const { setCurrentDocSlug, setSelectedSectionSlug, setSelectedCategorySlug } =
    useDocsStore();
  const [currentDocSlug] = useHash();

  useEffect(() => {
    currentDocSlug && setCurrentDocSlug(currentDocSlug);
    category?.fields.slug && setSelectedCategorySlug(category.fields.slug);
    section?.fields.slug && setSelectedSectionSlug(section.fields.slug);
  }, [currentDocSlug, category?.fields.slug, section?.fields.slug]);

  return (
    <>
      <NextSeo title="Docs" noindex />
      <div className="flex flex-col md:flex-row bg-grey-over-background">
        <Sidebar categories={categories.map((cat) => cat.fields)} />
        {section && category && (
          <Content section={section} category={category} />
        )}
      </div>
    </>
  );
};

export default Docs;
