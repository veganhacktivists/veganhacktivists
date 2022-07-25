import HttpCodes from 'http-status-codes';

import { getSession } from 'next-auth/react';

import { getToken } from 'next-auth/jwt';

import type { NextApiHandler } from 'next';

const secret = process.env.NEXTAUTH_SECRET;

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(HttpCodes.METHOD_NOT_ALLOWED).end();
  }

  const token = await getToken({ req, secret });

  res.status(200).json({});
};

export default handler;
