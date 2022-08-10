import { useCallback } from 'react';

import { PlaygroundRequestCategory } from '@prisma/client';

import { CATEGORY_TEXT } from './requestCard';

import RadioButton from 'components/forms/inputs/radioButton';

import Checkbox from 'components/forms/inputs/checkbox';

import type { inferQueryInput } from 'lib/client/trpc';

type Filters = inferQueryInput<'playground.requests'>;

type FiltersWithoutSort = Omit<Filters, 'sort'>;
interface RequestFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const RequestFilters: React.FC<RequestFiltersProps> = ({
  filters,
  onChange,
}) => {
  const onChangeSort = useCallback(
    (name: keyof Required<Filters>['sort'], value: 'asc' | 'desc') => {
      onChange({
        ...filters,
        sort: {
          ...filters['sort'],
          [name]: value,
        },
      });
    },
    [filters, onChange]
  );

  const onChangeFilter = useCallback(
    <K extends keyof FiltersWithoutSort, V extends FiltersWithoutSort[K]>(
      name: K,
      value: V
    ) => {
      onChange({
        ...filters,
        [name]: value,
      });
    },
    [filters, onChange]
  );

  return (
    <div className="flex flex-col justify-start px-5 gap-y-4 gap-x-24 md:flex-row">
      <div className="text-left divide-y">
        <div className="mb-2 uppercase">Sort by</div>
        <div className="flex flex-row gap-10">
          <div>
            <div className="font-bold mt-2 mb-2">Date posted</div>

            <>
              <RadioButton
                onChange={() => onChangeSort('createdAt', 'desc')}
                checked={filters.sort?.createdAt === 'desc'}
                label="Newest"
              />
              <RadioButton
                onChange={() => onChangeSort('createdAt', 'asc')}
                checked={filters.sort?.createdAt === 'asc'}
                label="Oldest"
              />
            </>
          </div>
          <div>
            <div className="font-bold mt-2 mb-2">Priority</div>
            <>
              <RadioButton
                onChange={() => onChangeSort('priority', 'desc')}
                checked={filters.sort?.priority === 'desc'}
                label="High to low"
              />
              <RadioButton
                onChange={() => onChangeSort('priority', 'asc')}
                checked={filters.sort?.priority === 'asc'}
                label="Low to high"
              />
            </>
          </div>
        </div>
      </div>
      <div className="text-left divide-y">
        <div className="mb-2 uppercase">Filter by</div>
        <div className="flex flex-col justify-start md:flex-row gap-x-16 gap-y-4">
          <div className="flex-grow">
            <div className="font-bold mt-2 mb-2">Category</div>
            <div className="grid justify-start grid-flow-col grid-rows-3 lg:grid-rows-2 gap-x-4">
              {Object.entries(PlaygroundRequestCategory).map(([key, value]) => (
                <div key={key} className="w-fit">
                  <Checkbox
                    name={key}
                    labelPosition="right"
                    size="small"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        onChangeFilter(
                          'categories',
                          filters.categories
                            ? [...filters.categories, value]
                            : [value]
                        );
                      } else {
                        const filteredCategories = filters.categories?.filter(
                          (v) => v !== value
                        );
                        onChangeFilter(
                          'categories',
                          filteredCategories?.length
                            ? filteredCategories
                            : undefined
                        );
                      }
                    }}
                  >
                    <span className="font-normal">
                      {CATEGORY_TEXT[key as PlaygroundRequestCategory] || value}
                    </span>
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold mt-2 mb-2">Job Type</div>
            <div className="flex flex-col gap-2">
              <Checkbox
                name="jobTypeVolunteer"
                onChange={() => {
                  if (filters.isFree === true) {
                    onChangeFilter('isFree', undefined);
                  } else if (!filters.isFree) {
                    onChangeFilter('isFree', true);
                  }
                }}
                checked={filters.isFree === true}
                size="small"
                labelPosition="right"
              >
                <span className="font-normal">Volunteer</span>
              </Checkbox>
              <Checkbox
                name="jobTypePaid"
                onChange={() => {
                  if (filters.isFree !== false) {
                    onChangeFilter('isFree', false);
                  } else if (filters.isFree === false) {
                    onChangeFilter('isFree', undefined);
                  }
                }}
                checked={filters.isFree === false}
                size="small"
                labelPosition="right"
              >
                <span className="font-normal">Paid</span>
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFilters;
