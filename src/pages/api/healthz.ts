/* eslint-disable no-console */
import type { NextApiHandler } from 'next';
import HttpCodes from 'http-status-codes';
import prisma from '../../lib/db/prisma';

const handler: NextApiHandler = async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      console.error('Health check FAIL', e);
      return res
        .status(HttpCodes.INTERNAL_SERVER_ERROR)
        .json({ error: JSON.stringify(e) });
    }
    console.error('Health check FAIL', e.message);
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({ error: e.message });
  }
  return res.status(HttpCodes.OK).end();
};

export default handler;
