import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getContents } from '../../lib/cms';
import type {
  IDocsCategoryFields,
  IDocsSectionFields,
} from '../../types/generated/contentful';

export const getStaticProps: GetStaticProps = async () => {
  const cats = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: {
      order: 'fields.order',
      select: 'fields.slug,fields.sections',
      include: 3,
      limit: 1,
    },
  });
  const firstCategory = cats[0].fields;

  return {
    props: {
      firstCategorySlug: firstCategory.slug,
      firstSectionSlug: firstCategory.sections[0].fields.slug,
    },
  };
};

interface DocsProps {
  firstCategorySlug: IDocsCategoryFields['slug'];
  firstSectionSlug: IDocsSectionFields['slug'];
}

const Docs: React.FC<DocsProps> = ({ firstCategorySlug, firstSectionSlug }) => {
  const router = useRouter();
  useEffect(() => {
    router.push({
      pathname: '/docs/[category]/[section]',
      query: { category: firstCategorySlug, section: firstSectionSlug },
    });
  }, []);

  return null;
};

export default Docs;
