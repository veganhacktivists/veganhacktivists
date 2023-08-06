import HttpCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';

import { errorBody } from 'lib/helpers/api';
import { runHourlyTasks } from 'lib/cron/hour';

import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async function (req, res) {
  if (req.method !== 'GET') {
    return res
      .status(HttpCodes.METHOD_NOT_ALLOWED)
      .json(errorBody(HttpCodes.METHOD_NOT_ALLOWED));
  }

  const isAuthorized =
    req.headers.authorization &&
    process.env.CRON_API_AUTH &&
    (await bcrypt.compare(
      req.headers.authorization,
      process.env.CRON_API_AUTH
    ));

  if (!isAuthorized) {
    res.status(HttpCodes.UNAUTHORIZED).json(errorBody(HttpCodes.UNAUTHORIZED));
    return;
  }

  res.status(HttpCodes.OK).end();

  console.info('run scheduled tasks');

  runHourlyTasks();
};

export default handler;
