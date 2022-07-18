import type { NextApiHandler } from 'next';
import type { IBlogEntryFields } from '../../../types/generated/contentful';

const handler: NextApiHandler<IBlogEntryFields> = (req, res) => {
  const slug = req.query.slug as string;

  res.setPreviewData({});

  res.redirect(`/blog/${slug}`);
  res.end();
};

export default handler;
