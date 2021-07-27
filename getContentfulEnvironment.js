// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentfulManagement = require('contentful-management');

module.exports = async () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CF_MANAGING_ACCESS_TOKEN,
  });

  const space = await contentfulClient.getSpace(process.env.CF_SPACE_ID);
  return await space.getEnvironment(process.env.CF_ENVIRONMENT);
};
