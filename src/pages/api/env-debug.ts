import type { NextApiHandler } from 'next';

const handler: NextApiHandler = (_req, res) => {
  console.log(process.env);
  res.status(200).json({ status: 'ok' });
};

export default handler;
