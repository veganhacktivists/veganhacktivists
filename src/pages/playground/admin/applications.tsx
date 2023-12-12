import DataGrid, { SortingOptions } from 'components/dataGrid';
import { trpc } from 'lib/client/trpc';

import type { NextPage } from 'next';
import type { ColDef } from 'ag-grid-community';
import { ApplicationStatus, PlaygroundApplication } from '@prisma/client';
import { useCallback, useState } from 'react';
import { ApplicationEntry } from 'server/routers/playground/admin';

const Applications: NextPage = () => {
  const [sorting, setSorting] = useState<SortingOptions | null>(null);
  const { data } = trpc.playground.admin.allApplications.useQuery({sort: sorting }, { keepPreviousData: true });
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
    const { request, applicant, ...rest } = data;
    mutate(rest);
  }, [mutate]);


  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <DataGrid data={data} columns={columns} onUpdate={handleValueChange} onSortChange={setSorting} />
    </div>
  );
};

export default Applications;
