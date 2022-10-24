import { faker } from '@faker-js/faker';

import { importDataCSV } from '..';

import prisma from 'lib/db/prisma';

const generateData = () => {
  const data = [];
  const headers = [
    '',
    'dt',
    'country',
    'region',
    'topic',
    'click_cnt',
    'comment_cnt',
  ];
  const projects = ['5 minutes 5 vegans', 'dominion.org', 'vegans of reddit'];
  type Region = Record<string, string[]>;
  const regions: Region = {
    None: ['None'],
    US: ['CA', 'NY', 'TX', 'FL', 'IL'],
    CA: ['ON', 'QC', 'BC', 'AB', 'MB'],
    GB: ['ENG', 'WLS', 'SCT', 'NIR'],
    AU: ['NSW', 'VIC', 'QLD', 'SA', 'WA'],
    PL: ['MAZ', 'SLK', 'LUB', 'WLM', 'POM'],
  };
  data.push(headers.join(','));
  for (let i = 0; i < 100; i++) {
    const country =
      Object.keys(regions)[(Math.random() * Object.keys(regions).length) | 0];
    const region =
      regions[country][(Math.random() * regions[country].length) | 0];
    const topic = projects[Math.floor(Math.random() * projects.length)];
    const click_cnt = Math.floor(Math.random() * 1000);
    const comment_cnt = Math.floor(Math.random() * 1000);
    const row = [
      i + 1,
      faker.date.past(1).toISOString().split('T')[0],
      country,
      region,
      topic,
      click_cnt,
      comment_cnt,
    ];
    data.push(row.join(','));
  }
  return data.join('\n');
};

/* Todo: Need to check deployment to prevent sample data in production */
// it('should import data', async () => {
//   const data = generateData();
//   await importDataCSV(data);
//   const count = await prisma.dataDashboardValue.count();
//   expect(count).toBe(200);
//   await prisma.dataDashboardValue.deleteMany();
//   await prisma.dataDashboardData.deleteMany();
//   await prisma.dataDashboardProject.deleteMany();
// });
