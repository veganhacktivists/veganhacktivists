import got from 'got';

const accessToken = process.env.PATREON_ACCESS_TOKEN;
const campaignId = process.env.PATREON_CAMPAIGN_ID;

export const getPatrons: () => Promise<string[]> = async () => {
  const patronsUrl = `https://www.patreon.com/api/oauth2/api/campaigns/${campaignId}/pledges?include=patron.null&count=1000`;

  const pages = [];
  let currUrl = patronsUrl;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = (await got
      .get(currUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .json()) as Record<string, any>;

    pages.push(data);
    if (!data.links?.next) {
      hasNextPage = false;
    } else {
      currUrl = data.links.next;
    }
  }

  const patrons: string[] = [
    'Krishan Chockalingam',
    'Eat The Change',
    'The Pollination Project',
  ];

  pages.forEach((page) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    page.included.forEach((patron: any) => {
      if (patron.attributes.full_name) {
        patrons.push(patron.attributes.full_name);
      }
    });
  });

  return Array.from(new Set(patrons));
};
