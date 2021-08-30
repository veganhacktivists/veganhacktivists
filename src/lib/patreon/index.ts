const accessToken = process.env.PATREON_ACCESS_TOKEN;
const campaignId = process.env.PATREON_CAMPAIGN_ID;

export const getPatrons: () => Promise<string[]> = async () => {
  const patronsUrl = `https://www.patreon.com/api/campaigns/${campaignId}/pledges?include=patron.null`;

  const pages = [];
  let currUrl = patronsUrl;
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await fetch(currUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    pages.push(data);
    if (!data.links.next) {
      hasNextPage = false;
    } else {
      currUrl = data.links.next;
    }
  }

  const patrons: string[] = [];

  pages.forEach((page) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    page.included.forEach((patron: any) => {
      if (patron.attributes.full_name) {
        patrons.push(patron.attributes.full_name);
      }
    });
  });

  return patrons;
};
