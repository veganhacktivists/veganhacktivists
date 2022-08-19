import { useCallback } from 'react';

import { PlaygroundRequestCategory } from '@prisma/client';

import { CATEGORY_LABELS } from '../../../../../prisma/constants';

import RadioButton from 'components/forms/inputs/radioButton';
import Checkbox from 'components/forms/inputs/checkbox';

import type { trpc } from 'lib/client/trpc';

type Filters = trpc['playground']['getAllRequests']['input'];

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
    <div className="flex flex-col justify-start px-5 gap-y-4 gap-x-24 lg:flex-row">
      <div className="text-left divide-y">
        <div className="mb-2 uppercase">Sort by</div>
        <div className="flex flex-row gap-10">
          <div>
            <div className="mt-2 mb-2 font-bold">Date</div>

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
            <div className="mt-2 mb-2 font-bold">Due date</div>
            <>
              <RadioButton
                onChange={() => onChangeSort('dueDate', 'desc')}
                checked={filters.sort?.dueDate === 'desc'}
                label="Most recent first"
              />
              <RadioButton
                onChange={() => onChangeSort('dueDate', 'asc')}
                checked={filters.sort?.dueDate === 'asc'}
                label="Latest first"
              />
            </>
          </div>
        </div>
      </div>
      <div className="text-left divide-y">
        <div className="mb-2 uppercase">Filter by</div>
        <div className="flex flex-col justify-start md:flex-row gap-x-16 gap-y-4">
          <div>
            <div className="mt-2 mb-2 font-bold">Category</div>
            <div className="grid justify-start grid-flow-col grid-rows-6 sm:grid-rows-4 md:grid-rows-3 gap-x-4 gap-y-2">
              {Object.entries(PlaygroundRequestCategory).map(([key, value]) => (
                <div key={key} className="w-fit">
                  <Checkbox
                    name={key}
                    labelPosition="right"
                    size="small"
                    onChange={(checked) => {
                      if (checked) {
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
                      {CATEGORY_LABELS[key as PlaygroundRequestCategory]}
                    </span>
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mt-2 mb-2 font-bold">Type</div>
            <div className="flex flex-col gap-y-2">
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
