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
import Link from 'next/link';
import useDocsStore from '../../../lib/stores/docsStore';
import { useHash } from '../../../hooks/useHash';
import { DarkButton } from '../../../components/decoration/buttons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RichText from '../../../components/decoration/richText';
import { getDocCategoryPreviewBySlug } from '../../../lib/cms/helpers';

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

const getCategoryOrPreview: (
  slug: IDocsCategoryFields['slug'] | undefined,
  preview: boolean
) => Promise<IDocsCategory> = async (slug, preview) => {
  if (preview) {
    if (!slug) {
      throw 'Slug is not defined';
    }
    return await getDocCategoryPreviewBySlug(slug);
  }

  const docs = await (slug
    ? getContents<IDocsCategoryFields>({
        contentType: 'docsCategory',
        query: {
          slug,
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
      }));

  return docs[0] as IDocsCategory;
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const category = await getCategoryOrPreview(
    params?.category as string | undefined,
    preview
  );

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

  return {
    props: {
      category,
      section,
      categories: preview ? [category, ...categories] : categories,
    },
    revalidate: 480,
  };
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

  const sectionIndex = category.fields.sections.findIndex(
    (section) => section.fields.slug === slug
  );

  const prev =
    sectionIndex > 0 ? category.fields.sections[sectionIndex - 1] : undefined;
  const next =
    sectionIndex < category.fields.sections.length - 1
      ? category.fields.sections[sectionIndex + 1]
      : undefined;

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
          <span className="hidden md:inline"> | </span>
          <Link href="/contact">
            <a className="underline text-green opacity-100 hover:opacity-70">
              Suggest Updates
            </a>
          </Link>
        </div>
      </div>
      {content && (
        <div>
          <RichText document={content} />
        </div>
      )}
      {subsections?.map((doc) => (
        <Fragment key={doc.fields.slug}>
          <hr className="text-grey-light first-of-type:hidden mt-10" />
          <SubSection key={doc.fields.slug} {...doc.fields} />
        </Fragment>
      ))}
      <div className="flex space-x-4 justify-center items-center mt-10">
        <p className="hidden lg:block">{prev && prev.fields.title}</p>
        <DarkButton
          disabled={prev === undefined}
          href={
            prev
              ? {
                  pathname: '/docs/[category]/[section]',
                  query: {
                    category: category.fields.slug,
                    section: prev.fields.slug,
                  },
                }
              : undefined
          }
        >
          <FontAwesomeIcon size="sm" icon={faArrowLeft} />
          &nbsp; Previous
        </DarkButton>
        &nbsp; &nbsp;
        <DarkButton
          disabled={next === undefined}
          href={
            next
              ? {
                  pathname: '/docs/[category]/[section]',
                  query: {
                    category: category.fields.slug,
                    section: next.fields.slug,
                  },
                }
              : undefined
          }
        >
          Next &nbsp;
          <FontAwesomeIcon size="sm" icon={faArrowRight} />
        </DarkButton>
        <p className="hidden lg:block">{next && next.fields.title}</p>
      </div>
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
        <RichText document={content} />
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
