import DataGrid, { SortingOptions } from 'components/dataGrid';
import { trpc } from 'lib/client/trpc';

import type { NextPage } from 'next';
import type { ColDef } from 'ag-grid-community';
import { ApplicationStatus } from '@prisma/client';
import { useCallback, useState } from 'react';
import { ApplicationEntry } from 'server/routers/playground/admin';

const Applications: NextPage = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState<SortingOptions | null>(null);
  const { data } = trpc.playground.admin.allApplications.useQuery({sort: sorting, pageSize, page: currentPage }, { keepPreviousData: true });
  const { mutate } = trpc.playground.admin.updateApplication.useMutation();
  const columns: ColDef<ApplicationEntry>[] = [
    { field: 'id', hide: true },
    { field: 'request.title', headerName: 'Request', editable: false},
    { field: 'request.category', headerName: 'Category', editable: false},
    { field: 'applicant.name', headerName: 'Applicant' },
    { field: 'moreInfo', headerName: 'Description' },
    { field: 'estimatedTimeDays', headerName: 'Estimated Time (Days)', cellEditor: 'agNumberCellEditor', cellEditorParams: {  min: 1, valueParser: (val: string) => parseInt(val) } },
    { field: 'status', headerName: 'Status', cellEditor: 'agSelectCellEditor', cellEditorParams: { values: Object.keys(ApplicationStatus) } },
    { field: 'createdAt', headerName: 'Applied At', cellEditor: 'agDateCellEditor', cellEditorParams: { dateFormat: 'dd/mm/yyyy' } },
  ];

  const handleValueChange = useCallback((column: string, data: ApplicationEntry) => {
    const { request, ...rest } = data;
    mutate(rest);
  }, [mutate]);

  const handlePaginationChange = useCallback((page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  }, []);


  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <DataGrid data={data} columns={columns} onUpdate={handleValueChange} onSortChange={setSorting} onPaginationChange={handlePaginationChange} />
    </div>
  );
};

export default Applications;
