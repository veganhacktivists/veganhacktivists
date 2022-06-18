import type { Post } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import prisma from '../../lib/db/prisma';

interface PlaygroundProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts,
    },
  };
};

const Playground: NextPage<PlaygroundProps> = ({ posts }) => {
  return (
    <div>
      <div className="text-xl font-bold">Posts:</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{JSON.stringify(post)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playground;
