import { useCallback, useMemo, useState } from 'react';

import { PlaygroundRequestCategory } from '@prisma/client';

import classNames from 'classnames';

import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
} from '../../../../../prisma/constants';

import RadioButton from 'components/forms/inputs/radioButton';
import Checkbox from 'components/forms/inputs/checkbox';

import { DarkButton, GreyButton } from 'components/decoration/buttons';

import type { trpc } from 'lib/client/trpc';

type Filters = trpc['playground']['getAllRequests']['input'];

type FiltersWithoutSort = Omit<Filters, 'sort'>;
interface RequestFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const FilterBy: React.FC<{
  filters: FiltersWithoutSort;
  onFiltersChange: (filters: Omit<Filters, 'sort'>) => void;
}> = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openFilters = useCallback(() => setIsOpen(true), []);

  const [localFilters, setLocalFilters] = useState(filters);

  const numberOfAppliedFilters = useMemo(
    () =>
      (filters.categories?.length || 0) +
      (filters.isFree !== undefined ? 1 : 0),
    [filters.categories?.length, filters.isFree]
  );
  return (
    <div
      onClick={isOpen ? undefined : openFilters}
      className={classNames(
        'px-4 py-2 border md:max-w-[75%] border-grey w-fit text-left',
        {
          'cursor-pointer': !isOpen,
        }
      )}
    >
      {!isOpen &&
        (numberOfAppliedFilters === 0
          ? 'All posts'
          : `${numberOfAppliedFilters} filters applied`)}
      {isOpen && (
        <div>
          <div>
            <div className="font-bold">Category</div>
            <div className="flex flex-row flex-wrap gap-2">
              {Object.keys(PlaygroundRequestCategory).map((category) => {
                const isSelected = localFilters.categories?.includes(
                  category as PlaygroundRequestCategory
                );
                return (
                  <div
                    className="px-2 py-1 border cursor-pointer"
                    onClick={() => {
                      if (isSelected) {
                        setLocalFilters((filters) => ({
                          ...filters,
                          categories: filters.categories?.filter(
                            (x) => x !== category
                          ),
                        }));
                      } else {
                        setLocalFilters((filters) => ({
                          ...filters,
                          categories: [
                            ...(filters.categories || []),
                            category as PlaygroundRequestCategory,
                          ],
                        }));
                      }
                    }}
                    style={{
                      borderColor:
                        CATEGORY_COLORS[category as PlaygroundRequestCategory],
                      backgroundColor: `${
                        CATEGORY_COLORS[category as PlaygroundRequestCategory]
                      }${isSelected ? 'cc' : '22'}`,
                    }}
                    key={category}
                  >
                    {CATEGORY_LABELS[category as PlaygroundRequestCategory]}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="font-bold">Job Type</div>
            <div className="flex flex-col gap-2 md:flex-row">
              <div
                className={classNames(
                  'px-2 py-1 border cursor-pointer bg-yellow border-yellow',
                  localFilters.isFree === true
                    ? 'bg-opacity-80'
                    : 'bg-opacity-10'
                )}
                onClick={() => {
                  setLocalFilters((filters) => ({
                    ...filters,
                    isFree: filters.isFree !== true ? true : undefined,
                  }));
                }}
              >
                Volunteer
              </div>
              <div
                className={classNames(
                  'px-2 py-1 border cursor-pointer bg-magenta-dark border-magenta-dark',
                  localFilters.isFree === false
                    ? 'bg-opacity-80'
                    : 'bg-opacity-10'
                )}
                onClick={() => {
                  setLocalFilters((filters) => ({
                    ...filters,
                    isFree: filters.isFree !== false ? false : undefined,
                  }));
                }}
              >
                Paid
              </div>
            </div>
            <div className="flex flex-col justify-end gap-2 md:flex-row place-items-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setLocalFilters({});
                }}
              >
                Clear all
              </div>
              <GreyButton
                onClick={() => {
                  onFiltersChange(localFilters);
                  setIsOpen(false);
                }}
                className="text-lg"
              >
                Apply
              </GreyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RequestFilters: React.FC<RequestFiltersProps> = ({
  filters,
  onChange,
}) => {
  const onChangeSort = useCallback(
    (name: keyof Required<Filters>['sort'], value: 'asc' | 'desc') => {
      onChange({
        ...filters,
        sort: {
          [name]: value,
        },
      });
    },
    [filters, onChange]
  );

  const { sort, ...otherFilters } = filters;

  return (
    <div>
      <FilterBy
        filters={otherFilters}
        onFiltersChange={(newFilters) =>
          onChange({ sort: filters.sort, ...newFilters })
        }
      />
    </div>
  );
  // return (
  //   <div className="flex flex-col justify-start px-5 gap-y-4 gap-x-24 lg:flex-row">
  //     <div className="text-left divide-y">
  //       <div className="mb-2 uppercase">Sort by</div>
  //       <div className="flex flex-row gap-10">
  //         <div>
  //           <div className="mt-2 mb-2 font-bold">Date</div>

  //           <>
  //             <RadioButton
  //               onChange={() => onChangeSort('createdAt', 'desc')}
  //               checked={filters.sort?.createdAt === 'desc'}
  //               label="Newest"
  //             />
  //             <RadioButton
  //               onChange={() => onChangeSort('createdAt', 'asc')}
  //               checked={filters.sort?.createdAt === 'asc'}
  //               label="Oldest"
  //             />
  //           </>
  //         </div>
  //         <div>
  //           <div className="mt-2 mb-2 font-bold">Due date</div>
  //           <>
  //             <RadioButton
  //               onChange={() => onChangeSort('dueDate', 'desc')}
  //               checked={filters.sort?.dueDate === 'desc'}
  //               label="Most recent first"
  //             />
  //             <RadioButton
  //               onChange={() => onChangeSort('dueDate', 'asc')}
  //               checked={filters.sort?.dueDate === 'asc'}
  //               label="Latest first"
  //             />
  //           </>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="text-left divide-y">
  //       <div className="mb-2 uppercase">Filter by</div>
  //       <div className="flex flex-col justify-start md:flex-row gap-x-16 gap-y-4">
  //         <div>
  //           <div className="mt-2 mb-2 font-bold">Category</div>
  //           <div className="grid justify-start grid-flow-col grid-rows-6 sm:grid-rows-4 md:grid-rows-3 gap-x-4 gap-y-1">
  //             {Object.entries(PlaygroundRequestCategory).map(([key, value]) => (
  //               <div key={key} className="w-fit">
  //                 <Checkbox
  //                   name={key}
  //                   labelPosition="right"
  //                   size="small"
  //                   onChange={(checked) => {
  //                     if (checked) {
  //                       onChangeFilter(
  //                         'categories',
  //                         filters.categories
  //                           ? [...filters.categories, value]
  //                           : [value]
  //                       );
  //                     } else {
  //                       const filteredCategories = filters.categories?.filter(
  //                         (v) => v !== value
  //                       );
  //                       onChangeFilter(
  //                         'categories',
  //                         filteredCategories?.length
  //                           ? filteredCategories
  //                           : undefined
  //                       );
  //                     }
  //                   }}
  //                 >
  //                   <span className="font-normal">
  //                     {CATEGORY_LABELS[key as PlaygroundRequestCategory]}
  //                   </span>
  //                 </Checkbox>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         <div>
  //           <div className="mt-2 mb-2 font-bold">Type</div>
  //           <div className="flex flex-col gap-y-2">
  //             <Checkbox
  //               name="jobTypeVolunteer"
  //               onChange={() => {
  //                 if (filters.isFree === true) {
  //                   onChangeFilter('isFree', undefined);
  //                 } else if (!filters.isFree) {
  //                   onChangeFilter('isFree', true);
  //                 }
  //               }}
  //               checked={filters.isFree === true}
  //               size="small"
  //               labelPosition="right"
  //             >
  //               <span className="font-normal">Volunteer</span>
  //             </Checkbox>
  //             <Checkbox
  //               name="jobTypePaid"
  //               onChange={() => {
  //                 if (filters.isFree !== false) {
  //                   onChangeFilter('isFree', false);
  //                 } else if (filters.isFree === false) {
  //                   onChangeFilter('isFree', undefined);
  //                 }
  //               }}
  //               checked={filters.isFree === false}
  //               size="small"
  //               labelPosition="right"
  //             >
  //               <span className="font-normal">Paid</span>
  //             </Checkbox>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default RequestFilters;
