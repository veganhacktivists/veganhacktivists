import type { GetStaticPaths, GetStaticProps } from 'next';
import { getContents } from '../../lib/cms';
import type { IBlogEntry } from '../../types/generated/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { getAllBlogSlugs, getBlogPreviewBySlug } from '../../lib/cms/helpers';
import ContentfulImage from '../../components/layout/contentfulImage';
import Head from 'next/head';

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

  const { title, author, content } = blog.fields;
  return (
    <>
      <Head>
        <title>{title} | Vegan Hacktivists Blog</title>
      </Head>
      <div className="text-justify p-10 pb-20 text-lg">
        <h1 className="text-4xl">{title}</h1>
        {documentToReactComponents(content, {
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
          },
        })}
        {author && <div>Author: {author.fields.name}</div>}
      </div>
    </>
  );
};

export default BlogEntry;
