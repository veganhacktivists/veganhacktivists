import { parse } from 'csv-parse/sync';

import prisma from 'lib/db/prisma';

import type { DashboardValueType } from '@prisma/client';
import type { Prisma } from '@prisma/client';

export const importDataCSV = async (csv: string) => {
  const records = parse(csv, {
    delimiter: ',',
    skip_empty_lines: true,
  }) as string[];
  const head = records[0];
  type DashboardValues = Partial<Record<string, DashboardValueType>>;
  const values: DashboardValues = {
    click_cnt: 'clicks',
    comment_cnt: 'comments',
  };
  let firstRow = true;
  for (const entry of records) {
    if (firstRow) {
      firstRow = false;
      continue;
    }
    let date: string | undefined = undefined;
    let country = undefined;
    let region = undefined;
    let topic = undefined;
    const entryValues: Prisma.DataDashboardValueCreateManyInput[] = [];

    for (let i = 0; i < entry.length; i++) {
      switch (head[i].trim()) {
        case '':
          break;
        case 'dt':
          date = entry[i];
          break;
        case 'country':
          country = entry[i];
          break;
        case 'region':
          region = entry[i];
          break;
        case 'topic':
          topic = entry[i];
          break;
        default:
          if (Object.keys(values).indexOf(head[i]) === -1) {
            break;
          }
          if (values[head[i]] === undefined) {
            break;
          }
          const key = values[head[i]];
          if (!key) {
            break;
          }
          const entryValue: Prisma.DataDashboardValueCreateManyInput = {
            key: key,
            value: entry[i],
          };
          entryValues.push(entryValue);
          break;
      }
    }
    if (!date || !topic) {
      continue;
    }

    const data = await prisma.dataDashboardData.findFirst({
      where: {
        timestamp: new Date(date),
        category: country,
        subcategory: region,
      },
    });
    if (data) {
      continue;
    }
    const project = await prisma.dataDashboardProject.findFirst({
      where: {
        label: topic,
      },
    });
    if (!project) {
      const { id } = await prisma.dataDashboardProject.create({
        data: {
          label: topic,
        },
      });
      await prisma.dataDashboardData.create({
        data: {
          timestamp: new Date(date),
          category: country,
          subcategory: region,
          values: {
            createMany: {
              data: entryValues,
            },
          },
          dataDashboardProjectId: id,
        },
      });
    } else {
      await prisma.dataDashboardData.create({
        data: {
          timestamp: new Date(date),
          category: country,
          subcategory: region,
          values: {
            createMany: {
              data: entryValues,
            },
          },
          dataDashboardProjectId: project.id,
        },
      });
    }
  }
  return true;
};
