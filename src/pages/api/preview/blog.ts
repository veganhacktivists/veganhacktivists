import type { NextApiHandler } from 'next';
import type { IBlogEntryFields } from '../../../types/generated/contentful';

const handler: NextApiHandler<IBlogEntryFields> = async (req, res) => {
  const { slug } = req.query;

  res.setPreviewData({});

  res.redirect(`/blog/${slug}`);
  res.end();
};

export default handler;
