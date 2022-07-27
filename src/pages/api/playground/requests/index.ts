import HttpCodes from 'http-status-codes';
import Joi from 'joi';

import prisma from 'lib/db/prisma';
import withValidation from 'lib/middlewares/validation';

import type { NextApiHandler } from 'next';

// TODO: export pagination stuff somewhere common
interface Pagination {
  page: number;
  limit: number;
  sort: string[];
}
const paginationSchema = Joi.object<Pagination>({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
  sort: Joi.array().items(Joi.object({}).keys({})),
}).and('page', 'limit');

const getRequestsSchema = paginationSchema.concat(
  Joi.object({
    free: Joi.bool(),
    category: Joi.string().valid(
      'Design',
      'Marketing',
      'SocialMedia',
      'VideoProduction',
      'Website'
    ),
  })
);

const getHandler = withValidation(
  { query: getRequestsSchema },
  async (req, res) => {
    const { page, limit } = req.query;
    const allRequests = await prisma.playgroundRequest.findMany({
      where: {
        isApproved: true,
      },
      include: {
        requester: { select: { id: true, name: true } },
      },
      // orderBy
      take: limit,
      skip: limit && (page - 1) * limit,
    });
    return res.status(HttpCodes.OK).json(allRequests);
  }
);

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);
    default:
      return res.status(HttpCodes.METHOD_NOT_ALLOWED).json({
        error: HttpCodes.getStatusText(HttpCodes.METHOD_NOT_ALLOWED),
      });
  }
};

export default handler;
