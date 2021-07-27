import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';

interface BlogEntry {
  slug: string;
  text: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [{ params: { slug: '1' } }], fallback: true };
};

export const getStaticProps: GetStaticProps<
  BlogEntry,
  Pick<BlogEntry, 'slug'>
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const blog = { slug: params.slug, text: '' };

  return { props: blog };
};

const BlogEntry: React.FC<BlogEntry> = ({ slug }) => {
  const { isFallback } = useRouter();

  return <div>Blog with ID {slug}</div>;
};

export default BlogEntry;
