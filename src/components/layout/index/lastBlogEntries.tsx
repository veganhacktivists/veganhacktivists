import { GreenButton, LightButton } from '../../decoration/buttons';
import ImageContainer from '../../decoration/imageContainer';
import blogCow from '../../../../public/images/Blog-cow.jpg';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import SquareField from '../../decoration/squares';

const BLOG_INNER_DECORATION_SQUARES = [
  { color: 'gray-lighter', size: 16, right: 0, bottom: 0 },
];

interface BlogEntrySummaryProps {
  image: StaticImageData;
  title: string;
  slug: string;
}

const BlogEntrySummary: React.FC<BlogEntrySummaryProps> = ({
  image,
  title,
  slug,
}) => {
  return (
    <div>
      <div className="overflow-hidden w-full">
        <ImageContainer>
          <Image
            src={image}
            className="w-full bg-cover"
            alt="Compassion, Creativity, Code"
          />
        </ImageContainer>
      </div>
      <div className="overflow-hidden w-full">
        <div className="px-8 pt-6 pb-6 content-center mx-auto bg-white">
          <p className="font-semibold text-2xl">{title}</p>
        </div>
        <GreenButton href={`/blog/${slug}`}>Read More</GreenButton>
      </div>
    </div>
  );
};

const lastEntries: BlogEntrySummaryProps[] = [
  {
    image: blogCow,
    slug: 'test-preview',
    title: 'Developers! Join Our New Open Source Community - VH: Playground',
  },
  {
    image: blogCow,
    slug: 'test-preview',
    title: 'Developers! Join Our New Open Source Community - VH: Playground',
  },
  {
    image: blogCow,
    slug: 'test-preview',
    title: 'Developers! Join Our New Open Source Community - VH: Playground',
  },
];

const LastBlogEntries: React.FC = () => {
  return (
    <>
      <div className="content-center mx-auto md:w-1/2 drop-shadow-2xl text-2xl pt-16">
        <p className="text-grey-dark pb-5">
          <span className="font-italic font-semibold text-3xl">On the </span>
          <b className="text-5xl font-mono">BLOG</b>
        </p>
        <p className="pb-16">
          We regularly post project updates, announcements, interviews, and
          other fun stuff here! Thanks for reading!
        </p>
      </div>
      <div className="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-4 lg:px-32 px-4">
        {lastEntries.map((entry) => (
          <BlogEntrySummary key={entry.slug} {...entry} />
        ))}
      </div>
      <SquareField
        squares={BLOG_INNER_DECORATION_SQUARES}
        className="hidden lg:block bottom-32"
      />
      <div className="bg-grey pt-32 bottom-32 relative overflow-visible -z-10">
        <div className="relative mx-auto pt-10 md:w-1/3 pb-16 sm:px-24 px-20">
          <LightButton href="/blog" className="font-mono text-sm font-semibold">
            See All Posts
          </LightButton>
        </div>
      </div>
    </>
  );
};

export default LastBlogEntries;
