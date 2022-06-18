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
  _count: { votes },
}) => {
  return (
    <div className="border border-black w-1/2 mx-auto">
      <div>{title}</div>
      <div>{body}</div>
      <div>Number of votes: {votes}</div>
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
    include: {
      user: {
        select: {
          email: true,
        },
      },
      _count: { select: { votes: true } },
    },
  });

  return {
    props: {
      posts,
    },
  };
};

const Playground: NextPage<PlaygroundProps> = ({ posts }) => {
  return (
    <div>
      <div>
        <div className="text-xl font-bold">Posts:</div>
        <div>
          {posts.map((post) => (
            <ShowPost key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playground;
