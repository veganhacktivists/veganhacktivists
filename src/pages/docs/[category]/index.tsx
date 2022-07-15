import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getContents } from '../../../lib/cms';
import { getDocCategoryPreviewBySlug } from '../../../lib/cms/helpers';
import type {
  IDocsCategory,
  IDocsCategoryFields,
  IDocsSectionFields,
} from '../../../types/generated/contentful';

const getCategoryOrPreview: (
  slug: IDocsCategoryFields['slug'],
  preview: boolean
) => Promise<IDocsCategory> = async (slug, preview) => {
  if (preview) {
    return await getDocCategoryPreviewBySlug(slug);
  }
  const cats = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    query: {
      slug,
    },
    other: {
      order: 'fields.order',
      select: 'fields.sections',
      include: 1,
      limit: 1,
    },
  });

  return cats[0] as IDocsCategory;
};

export const getStaticProps: GetStaticProps = async ({
  params = {},
  preview = false,
}) => {
  const category = await getCategoryOrPreview(
    params.category as string,
    preview
  );

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
  }, [categorySlug, firstSectionSlug, router]);

  return null;
};

export default Docs;
