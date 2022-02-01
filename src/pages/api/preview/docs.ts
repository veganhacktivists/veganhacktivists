import type { NextApiHandler } from 'next';
import type { IDocsCategoryFields } from '../../../types/generated/contentful';

const handler: NextApiHandler<IDocsCategoryFields> = async (req, res) => {
  const { category, section, subsection } = req.query;

  res.setPreviewData({});

  let url = `/docs/${category}`;

  if (section) {
    url += `/${section}`;
  }

  if (subsection) {
    url += `#${subsection}`;
  }

  res.redirect(url);
  res.end();
};

export default handler;
