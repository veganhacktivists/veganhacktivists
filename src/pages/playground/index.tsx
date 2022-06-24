import type { User } from '@prisma/client';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import prisma from '../../lib/db/prisma';

type PlaygroundProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ShowUser: React.FC<Pick<User, 'email'>> = ({ email }) => {
  return <div>{email}</div>;
};

const ShowPost: React.FC<PlaygroundProps['posts'][0]> = ({
  title,
  body,
  user,
  upvotes,
  _count: { votes },
}) => {
  const downvotes = votes - upvotes;
  return (
    <div className="border border-black w-1/2 mx-auto p-2">
      <div className="font-bold text-xl">{title}</div>
      <div>{body}</div>
      <div className="w-min mx-auto flex flex-row gap-3">
        <div className="text-green-dark">Upvotes: {upvotes}</div>
        <div className="text-red-dark">Downvotes: {downvotes}</div>
      </div>
      <div className="mt-5">
        <div>User</div>
        <ShowUser {...user} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  // TODO: find out how to work with dates without all this boilerplate
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      user: {
        select: {
          email: true,
        },
      },
      votes: { select: { isUpvote: true } },
      _count: {
        select: {
          votes: true,
        },
      },
    },
  });

  const postWithUpvotes = posts.map((post) => ({
    ...post,
    upvotes: post.votes.filter(({ isUpvote }) => isUpvote).length,
  }));

  return {
    props: {
      posts: postWithUpvotes,
    },
  };
};

const Playground: NextPage<PlaygroundProps> = ({ posts }) => {
  return (
    <div className="my-10">
      <div className="text-xl font-bold">Posts:</div>
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <ShowPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Playground;
