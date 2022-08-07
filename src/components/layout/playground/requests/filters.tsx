import { useCallback } from 'react';

import RadioButton from 'components/forms/inputs/radioButton';

import type { inferQueryInput } from 'lib/client/trpc';

type Filters = inferQueryInput<'playground.requests'>;

interface RequestFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const RequestFilters: React.FC<RequestFiltersProps> = ({
  filters,
  onChange,
}) => {
  const onChangeSort = useCallback(
    (name: keyof typeof filters['sort'], value: 'asc' | 'desc') => {
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

  // const {
  //   handleSubmit,
  //   register,
  //   control,
  //   formState: { errors },
  //   setValue,
  // } = useForm<Filters>({
  //   mode: 'onChange',
  //   defaultValues: filters,
  //   resolver: zodResolver(filterAndSortRequestsSchema),
  // });

  return (
    <div className="flex flex-col md:flex-row">
      <div className="divide-y">
        <div className="uppercase">Sort by</div>
        <div className="flex flex-row">
          <div>
            <div className="font-bold">Date posted</div>

            <>
              <RadioButton
                onChange={() => onChangeSort('createdAt', 'desc')}
                checked={filters.sort.createdAt === 'desc'}
                label="Newest"
              />
              <RadioButton
                onChange={() => onChangeSort('createdAt', 'asc')}
                checked={filters.sort.createdAt === 'asc'}
                label="Oldest"
              />
            </>
          </div>
          <div>
            <div className="font-bold">Priority</div>
            <>
              <RadioButton
                onChange={() => onChangeSort('priority', 'desc')}
                checked={filters.sort.priority === 'desc'}
                label="High to low"
              />
              <RadioButton
                onChange={() => onChangeSort('priority', 'asc')}
                checked={filters.sort.priority === 'asc'}
                label="Low to high"
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFilters;
