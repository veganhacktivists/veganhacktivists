import ky from 'ky-universal';

import { getContents } from '../cms';

import type { IMultipleValuesFields } from '../../types/generated/contentful';

const accessToken = process.env.PATREON_ACCESS_TOKEN || '';
const campaignId = process.env.PATREON_CAMPAIGN_ID || '';

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

  const cmsPatrons = await getContents<IMultipleValuesFields>({
    contentType: 'multipleValues',
    query: { name: 'patreonDonors' },
    other: { limit: 1 },
  });

  const patrons = cmsPatrons[0].fields.values;

  while (hasNextPage) {
    const response = await ky.get(currUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json<PatreonResponse>();

    pages.push(data);
    if (!data.links?.next) {
      hasNextPage = false;
    } else {
      currUrl = data.links.next;
    }
  }

  pages.forEach((page) => {
    page.included.forEach((patron) => {
      if (patron.attributes.full_name) {
        patrons.push(patron.attributes.full_name);
      }
    });
  });

  return Array.from(new Set(patrons));
};

interface Campaign {
  data: {
    attributes: {
      pledge_sum_currency: 'EUR' | 'USD';
      /** euros */
      pledge_sum: number;
      /** dollars */
      campaign_pledge_sum: number;
    };
  }[];
  // included: {}[];
}

export const getPatreonFundig: (
  currency: 'USD' | 'EUR'
) => Promise<number> = async (currency: 'USD' | 'EUR') => {
  const campaignUrl =
    'https://www.patreon.com/api/oauth2/api/current_user/campaigns';

  const response = await ky
    .get(campaignUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .json<Campaign>();

  return (
    (currency === 'USD'
      ? response.data[0].attributes.campaign_pledge_sum
      : response.data[0].attributes.pledge_sum) / 100
  );
};
