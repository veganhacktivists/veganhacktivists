import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = ({}) => {
  return { props: {} };
};

const Blog: React.FC = () => {
  return <div>Blog</div>;
};

export default Blog;
