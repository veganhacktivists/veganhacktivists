import ky from 'ky-universal';

const accessToken = process.env.PATREON_ACCESS_TOKEN;
const campaignId = process.env.PATREON_CAMPAIGN_ID;

interface PatreonResponse {
  links?: {
    next: string;
  };
  included: { attributes: { full_name: string } }[];
}

export const getPatrons: () => Promise<string[]> = async () => {
  const patronsUrl = `https://www.patreon.com/api/oauth2/api/campaigns/${campaignId}/pledges?include=patron.null&count=1000`;

  const pages = [];
  let currUrl = patronsUrl;
  let hasNextPage = true;

  while (hasNextPage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await ky.get(currUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await response.json()) as unknown as PatreonResponse;

    // const data = (await ky
    //   .get(currUrl, {})
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   .json()) as Record<string, any>;

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

export const getPledgeSum: (
  currency: 'USD' | 'EUR'
) => Promise<number> = async (currency: 'USD' | 'EUR') => {
  const campaignUrl =
    'https://www.patreon.com/api/oauth2/api/current_user/campaigns';

  const response = (await ky
    .get(campaignUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .json()) as Record<string, any>;

  return (
    (currency === 'USD'
      ? response.data[0].attributes.campaign_pledge_sum
      : response.data[0].attributes.pledge_sum) / 100
  );
};
