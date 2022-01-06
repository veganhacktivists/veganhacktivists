import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getContents } from '../../../lib/cms';
import type {
  IDocsCategoryFields,
  IDocsSectionFields,
} from '../../../types/generated/contentful';

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const cats = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    query: {
      slug: params?.category,
    },
    other: {
      order: 'fields.order',
      select: 'fields.sections',
      include: 1,
      limit: 1,
    },
  });
  const category = cats[0];

  return {
    props: {
      categorySlug: params?.category,
      firstSectionSlug: category.fields.sections[0].fields.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const categories = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: { order: 'fields.order', include: 3 },
  });

  return {
    paths: categories.flatMap((category) =>
      category.fields.sections.map((section) => ({
        params: {
          category: category.fields.slug,
          section: section.fields.slug,
        },
      }))
    ),
    fallback: 'blocking',
  };
};

interface DocsProps {
  categorySlug: IDocsCategoryFields['slug'];
  firstSectionSlug: IDocsSectionFields['slug'];
}

const Docs: React.FC<DocsProps> = ({ categorySlug, firstSectionSlug }) => {
  const router = useRouter();
  useEffect(() => {
    router.push({
      pathname: '/docs/[category]/[section]',
      query: { category: categorySlug, section: firstSectionSlug },
    });
  }, []);

  return null;
};

export default Docs;
