import type { GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type { IDocsCategoryFields } from '../../types/generated/contentful';

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = (
    await getContents<IDocsCategoryFields>({
      contentType: 'docsCategory',
      other: {
        order: 'fields.order',
        include: 3,
      },
    })
  )[0];

  return {
    redirect: {
      destination: `/docs/${firstCategory.fields.slug}/${firstCategory.fields.sections[0].fields.slug}`,
      permanent: false,
    },
  };
};

const Docs: React.FC = () => null;

export default Docs;
