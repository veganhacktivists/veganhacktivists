import Joi from 'joi';
import HttpCodes from 'http-status-codes';
import { getToken } from 'next-auth/jwt';

import validate from 'lib/middlewares/validation';
import { updateUser } from 'lib/userService';

import type { User } from '@prisma/client';
import type { NextApiHandler } from 'next';

const secret = process.env.NEXTAUTH_SECRET;

export type UserUpdateParams = Pick<User, 'id' | 'name'>;

const userIdSchema = Joi.object<Pick<UserUpdateParams, 'id'>>({
  id: Joi.string().required(),
}).required();

const userUpdateParamsSchema = Joi.object<Omit<UserUpdateParams, 'id'>>({
  name: Joi.string().required(),
}).required();

const handler: NextApiHandler<User> = validate(
  {
    body: userUpdateParamsSchema,
    query: userIdSchema,
  },
  async (req, res) => {
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
  }
);

export default handler;
