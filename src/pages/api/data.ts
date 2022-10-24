import HttpCodes from 'http-status-codes';

import { importDataCSV } from '../../lib/services/data-dashboard';
import { errorBody } from '../../lib/helpers/api';

import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(HttpCodes.NOT_IMPLEMENTED)
      .json(errorBody(HttpCodes.NOT_IMPLEMENTED));
  }
  const { 'x-api-key': api_key } = req.headers;
  if (api_key !== process.env.DATA_API_KEY) {
    return res
      .status(HttpCodes.UNAUTHORIZED)
      .json(errorBody(HttpCodes.UNAUTHORIZED));
  }
  const csvData = req.body as string;
  await importDataCSV(csvData);
  return res.status(HttpCodes.OK).json({});
};

export default handler;
