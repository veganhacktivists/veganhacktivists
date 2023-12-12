import DataGrid from 'components/dataGrid';
import { trpc } from 'lib/client/trpc';

import type { NextPage } from 'next';
import type { ColDef } from 'ag-grid-community';

const Applications: NextPage = () => {
  const { data } = trpc.playground.admin.allApplications.useQuery();
  if (!data) {
    return <div>Loading...</div>;
  }
  type Data = typeof data[number];
  const columns: ColDef<Data>[] = [
    { field: 'id', hide: true },
    { field: 'request.title', headerName: 'Request' },
    { field: 'request.category', headerName: 'Category' },
    { field: 'name', headerName: 'Applicant' },
    { field: 'moreInfo', headerName: 'Description' },
    { field: 'estimatedTimeDays', headerName: 'Estimated Time (Days)' },
    { field: 'status', headerName: 'Status' },
    { field: 'createdAt', headerName: 'Applied At' },
  ];

  return (
    <div className="w-full h-full">
      <DataGrid data={data} columns={columns} />
    </div>
  );
};

export default Applications;
