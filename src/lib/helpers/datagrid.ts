/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject, z } from 'zod';

import type { User } from '@prisma/client';
import type { FieldPath, FieldPathValue, FieldValue } from 'react-hook-form';
import type { FilterOption } from 'lib/services/playground/schemas';

interface SortingQuery {
  [key: string]: 'asc' | 'desc' | SortingQuery;
}

export const buildSortingQuery = (
  sort: string,
  order: 'asc' | 'desc'
): SortingQuery => {
  const columns = sort.split('.');
  if (columns.length === 1) {
    return {
      [sort]: order,
    };
  }
  return { [columns[0]]: buildSortingQuery(columns.slice(1).join('.'), order) };
};

interface UpdateQuery {
  [key: string]: unknown;
}

export const getKeyEntry = (
  key: string,
  value: unknown
): UpdateQuery | undefined => {
  if (typeof value !== 'object' || value === null) {
    if (key === 'id') return undefined;
    return { [key]: value };
  }
  const fields = Object.entries(value) ?? [];
  if (fields.length === 0) return undefined;
  let entries = {};
  for (const field of fields) {
    const [k, v] = field;
    if (k === 'id') continue;
    entries = { ...entries, ...getKeyEntry(k, v) };
  }
  return { [key]: { update: entries } };
};

export const buildUpdateQuery = (data: { [key: string]: unknown }) => {
  const keys = Object.keys(data);
  let query: UpdateQuery = {};
  for (const key of keys) {
    query = { ...query, ...getKeyEntry(key, data[key]) };
  }
  return query;
};

interface FilterQuery {
  [key: string]: unknown;
}

const getFilterCondition = (column: string, filter: FilterOption['filter']) => {
  switch (filter.type) {
    case 'contains':
      return { [column]: { contains: filter.filter, mode: 'insensitive' } };
    case 'notContains':
      return {
        NOT: { [column]: { contains: filter.filter, mode: 'insensitive' } },
      };
    case 'blank':
      return { [column]: '' };
    case 'notBlank':
      return { NOT: { [column]: '' } };
    case 'notEqual':
      return {
        NOT: { [column]: { equals: filter.filter, mode: 'insensitive' } },
      };
    case 'equal':
      return { [column]: filter.filter, mode: 'insensitive' };
    case 'startsWith':
      return { [column]: { startsWith: filter.filter, mode: 'insensitive' } };
    case 'endsWith':
      return { [column]: { endsWith: filter.filter, mode: 'insensitive' } };
    default:
      return {};
  }
};

const getFilterEntry = (
  column: string,
  filter: FilterOption['filter']
): FilterQuery => {
  const chunks = column.split('.');
  if (chunks.length === 1) {
    return getFilterCondition(column, filter);
  }
  return { [chunks[0]]: getFilterEntry(chunks.slice(1).join('.'), filter) };
};

export const buildFilterQuery = (filters: FilterOption[]): FilterQuery => {
  let query = {};
  for (const filter of filters) {
    query = { ...query, ...getFilterEntry(filter.column, filter.filter) };
  }
  return query;
};

const getSearchEntry = (column: string, search: string): FilterQuery => {
  const chunks = column.split('.');
  if (chunks.length === 1) {
    return { [column]: { contains: search, mode: 'insensitive' } };
  }
  return { [chunks[0]]: getSearchEntry(chunks.slice(1).join('.'), search) };
};

export const buildSearchQuery = (
  search: string,
  columns: string[]
): FilterQuery => {
  return { OR: columns.map((column) => getSearchEntry(column, search)) };
};

type AnyObject = Record<string, unknown>;

// type MakeNullable<T> = T extends AnyObject
//   ? {
//       [Key in keyof T]: MakeNullable<T[Key]> | null;
//     }
//   : T | null;

export const extractZodNonNullables = <S extends z.AnyZodObject>(
  schema: S,
  prefix?: string
) => {
  let NonNullables: string[] = [];
  for (const key in schema.shape) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const entry = schema.shape[key];
    let level = 0;
    let innerElement = entry;
    let found = false;
    while (!!innerElement._def.innerType && level < 5) {
      innerElement = innerElement._def.innerType;
      if (innerElement instanceof z.ZodObject) {
        NonNullables = NonNullables.concat(
          extractZodNonNullables(
            innerElement,
            prefix ? prefix + '.' + key : key
          )
        );
      }
      if (innerElement instanceof z.ZodNullable) {
        found = true;
        break;
      }
      level++;
    }

    if (!found && !(entry instanceof z.ZodNullable)) {
      NonNullables.push(prefix ? prefix + '.' + key : key);
    }
  }
  return NonNullables;
};

type ReplaceNullables<T extends AnyObject> = {
  [Key in keyof T]: NonNullable<
    T[Key] extends Record<string, unknown> ? ReplaceNullables<T[Key]> : T[Key]
  >;
};

export const replaceNullables = <T extends Record<string, unknown>>(
  data: T,
  nullables: FieldPath<T>[],
  prefix?: string
): ReplaceNullables<T> => {
  for (const key in data) {
    if (typeof data[key] !== 'object' || data[key] === null) {
      data[key] =
        nullables.includes(prefix ? `${prefix}.${key}` : key) &&
        data[key] === null
          ? ''
          : data[key];
    } else {
      data[key] = replaceNullables(
        data[key],
        nullables,
        prefix ? prefix + '.' + key : key
      );
    }
  }
  return data;
};

type DeepZodPartial<T extends z.ZodTypeAny> = T extends ZodObject<z.ZodRawShape>
  ? ZodObject<
      { [k in keyof T['shape']]: z.ZodNullable<DeepZodPartial<T['shape'][k]>> },
      T['_def']['unknownKeys'],
      T['_def']['catchall']
    >
  : T extends z.ZodArray<infer Type, infer Card>
    ? z.ZodArray<DeepZodPartial<Type>, Card>
    : T extends z.ZodOptional<infer Type>
      ? z.ZodNullable<DeepZodPartial<Type>>
      : T extends z.ZodNullable<infer Type>
        ? z.ZodNullable<DeepZodPartial<Type>>
        : T extends z.ZodTuple<infer Items>
          ? {
              [k in keyof Items]: Items[k] extends z.ZodTypeAny
                ? DeepZodPartial<Items[k]>
                : never;
            } extends infer PI
            ? PI extends z.ZodTupleItems
              ? z.ZodTuple<PI>
              : never
            : never
          : T; // z.ZodNullable<T> if the list element is nullable too

const deepPartialify = <T extends z.ZodTypeAny>(
  schema: T
): DeepZodPartial<T> => {
  if (schema instanceof z.ZodObject) {
    const newShape: any = {};

    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      // newShape[key] = z.ZodOptional.create(deepPartialify(fieldSchema));
      newShape[key] = z.ZodNullable.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape,
    }) as any;
  } else if (schema instanceof z.ZodArray) {
    return new z.ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element),
    }) as DeepZodPartial<T>;
  } else if (schema instanceof z.ZodOptional) {
    return z.ZodNullable.create(
      deepPartialify(schema.unwrap())
    ) as DeepZodPartial<T>;
  } else if (schema instanceof z.ZodNullable) {
    return z.ZodNullable.create(
      deepPartialify(schema.unwrap())
    ) as DeepZodPartial<T>;
  } else if (schema instanceof z.ZodTuple) {
    return z.ZodTuple.create(
      schema.items.map((item: any) => deepPartialify(item))
    ) as DeepZodPartial<T>;
  } else {
    return schema as DeepZodPartial<T>;
  }
};

export const makeNullable = deepPartialify;

const testSchema = z.object({
  a: z.object({ b: z.object({ c: z.object({ x: z.number() }) }) }),
});

const x = makeNullable(testSchema);

// const x: DeepPartial<typeof testSchema> = {
//   a: { b: { c: { x: null } } },
// };

type X = z.infer<typeof x>;

// export const makeNullable2 = <T extends z.AnyZodObject>(
//   schema: T,
//   found = false
// ) => {
//   if (!(schema instanceof ZodObject) && !schema?._def.innerType) {
//     return found ? schema.nullish() : schema;
//   }
//   if (schema instanceof ZodObject) {
//     for (const key in schema.shape) {
//       schema.shape[key] = makeNullable2(schema.shape[key], false);
//     }
//     return schema;
//   }
//   return makeNullable2(
//     schema._def.innerType,
//     found || schema instanceof z.ZodNullable || schema instanceof z.ZodOptional
//   );
// };

export const transformZodNullables = <T extends z.ZodTypeAny>(
  schema: T
): ReplaceNullables<DeepZodPartial<T>> => {
  const nonNullableFields = extractZodNonNullables(schema);

  return makeNullable(schema).transform((data) =>
    replaceNullables(data, nonNullableFields)
  );
};
