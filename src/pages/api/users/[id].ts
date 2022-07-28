import { z } from 'zod';
import HttpCodes from 'http-status-codes';
import { getToken } from 'next-auth/jwt';

import { updateUser } from 'lib/services/users';

import type { User } from '@prisma/client';
import type { NextApiHandler } from 'next';

const secret = process.env.NEXTAUTH_SECRET;

export type UserUpdateParams = Pick<User, 'id' | 'name'>;

const userIdSchema = z.object({
  id: z.string(),
});

const userUpdateParamsSchema = z.object({
  name: z.string().min(1),
});

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      const { id: userId } = req.query as UserUpdateParams;
      const token = await getToken({ req, secret });

      if (!token?.sub || token.sub !== userId) {
        return res
          .status(HttpCodes.UNAUTHORIZED)
          .json({ error: HttpCodes.getStatusText(HttpCodes.UNAUTHORIZED) });
      }

      const user = await updateUser(userId, req.body as UserUpdateParams);
      token.name = user.name;
      return res.status(200).json(user);
    default:
      return res.status(HttpCodes.METHOD_NOT_ALLOWED).json({});
  }
};

export default handler;
