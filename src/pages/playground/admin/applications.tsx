import { ApplicationStatus } from '@prisma/client';
import { useCallback, useState } from 'react';

import DataGrid from 'components/dataGrid';
import { trpc } from 'lib/client/trpc';

import type { SortingOptions } from 'components/dataGrid';
import type { ApplicationEntry } from 'server/routers/playground/admin';
import type { NextPage } from 'next';
import type { ColDef } from 'ag-grid-community';
import type { FilterOption } from 'lib/services/playground/schemas';

const Applications: NextPage = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState<SortingOptions | null>(null);
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [search, setSearch] = useState('');
  const { data } = trpc.playground.admin.allApplications.useQuery(
    { sort: sorting, pageSize, page: currentPage, filters, search },
    { keepPreviousData: true }
  );
  const { mutate } = trpc.playground.admin.updateApplication.useMutation();
  const columns: ColDef<ApplicationEntry>[] = [
    { field: 'id', hide: true },
    {
      field: 'request.title',
      headerName: 'Request',
      editable: false,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'request.category',
      headerName: 'Category',
      editable: false,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'applicant.name',
      headerName: 'Applicant',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'moreInfo',
      headerName: 'Description',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'estimatedTimeDays',
      headerName: 'Estimated Time (Days)',
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: { min: 1, valueParser: (val: string) => parseInt(val) },
    },
    {
      field: 'status',
      headerName: 'Status',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: Object.keys(ApplicationStatus) },
    },
    {
      field: 'createdAt',
      headerName: 'Applied At',
      cellEditor: 'agDateCellEditor',
      cellEditorParams: { dateFormat: 'dd/mm/yyyy' },
    },
  ];

  const handleValueChange = useCallback(
    (data: ApplicationEntry) => {
      const { request, ...rest } = data;
      mutate(rest);
    },
    [mutate]
  );

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
    []
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <DataGrid
        data={data}
        columns={columns}
        onUpdate={handleValueChange}
        onSortChange={setSorting}
        onPaginationChange={handlePaginationChange}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
      />
    </div>
  );
};

export default Applications;
