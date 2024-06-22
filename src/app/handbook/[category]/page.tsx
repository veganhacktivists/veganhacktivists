'use server';

import { getContents } from '../../../lib/cms';
import { getDocCategoryPreviewBySlug } from '../../../lib/cms/helpers';

import type {
  IDocsCategory,
  IDocsCategoryFields,
} from '../../../types/generated/contentful';
import { redirect } from 'next/navigation';

const getCategoryOrPreview: (
  slug: IDocsCategoryFields['slug'],
  preview: boolean,
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

export const metadata = {
  title: 'Docs',
};

const Docs: React.FC<{ params: { category: string } }> = async ({
  params: { category: categoryParam },
}) => {
  const category = await getCategoryOrPreview(categoryParam, false);

  const categorySlug = categoryParam;
  const firstSectionSlug = category.fields.sections[0].fields.slug;

  return redirect(`/handbook/${categorySlug}/${firstSectionSlug}`);
};

export default Docs;
