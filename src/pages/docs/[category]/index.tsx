import type { GetStaticPaths, GetStaticProps } from 'next';
import { getContents } from '../../../lib/cms';
import type { IDocsCategoryFields } from '../../../types/generated/contentful';

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    other: { select: 'fields.slug' },
  });

  return {
    paths: allCategories.map((cat) => ({
      params: { category: cat.fields.slug },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.category) {
    return {
      notFound: true,
    };
  }

  const category = await getContents<IDocsCategoryFields>({
    contentType: 'docsCategory',
    query: { slug: params.category },
    other: { limit: 1, select: 'fields.sections' },
  });

  return {
    redirect: {
      destination: `/docs/${params.category}/${category[0].fields.sections[0].fields.slug}`,
      permanent: false,
    },
  };
};

const DocsCategory: React.FC = () => null;

export default DocsCategory;
