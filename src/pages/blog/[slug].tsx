// import { getAllIdsOfType, getAllOfType, getById } from 'lib/cms';
import type { GetStaticPaths, GetStaticProps } from 'next';

interface BlogEntry {
  slug: string;
  text: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const teamIds = await getAllIdsOfType('team');
  // const allTeams = await getAllOfType('team');
  // const teamAvocado = await getById(teamIds[0]);

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

const BlogEntry: React.FC<BlogEntry> = ({ slug }) => (
  <div>Blog with ID {slug}</div>
);

export default BlogEntry;
