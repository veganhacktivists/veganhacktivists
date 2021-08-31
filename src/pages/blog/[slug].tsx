import type { GetStaticPaths, GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type { IBlogEntry } from '../../types/generated/contentful';
import type { Options } from '@contentful/rich-text-react-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { getAllBlogSlugs, getBlogPreviewBySlug } from '../../lib/cms/helpers';
import ContentfulImage from '../../components/layout/contentfulImage';
import Head from 'next/head';
import ImageContainer from '../../components/decoration/imageContainer';
import SquareField from '../../components/decoration/squares';
import React from 'react';
import Circle from '../../components/decoration/circle';

interface BlogEntryProps {
  blog: IBlogEntry;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await getAllBlogSlugs();

  return {
    paths: allSlugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params = {},
  preview = false,
}) => {
  const blog = await getEntryOrPreview(params.slug as string, preview);
  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
    revalidate: 240,
  };
};

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <>
        <ContentfulImage
          image={node.data?.target}
          alt={node.data?.target?.fields?.title}
        />
      </>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-3xl">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h2 className="text-xl">{children}</h2>
    ),
    // [BLOCKS.PARAGRAPH]: (node, children) => (
    //   <p className="text-xl space-y-10">{children}</p>
    // ),
  },
};

const getEntryOrPreview: (
  slug: string,
  preview: boolean
) => Promise<IBlogEntry> = async (slug, preview) => {
  if (preview) {
    return await getBlogPreviewBySlug(slug);
  }

  return (
    await getContents({ contentType: 'blogEntry', query: { slug } })
  )[0] as IBlogEntry;
};

const BlogEntry: React.FC<BlogEntryProps> = ({ blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  const { title, author, content, featuredImage } = blog.fields;
  return (
    <>
      <Head>
        <title>{title} | Vegan Hacktivists Blog</title>
      </Head>
      <div>
        <div className="absolute w-full -z-10 overflow-hidden">
          <div className="relative z-10">
            <Circle opacity={0.1} xAlign="left" yAlign="top" radiusZoom={0.5} />
            <Circle
              opacity={0.05}
              xAlign="right"
              yAlign="bottom"
              radiusZoom={0.3}
            />
          </div>
          <div className="bg-black relative h-80" />
          <div className="z-20">
            <SquareField
              squares={[
                // TODO tweak
                { color: 'white', size: 16, left: 0, bottom: 0 },
                { color: 'green', size: 32, left: 16, bottom: 0 },
                { color: 'yellow', size: 16, left: 0, top: 0 },
                { color: 'orange', size: 16, right: 32, bottom: 16 },
                { color: 'red', size: 32, right: 0, top: -16 },
                { color: 'white', size: 16, right: 32, bottom: 0 },
              ]}
              className="hidden md:block"
            />
          </div>
        </div>
        <div className="mx-auto pt-40">
          <ImageContainer className="border-2 border-white w-1/2 mx-auto">
            <ContentfulImage
              image={featuredImage}
              alt=""
              layout="responsive"
              priority
            />
          </ImageContainer>
        </div>
        <div className="text-left p-10 pb-20 px-10 md:px-64 text-xl leading-loose space-y-4">
          <h1 className="text-4xl font-bold w-2/3">{title}</h1>
          {documentToReactComponents(content, richTextOptions)}
          {author && <div>Author: {author.fields.name}</div>}
        </div>
      </div>
    </>
  );
};

export default BlogEntry;
