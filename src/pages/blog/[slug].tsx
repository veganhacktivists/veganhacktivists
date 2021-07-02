import type { GetStaticPaths, GetStaticProps } from "next";

interface IBlogEntry {
  slug: string;
  text: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [{ params: { slug: "1" } }], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { slug: params?.slug } };
};

const BlogEntry: React.FC<IBlogEntry> = ({ slug }) => {
  return <div>Blog with ID {slug}</div>;
};

export default BlogEntry;
